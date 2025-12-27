import { z } from "zod";
import { requiredRichText } from "./helper";

export const lessonSchema = z.object({
  title: requiredRichText("Lesson name is required"),

  description: requiredRichText("Description is required"),

  pre_note: z.string().optional(),

  next_note: z.string().optional(),

  order: z
    .number({
      message: "Lesson arrangement must be a number",
    })
    .int("Lesson arrangement must be a whole number")
    .min(0, "Lesson arrangement must be 0 or greater"),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
