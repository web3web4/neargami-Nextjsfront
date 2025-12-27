import { z } from "zod";
import { CourseDifficulty, CourseLanguage } from "@/utils/Enums";
import { requiredRichText } from "./helper";

export const courseInfoSchema = z.object({
  name: requiredRichText("Course name is required")
    .max(50, "Course name must be 50 characters or less"),

  title: requiredRichText("Course description is required")
    .max(150, "Description must be 150 characters or less"),

  tag: requiredRichText("Tags are required")
    .max(150, "Tags must be 150 characters or less"),

  difficulty: z.nativeEnum(CourseDifficulty, {
    message: "Please select a difficulty level",
  }),

  description: requiredRichText("Course outline is required"),

  logo: z.string().optional().or(z.literal("")),

  language: z.nativeEnum(CourseLanguage, {
    message: "Please select a language",
  }),
});

export type CourseInfoFormData = z.infer<typeof courseInfoSchema>;
