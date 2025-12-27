import { z } from "zod";

const stripHtml = (val: string) => val.replace(/<[^>]*>/g, "").trim();

export const requiredRichText = (message: string) =>
  z.string().min(1, message).refine((val) => stripHtml(val).length > 0, message);
