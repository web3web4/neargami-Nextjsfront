export interface Lecture {
  course_id: number;
  id: number;
  title: string;
  description: string;
  pre_note: string;
  next_note: string;
  order: number;
  totalPrize?: number;
  picture: string | null;
  userLecture: UserLecture[];
  question: Question[];
  course: Course;
  slug: string;
  [key: string]: any;
}

export interface Course {
  id: number;
  name: string;
  title: string;
  logo: string;
  description: string;
  teacher: Teacher;
  slug: string;
}

export interface Teacher {
  id: string;
  image: string;
}

export interface Question {
  id: number;
  description: string;
  lecture_id: number;
  sequence: number;
  score: number;
}

export interface UserLecture {
  id: number;
  lecture_id: number;
  start_at: string;
  end_at: string;
}
