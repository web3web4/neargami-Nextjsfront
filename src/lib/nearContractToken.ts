import { getSelector } from "@/auth/nearAuth";
import { connect, Contract } from "near-api-js";
import { ITokenContract } from "@/interfaces/contracts";

const selector = await getSelector();


const networkId = selector.options.network.networkId;
let RATING_CONTRACT = "";

if (networkId === "testnet") {
  RATING_CONTRACT = "neargami.testnet";
} else {
  RATING_CONTRACT =
    "0b33f9bba623b149eda8dfb13f255197abf9f6459dd2386a52ed0bbd668d48ef";
}
console.log(networkId);
const nearConfig = {
  networkId: networkId,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://${networkId}.mynearwallet.com/`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://${networkId}.nearblocks.io`,
};

export const initNear = async () => {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();
  const account = accounts[0];
  const accountId = accounts[0].accountId;

  return { wallet, accountId, account };
};

export const getBalance = async () => {
  const { accountId } = await initNear();

  const nearConnection = await connect(nearConfig);
  const account = await nearConnection.account(accountId);

  const contract = new Contract(account, RATING_CONTRACT, {
    viewMethods: ["ft_balance_of"],
    changeMethods: [],
    useLocalViewExecution: false,
  }) as unknown as ITokenContract;
  try {
    const balance = await contract.ft_balance_of({
      accountId: accountId,
    });
    return balance;
  } catch (error) {
    console.error("Failed to get user balance", error);
    return null;
  }
};