"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
//import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
import Swal from "sweetalert2";
import { getAccountKeys, getChallengeData } from "@/auth/nearAuthVerfication";
import { useAuth } from "@/context/authContext";
import { deleteCookie, setCookie } from "cookies-next";
import { IWalletContextType } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { wagmiAdapter, web3Modal } from "@/auth/appkit";
import { getAccount, signMessage } from "@wagmi/core";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const WalletContext = createContext<IWalletContextType | undefined>(undefined);

export const getSelector = async () => {
  const selector = await setupWalletSelector({
    network: "testnet",
    languageCode: "en",
    modules: [
      setupMeteorWallet(),
      setupEthereumWallets({
        wagmiConfig: wagmiAdapter.wagmiConfig as any,
        web3Modal: web3Modal as any,
        chainId: CHAIN_ID,
      }),
    ],
  });
  return selector;
};

// TODO:: refactor once of those issues are done: https://github.com/near/wallet-selector/issues/1223 or https://github.com/near/wallet-selector/issues/1224
function appendPrivacyPolicyText() {
  const tryAppendingTextNode = setInterval(() => {
    try {
      const privacyPolicy = document.createElement("div");
      privacyPolicy.className = "privacy-policy-div";
      privacyPolicy.innerHTML =
        '<b style="color:red;">By using our service you automatically acknowledge and agree to our <a href="/privacy-policy">Privacy Policy</a> \
and our <a href="/legal-disclaimer">Legal Disclaimer</a>.</b>';
      const wrapper = document.getElementsByClassName("nws-modal-body")[0];
      // const style = document.createElement("style");
      // style.innerHTML = ".modal-right {padding-top:6px:} ";
      if (wrapper) {
        if (
          document.getElementsByClassName("privacy-policy-div").length === 0
        ) {
          // document.head.appendChild(style);
          wrapper.append(privacyPolicy);
        }
        clearInterval(tryAppendingTextNode); // Stop trying if successful
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, 200);
}

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const translate = useTranslations("Auth");
  const { setAuthData } = useAuth();
  const router = useRouter();

  const handleNearOrEvmLogin = async (
    setButtonText: (n: React.ReactNode) => void
  ) => {
    try {
      // 1) Open Selector modal (NEAR + EVM)
      const selector = await getSelector();
      setButtonText(<div className="loader" />);
      const modal = setupModal(selector, { contractId: "" });
      modal.show();
      appendPrivacyPolicyText();

      const stop = false;
      modal.on("onHide", () => {
        if (!stop) {
          setButtonText("Connect");
          modal.show();
        }
      });

      // 2) Wait for user to pick a wallet
      const wallet = await retryUntilSuccess(
        async () => await selector.wallet(),
        () => stop,
        1000,
        500
      );
      if (!wallet) {
        Swal.fire({
          icon: "error",
          title: "Wallet selection failed",
          text: "Please try again.",
        });
        return;
      }

      setButtonText(<div className="loader" />);
      const accounts = await wallet.getAccounts();
      const accountId = accounts[0]?.accountId; // For NEAR it is accountId, for EVM module this can be 0x-address
      console.log("accountId=====", accountId);
      if (!accountId) throw new Error("No account found");

      // Distinguish NEAR vs EVM by wallet.id
      const isEvm = wallet.id === "ethereum-wallets";

      if (!isEvm) {
        // ---------- NEAR FLOW ----------
        // Step 2.1: verify account has access keys on-chain
        const networkId = selector.options.network.networkId;
        const keysRegisteredOnChain = await getAccountKeys(
          { accountId },
          networkId
        );
        if (keysRegisteredOnChain?.result?.keys?.length === 0) {
          setButtonText("Connect");
          selector.on("accountsChanged", () => {});
          Swal.fire({
            icon: "error",
            title: "Error",
            html: `The account on your wallet <b>${wallet.metadata?.name}</b> is not registered.
            <br /> \
            But you cannot use an account before registering it on the NEAR Network.\
            <br /> \
            Hint: you may use <b>Meteor Wallet</b> to get an account easily on testnet.`,
          });
          throw new Error("NEAR account not registered on-chain");
        }

        if (!accountId) throw new Error("No account found in wallet");
        /**
         * Step 3: Save initial state to cookies for the user
         */
        setAuthData("nearSignature", accountId);
        /**
         * Step 4: Show SweetAlert for signing the message
         */
        Swal.fire({
          title: translate("Signature Message"),
          text: translate("Sign Message"),
          icon: "info",
          showCancelButton: false,
          confirmButtonText: translate("Signature Message"),
        }).then(async (r) => {
          if (!r.isConfirmed) return;

          const challengeData = await getChallengeData(accountId);
          const signResponse = await wallet.signMessage({
            message: challengeData.message,
            nonce: Buffer.from(challengeData.challange, "base64"),
            recipient: accountId,
          });
          /**
           * Step 5: Send the signed data to backend and receive the token
           */
          const verifyResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accountId,
              publicKey: signResponse.publicKey,
              challenge: challengeData.challange,
              message: challengeData.message,
              signature: signResponse.signature,
            }),
          });

          if (verifyResponse.status === 201) {
            const verifyData = await verifyResponse.json();
            Swal.fire({
              icon: "success",
              title: translate("Success"),
              text: translate("Login successful"),
            });
            const jwtToken = verifyData.data.authenticate.token;
            setAuthData("jwtToken", jwtToken);

            // This Flag For Show Course Intro, When First Show Home Page After Connect
            if (
              verifyData.data.signUpUserData.flags
                .first_request_approved_courses == false
            ) {
              setCookie("firstShowingOfHome", false);
            }
            /**
             * Step 6: Navigate user based on login state
             */
            if (verifyData.data.signUpUserData.flags.new_user === true) {
              router.push("/wizard");
            } else {
              router.refresh();
            }
            modal.hide();
          } else {
            Swal.fire({ icon: "error", title: "Error", text: "Login failed." });
          }
        });
      } else {
        // ---------- EVM FLOW (SIWE) ----------

        const account = getAccount(wagmiAdapter.wagmiConfig);

        // 1) Ask server for SIWE message
        const prepare = await getChallengeData(accountId);
        console.log("prepare=========: ", prepare);

        const evmAddress = account.address;
        console.log("evmAddress=========: ", evmAddress);

        // 3) Sign SIWE message using wagmi
        const signature = await signMessage(wagmiAdapter.wagmiConfig, {
          message: prepare.message,
        });
        console.log("signature=========:", signature);

        // 3) Verify on server
        const verify = await fetch(`${API_BASE_URL}/auth/ethersignup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountId,
            publicKey: evmAddress,
            challenge: prepare.challange,
            message: prepare.message,
            signature: signature,
          }),
        });
        console.log("verify.ok:", verify.ok);
        if (verify.ok) {
          const res = await verify.json();
          const data = res.data;
          console.log("data:", data);

          Swal.fire({
            icon: "success",
            title: translate("Success"),
            text: translate("Login successful"),
          });
          const jwtToken = data.authenticate.token;

          console.log("jwtToken:", jwtToken);
          setAuthData("nearSignature", accountId);
          setAuthData("jwtToken", jwtToken);
          // This Flag For Show Course Intro, When First Show Home Page After Connect
          if (
            data.signUpUserData.flags.first_request_approved_courses == false
          ) {
            setCookie("firstShowingOfHome", false);
          }
          /**
           * Step 6: Navigate user based on login state
           */
          if (data.signUpUserData.flags.new_user === true) {
            router.push("/wizard");
          } else {
            router.refresh();
          }
          modal.hide();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "EVM login failed.",
          });
        }
      }
    } catch (e: any) {
      console.error("Login error:", e?.message || e);
    }
  };

  const handleNearLogout = async () => {
    try {
      /**
       * Step 1: Initialize Wallet Selector and sign out
       */
      const selector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMeteorWallet() /*, setupNightly()*/],
      });
      const wallet = await selector.wallet();
      await wallet.signOut();

      /**
       * Step 2: Clear cookies for the user
       */
      setAuthData("nearSignature", null);
      deleteCookie("jwtToken");

      /**
       * Step 3: Redirect to homepage
       */
      window.location.replace("/");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <WalletContext.Provider value={{ handleNearOrEvmLogin, handleNearLogout }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context)
    throw new Error("useWallet must be used within a WalletProvider");
  return context;
};

/**
 * Helper function: Retry until success
 */
export async function retryUntilSuccess(
  fn: () => Promise<any>,
  shouldAbort: () => boolean,
  maxAttempts = 100,
  delay = 1000
) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    if (shouldAbort()) {
      console.log(`Aborting retries after ${attempts} attempts.`);
      return null;
    }
    try {
      console.log(`Attempting function execution: ${attempts + 1}`);
      return await fn();
    } catch (error: any) {
      attempts++;
      console.log(error.message);
      if (attempts >= maxAttempts) {
        throw new Error("Max attempts reached.");
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
