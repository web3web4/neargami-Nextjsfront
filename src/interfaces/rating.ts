export interface Rating {
    courseId: string;
    hasUpdated: boolean;
    message: string;
    rate: number;
    sender: string;
  }
  
  export interface TotalRatingProps {
  courseId: string;
  totalRatingStyle?: string;
  starsRatingStyle?: string;
  countRatingStyle?: string;
}


