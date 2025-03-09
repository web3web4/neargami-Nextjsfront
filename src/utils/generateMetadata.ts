import {
  CoursesResponse,
  LessonResponse,
  QAResponse,
  UserProfileData,
} from "@/interfaces/api";
import defaultCourseLogo from "@/assets/images/no-Course.png";
import defaultUserImage from "@/assets/images/no-User.png";
import logoImage from "@/assets/images/brand/Logo/With-BG/Dark/Logo-3-Size/512.png";

// default Title And Description, For If Page Not Have A Title Or Description
const defaultTitle = "NearGami | Play to learn & learn to earn";
const defaultDescription =
  "Join NearGami to learn Web3, smart contracts, and Near Protocol with gamified courses. Play to learn & learn to earn!";

// To Shorten Function
const returnMetadata = (
  title: string,
  description: string,
  url: string,
  image: {
    url: any;
    width: number;
    height: number;
    alt: string;
  }
) => {
  const openGraph = {
    title,
    description,
    url,
    type: "website",
    images: [image],
  };

  const twitterCard = {
    card: "summary_large_image",
    title,
    description,
    image: image.url,
  };

  return {
    title,
    description,
    openGraph,
    twitter: twitterCard,
  };
};

// For Home Page
export const generateHomeMetadata = () => {
  return returnMetadata(
    "NearGami | Play to learn & learn to earn",
    "Join NearGami to learn Web3, smart contracts, and Near Protocol with gamified courses. Play to learn & learn to earn!",
    `/`,
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "NearGami Logo and Tagline",
    }
  );
};

// For Course Details Page
export const generateCourseDetailsMetadata = (
  data: LessonResponse,
  courseSlug: string
) => {
  return returnMetadata(
    data.lectures[0].course.name || defaultTitle,
    data.lectures[0].course.description || defaultDescription,
    `/course-details/${courseSlug}`,
    {
      url: data.lectures[0].course.logo || defaultCourseLogo.src,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};
// For Course Info Page
export const generateCourseInfoMetadata = (
  data: CoursesResponse | null,
  courseSlug: string
) => {
  return returnMetadata(
    (data && data.name) || defaultTitle,
    (data && data.description) || defaultDescription,
    `/course-info/${courseSlug}`,
    {
      url: (data && data.logo) || defaultCourseLogo.src,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};

// For Lesson Page
export const generateLessonMetadata = (
  data: LessonResponse | null,
  courseId: string,
  lessonId: string
) => {
  return returnMetadata(
    data !== null ? data.title : "Add Lesson | NearGami",
    data !== null ? data.description : defaultDescription,
    `/lesson/${courseId}/${lessonId}`,
    {
      url: data != null ? data.course.logo : defaultCourseLogo.src,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};

// For Players Page
export const generatePlayersMetadata = () => {
  return returnMetadata(
    "Players | NearGami",
    "Discover the top players on NearGami! Learn, earn points, and compete to climb the leaderboard in this gamified learning platform.",
    `/players`,
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "Players on NearGami",
    }
  );
};

// For Legal Disclaimer Page
export const generateLegalDisclaimerMetadata = () => {
  return returnMetadata(
    "Legal Disclaimer | NearGami",
    "Review the legal disclaimer for NearGami. Understand the terms, conditions, and limitations of using our platform for gamified learning.",
    "/legal-disclaimer",
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "Legal Disclaimer for NearGami",
    }
  );
};

// For Privacy Policy Page
export const generatePrivacyPolicyMetadata = () => {
  return returnMetadata(
    "Privacy Policy | NearGami",
    "Read the Privacy Policy for NearGami to understand how we collect, use, and protect your personal information on our platform.",
    "/privacy-policy",
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "Privacy Policy for NearGami",
    }
  );
};

// For Leader board Page
export const generateLeaderboardMetadata = () => {
  return returnMetadata(
    "Leader board | NearGami | Play to learn & learn to earn",
    "Check out the Leaderboard on NearGami and see who's leading the pack! Compete with other players, earn points by learning, and climb your way to the top. Play to learn, learn to earn, and show off your skills!",
    "/leaderboard",
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "NearGami Leaderboard",
    }
  );
};

// For Profile Page
export const generateProfileMetadata = (
  data: UserProfileData,
  username: string | null
) => {
  return returnMetadata(
    `${data.username} | NearGami`,
    "View and manage your profile on NearGami. Track your progress, achievements, and points as you learn and play!",
    `${username !== null ? `/profile/${username}` : "/profile"}`,
    {
      url: data.image || defaultUserImage.src,
      width: 600,
      height: 600,
      alt: "Neargami Logo",
    }
  );
};

// For Profile Page
export const generateEditProfileMetadata = () => {
  return returnMetadata(
    `Edit Profile | NearGami`,
    "View and Edit your profile on NearGami",
    `/edit-profile`,
    {
      url: defaultCourseLogo.src,
      width: 600,
      height: 600,
      alt: "Neargami Logo",
    }
  );
};

// For Qa Page
export const generateQAMetadata = (
  data: QAResponse | null,
  courseId: string,
  lessonId: string,
  qaId: string
) => {
  return returnMetadata(
    `${data ? "Edit QA" : "Add QA"} | NearGami`,
    `${data ? data.description : defaultDescription}`,
    `qestion-answer/${courseId}/${lessonId}/${qaId}`,
    {
      url: logoImage.src,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};

// For Quiz Page
export const generateQuizMetadata = (
  data: QAResponse[],
  courseId: string,
  lecturId: string,
  lectureSlug: string
) => {
  return returnMetadata(
    `Quiz | ${data[0]?.lecture.title}`,
    data[0]?.lecture.description,
    `/quiz/${courseId}/${lecturId}/${lectureSlug}`,
    {
      url: data[0]?.lecture.course.logo,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};

// For Show Lesson Page
export const generateShowLessonMetadata = (
  data: LessonResponse,
  courseId: string,
  courseSlug: string
) => {
  return returnMetadata(
    data && data?.lectures?.length > 0
      ? data?.lectures[0]?.course?.name
      : defaultTitle,
    defaultDescription,
    `/show-lesson/${courseId}/${courseSlug}`,
    {
      url: data?.lectures[0]?.course?.logo,
      width: 600,
      height: 600,
      alt: "Course Logo",
    }
  );
};

// For Teacher Dashboard Page
export const generateTeacherDashboardMetadata = () => {
  return returnMetadata(
    "Teacher Dashboard | NearGami | Play to learn & learn to earn",
    "Manage your courses,Play to learn, learn to earn, and empower your students!",
    `/teacher-dashboard`,
    {
      url: logoImage.src,
      width: 1200,
      height: 630,
      alt: "NearGami Teacher Dashboard",
    }
  );
};

// For Wizard Page
export const generateWizardMetadata = () => {
  return returnMetadata(
    "Setup Wizard | NearGami | Play to learn & learn to earn",
    "Complete the setup wizard on NearGami to customize your learning experience. Follow the steps to set up your profile, preferences, and goals. Play to learn, learn to earn, and get started today!",
    `/wizard`,
    {
      url: logoImage.src,
      width: 1200,
      height: 630,
      alt: "NearGami Setup Wizard",
    }
  );
};
