import { CourseCount } from "./course";
import { Lecture } from "./lecture";
import {Options} from "@/interfaces/qa";

export interface UserProfileData {
    id?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    address?: string,
    signature?: string,
    message?: string,
    country?: string,
    phone?: string,
    linkedin?: string,
    discord?: string,
    facebook?: string,
    twitter?: string,
    ngc?: number,
    top_points?: number,
    about?: null,
    slug?: null,
    createdAt?: any,
    image?: string,
    game?: any,
    isAdmin?: boolean,
    [key: string]: any;
  }
  
export interface CourseData  {
    id?:number;
    name?:string;
    title?:string
    status?: string;
    publish_status?: string;
    [key: string]: any;
  }

  export interface QAData {
    description: string, 
    options: {
        description: string,
        is_correct: boolean,
        [key: string]: any;
      }[] ,
    }

  export interface LessonData {
    title: string,
    description: string,
    pre_note: string,
    next_note: string,
    order: number,
    qaList?: {
        description: string,
        id: number,
        lecture_id: number,
        score: number,
        sequence: number,
    }[],
    [key: string]: any;
  }

export interface ApiResponse<T> {
    status?: number;
    message: string; 
    data?: T;
    
  }

export interface UserProfileResponse {
  username?: string,
    id?: string,
    firstname: string,
    lastname: string,
    email: string,
    address?: string,
    signature?: string,
    message?: string,
    country: string,
    phone?: string,
    linkedin: string,
    discord: string,
    facebook: string,
    twitter: string,
    ngc?: number,
    top_points?: number,
    about?: null,
    slug?: null,
    createdAt?: any,
    image: string,
    game?: any,
    isAdmin?: boolean,
    [key: string]: any;

  }


  export interface CoursesResponse {
    id?: number ;
    name: string;
    logo: string;
    total_score?: number;
    tag: string;
    difficulty: string;
    isAdmin?: boolean; 
    slug: string;
    teacher?: {
      id: number;
      image: string;
    };
    [key: string]: any;
  }

  export interface LessonResponse {
    lectures: Lecture[];
    counts: CourseCount[];
    [key: string]: any;
  }

  export interface QAResponse {
    description: string, 
    options: Options[],
    answer: Options[],
    lecture: Lecture,
    [key: string]: any;
  }
  
 export interface CheckAnswerResponse {
    correctAnswers: {
      id: number,
      description: string,
      is_correct: boolean,
      question_id: number
  }[]
  }

 export interface NgcResponse {
    data: number;
    message:string;
  }

  export interface UploadFileResponse {
    fileId: string,
    name: string,
    size: number,
    versionInfo: {
        id: string,
        name: string
    },
    filePath: string,
    url: string,
    fileType: string,
    height: number,
    width: number,
    thumbnailUrl: string,
  }

  export interface DataPopup {
      id?: number,
      start_time?: string | null,
      end_time?: string | null,
      user_id?: string | null,
      course_id?: number,
      user: {
          id: string,
          slug:string,
          firstname: string |null,
          lastname: string |null,
          image?: string |null
      }
    [key: string]: any;
  }

export interface KeywordsSearch {
  id:string | number,
  query:string[],
  keyword:string,
  timestamp:string,
}