import { IAccountKeysResponse } from "../interfaces/auth";
import { IGetAccountKeysParams } from "../interfaces/auth";
import { IGetChallengeDataResponse } from "../interfaces/auth";


export async function getAccountKeys(
    { accountId }: IGetAccountKeysParams, 
    networkId: string
  ): Promise<IAccountKeysResponse> {
    const keys = await fetch(`https://rpc.${networkId}.near.org`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: `{"jsonrpc":"2.0", "method":"query", "params":["access_key/${accountId}", ""], "id":1}`,
    })
      .then((data) => data.json())
      .then((result) => result);
  
    // Note: If no keys were returned, it should be already handled at the frontend to show an error message.
    // There are no keys if the account is not yet registered on-chain.
    return keys;
  }
  
  export async function getChallengeData(accountId: string): Promise<IGetChallengeDataResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/challenge/${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  }