import { z } from "zod";
import { requiredRichText } from "./helper";

export const qaSchema = z.object({
  description: requiredRichText("Question is required"),
});

export type QAFormData = z.infer<typeof qaSchema>;
