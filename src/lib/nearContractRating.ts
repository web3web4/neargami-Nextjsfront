import { getSelector } from "../auth/nearAuth";
import { connect, Contract } from "near-api-js";
import { IRatingContract } from "../interfaces/contracts";
// import { Wallet } from "@near-wallet-selector/core";
// const networkId = selector.options.network.networkId;
const networkId = "testnet";
 let RATING_CONTRACT = "";

if (networkId === "testnet") {
   RATING_CONTRACT = "ratecourseneargami.testnet";
 } else {
   RATING_CONTRACT =
     "90f08df7e4d38fb24c05729e39291e8bcec4e20eb369eec148a016a4c3cc9120";
 }

//===================  temporarily  ==================
const nearConfig = {
  networkId: networkId,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://${networkId}.mynearwallet.com/`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://${networkId}.nearblocks.io`,
};


 export const initNear = async () => {
  const selector = await getSelector();
   let wallet;
   let accounts;
   let account;
   let accountId;
   try {
     wallet = await selector.wallet();
     accounts = await wallet.getAccounts();
     account = accounts[0];
     accountId = accounts[0].accountId;
   } catch {
     accountId = "neargami123.testnet";
   }

   return { wallet, accountId, account };
 };

 export const getAverageRating = async (courseId:string) => {
   const { accountId } = await initNear();
   const nearConnection = await connect(nearConfig);
   const account = await nearConnection.account(accountId);

   const contract = new Contract(account, RATING_CONTRACT, {
     viewMethods: ["getAverageRating"],
     changeMethods: [],
     useLocalViewExecution: false,
   }) as IRatingContract;
   try {
     const rating : number = await contract.getAverageRating({
       courseId: courseId,
     });
     return rating;
   } catch (error) {
     console.error("Failed to get Average rating for course:", error);
   }
 };

 
 export const getOldRatingForUser = async (courseId:string) => {
   const { accountId } = await initNear();

   const nearConnection = await connect(nearConfig);
   const account = await nearConnection.account(accountId);

   const contract = new Contract(account, RATING_CONTRACT, {
     viewMethods: ["getUserRatingForCourse"],
     changeMethods: [],
    useLocalViewExecution: false,
   });
   try {
     const rating = await (contract as any).getUserRatingForCourse({
       courseId: courseId,
       sender: accountId,
     });
     return rating;
   } catch (error) {
     console.error("Failed to get user rating for course:", error);
   }
 };
 /*
 interface RateCourseContract {
  convertData: (args: { courseId: string }) => Promise<any>;
}
*/
export const getAllRatingForCourse = async (courseId: string) => {
  const nearConnection = await connect(nearConfig);
  const account = await nearConnection.account("neargami123.testnet");

  const contract = new Contract(account, "ratecourseneargami.testnet", {
    viewMethods: ["convertData"],
    changeMethods: [],
    useLocalViewExecution: false,
  }) as IRatingContract;  
  try {
    const rating = await contract.convertData({
      courseId: courseId,
    });
    return rating;
  } catch (error) {
    console.error("Failed to get all rating for course:", error);
  }
};

 export const addRating = async (rate:number, courseId:string, message:string = "") =>  {
   const { account, wallet } = await initNear();
   try {
     const trans = await wallet!.signAndSendTransactions({
       transactions: [
         {
           signerId: account!.accountId,
           receiverId: RATING_CONTRACT,
           actions: [
             {
               type: "FunctionCall",
               params: {
                 methodName: "addRating",
                 args: {
                   rate: rate,
                   courseId: courseId,
                   message: message,
                 },
                 gas: "30000000000000",
                 deposit: "0",
               },
             },
           ],
         },
       ],
     });

     return trans;
   } catch (error) {
     console.error("Failed to add rating:", error);
   }
 };
