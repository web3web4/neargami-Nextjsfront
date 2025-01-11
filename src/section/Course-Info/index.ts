import { CourseDifficulty, CourseLanguage } from "@/utils/Enums";

export const courseDifficultyList = [
  { value: CourseDifficulty.Beginner, label: "1. Newbie (Beginner)" },
  { value: CourseDifficulty.Normal, label: "2. Learner (Normal)" },
  { value: CourseDifficulty.Advanced, label: "3. Pro (Advanced)" },
  { value: CourseDifficulty.Legend, label: "4. Legend" },
  { value: CourseDifficulty.Master, label: "5. Master" },
  { value: CourseDifficulty.Hacker, label: "6. Hacker" },
];

export const languageOptions = [
  { value: CourseLanguage.Chinese, label: CourseLanguage.Chinese },
  { value: CourseLanguage.Spanish, label: CourseLanguage.Spanish },
  { value: CourseLanguage.English, label: CourseLanguage.English },
  { value: CourseLanguage.Arabic, label: CourseLanguage.Arabic },
  { value: CourseLanguage.Hindi, label: CourseLanguage.Hindi },
  { value: CourseLanguage.Portuguese, label: CourseLanguage.Portuguese },
  { value: CourseLanguage.Bengali, label: CourseLanguage.Bengali },
  { value: CourseLanguage.Russian, label: CourseLanguage.Russian },
  { value: CourseLanguage.Japanese, label: CourseLanguage.Japanese },
  { value: CourseLanguage.Lahnda, label: CourseLanguage.Lahnda },
  { value: CourseLanguage.Another, label: CourseLanguage.Another },
];

export const customStyles = {
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),

  option: (base: any) => ({
    ...base,
    backgroundColor: "white",
    color: "black !important",
    width: "90%",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "#bbbbc1",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#bbbbc1",
  }),
  control: (base: any) => ({
    ...base,
    backgroundColor: "transparent",
    width: "90%",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
  }),
};
