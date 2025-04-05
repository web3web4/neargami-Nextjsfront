"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
//import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import Swal from "sweetalert2";
import { getAccountKeys, getChallengeData } from "./nearAuthVerfication";
import { useAuth } from "../context/authContext";
import { deleteCookie, setCookie } from "cookies-next";
import { IWalletContextType } from "../interfaces/auth";
import { useRouter } from "next/navigation";

const WalletContext = createContext<IWalletContextType | undefined>(undefined);

export const getSelector = async () => {
  const selector = await setupWalletSelector({
    network: "testnet",
    languageCode: "en",
    modules: [setupMeteorWallet()/*, setupNightly()*/],
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
  const { setAuthData } = useAuth();
  const router = useRouter();

  const handleNearLogin = async (setButtonText: any) => {
    try {
      /**
       * Step 1: Setting up Wallet Selector and showing the modal
       */
      const selector = await getSelector();
  
      const modal = setupModal(selector, {
        contractId: "",
      });
      modal.show();
      appendPrivacyPolicyText();
      console.log("Connecting...");
  
      /**
       * Step 2: Wait for wallet selection and retrieve wallet details
       */
      const stopWaitingForWallet = false;
      modal.on("onHide", () => {
        console.log("Modal closed, re-opening...");
        modal.show();
      });
  
      const wallet = await retryUntilSuccess(
        async () => await selector.wallet(),
        () => stopWaitingForWallet,
        1000,
        500
      );
      if (!wallet) {
        Swal.fire({
          icon: "error",
          title: "Wallet selection failed",
          text: "Please try selecting your wallet again.",
        });
        return;
      }
  
      setButtonText("Processing");
  
      const accounts = await wallet.getAccounts();
      const accountId = accounts[0]?.accountId;
  
      // Step 2.1: Verify if the account is registered on NEAR Network
      const networkId = selector.options.network.networkId;
      const keysRegisteredOnChain = await getAccountKeys(
        { accountId },
        networkId
      );
      if (keysRegisteredOnChain?.result?.keys?.length === 0) {
        setButtonText("Connect");
        selector.on("accountsChanged", () => {
          console.log("account changed");
        });
        Swal.fire({
          icon: "error",
          title: "Error",
          html: `The account on your wallet <b>${wallet.metadata?.name}</b> is not registered.
          <br /> \
          But you cannot use an account before registering it on the NEAR Network.\
          <br /> \
          Hint: you may use <b>Meteor Wallet</b> to get an account easily on testnet.`,
        });
  
        throw new Error(
          "You cannot use an account before registering it on the NEAR Network"
        );
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
        title: 'Signature Message',
        text: 'Please sign the message to complete the registration process. These steps are for verifying account ownership and are part of our data security measures. Thank you.',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Signature Message',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Proceed with signing the message
          const challengeData = await getChallengeData(accountId);
          const signResponse = await wallet.signMessage({
            message: challengeData.message,
            nonce: Buffer.from(challengeData.challange, "base64"),
            recipient: accountId,
          });
  
          /**
           * Step 5: Send the signed data to backend and receive the token
           */
          const verifyResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accountId,
                publicKey: signResponse.publicKey,
                challenge: challengeData.challange,
                message: challengeData.message,
                signature: signResponse.signature,
              }),
            }
          );
  
          if (verifyResponse.status === 201) {
            const verifyData = await verifyResponse.json();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Login successful!",
            });
  
            const jwtToken = verifyData.data.authenticate.token;
            setAuthData("jwtToken", jwtToken);
  
            // This Flag For Show Course Intro, When First Show Home Page After Connect
            if (verifyData.data.signUpUserData.flags.first_request_approved_courses == false) {
              setCookie("firstShowingOfHome", false);
            }
  
            /**
             * Step 6: Navigate user based on login state
             */
            if (verifyData.data.signUpUserData.flags.new_user == true) {
              router.push("/wizard");
            } else {
              setButtonText("Connected");
              router.refresh();
            }
  
            modal.hide();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Login failed.",
            });
          }
        }
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
    }
  };
  

  const handleNearLogout = async () => {
    try {
      /**
       * Step 1: Initialize Wallet Selector and sign out
       */
      const selector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMeteorWallet()/*, setupNightly()*/],
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
    <WalletContext.Provider value={{ handleNearLogin, handleNearLogout }}>
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
