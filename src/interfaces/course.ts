import { CourseDifficulty, CourseLanguage } from "@/utils/Enums";

export interface CourseInfo{
    name: string,
    title: string,
    tag: string,
    difficulty: CourseDifficulty,
    description: string,
    logo: string,
    language: CourseLanguage,
}

export interface CoursesHome {
    id: number;
    name: string;
    logo: string;
    total_score: number;
    tag: string;
    difficulty: string;
    teacher: {
      id: number;
      image: string;
    };
    counts: CourseCount;
  }

  export interface CourseCount{
    _count: {
      start_time: number;
      end_time: number;
    };
  }

  export interface CourseInProgress{
      course_id: number,
      endedLecturesCount: number,
      totalPoints: number,
      course: {
        name: string,
        title: string,
        logo: string,
        slug: string,
        lecture: any[],
        teacher: {
          image: string
        }
      },
      counts:{
        _count: {
          start_time : string,
          end_time: string
        }
      }
    }