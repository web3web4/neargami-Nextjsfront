import { UserProfileData } from "./api";

export interface IAuthContextType {
    nearSignature: string | null;
    jwtToken:string | null;
    setAuthData: (key: string, value: any) => void;
    //isTokenValid: (showMessage?: boolean) => Promise<boolean>;
    userProfile: UserProfileData | undefined;
  }

export interface IWalletContextType {
    handleNearLogin: (setButtonText:any) => Promise<void>;
    handleNearLogout: () => Promise<void>;
  }

export interface IAccountKeysResponse {
    result: {
      keys: string[];  
    };
  }
  
export interface IGetAccountKeysParams {
    accountId: string; 
  }
  
export interface IGetChallengeDataResponse {
    message: string;
    challange: string;
  }