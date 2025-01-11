import { Contract } from "near-api-js";

export interface RatingObject {
    message: string;
    courseId: string;
    rate: number;
  }

export interface IRatingContract extends Contract {
    getAverageRating: (args: { courseId: string }) => Promise<number>;
    convertData: (args: { courseId: string }) => Promise<RatingObject[]>;

  }

export interface ITokenContract {
    ft_balance_of : (args:{accountId : string}) => Promise<string>;
}