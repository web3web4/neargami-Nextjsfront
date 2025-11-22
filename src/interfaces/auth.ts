import { UserProfileData } from "./api";
import { AuthMethod } from "../context/authContext";

export interface IAuthContextType {
    nearSignature: string | null;
    jwtToken: string | null;
    authMethod: AuthMethod;
    setAuthData: (key: string, value: any) => void;
    //isTokenValid: (showMessage?: boolean) => Promise<boolean>;
    userProfile: UserProfileData | undefined;
  }

export interface IWalletContextType {
    handleNearOrEvmLogin: (setButtonText:any) => Promise<void>;
    handleNearLogout: () => Promise<void>;
  }

export interface ITelegramContextType {
  handleTelegramLogin: () => Promise<void>;
  handleTelegramLogout: () => Promise<void>;
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

export interface ITelegramInitData {
  auth_date: number;
  hash: string;
  query_id?: string;
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
  };
  start_param?: string;
}

export interface ITelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
}

export interface ITelegramParsedData {
  telegramId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  authDate: string | null;
  hash: string | null;
}

export interface ITelegramAuthResponse {
  token: string;
  user: {
    id: string;
    telegram_id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    flags: {
      new_user: boolean;
      first_request_approved_courses: boolean;
    };
  };
}