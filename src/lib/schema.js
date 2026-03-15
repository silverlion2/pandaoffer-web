import { z } from "zod";

export const aiMatcherSchema = z.object({
  nationality: z.string().min(1, { message: "Nationality is required." }),
  major: z.string().min(1, { message: "Target Major is required." }),
  gpa: z.object({
    scale: z.enum(["percentage", "four", "five"], { required_error: "Scale is required" }),
    value: z.string().min(1, { message: "Score is required" }),
  })
}).superRefine((data, ctx) => {
  const numValue = parseFloat(data.gpa.value);
  if (isNaN(numValue)) {
    ctx.addIssue({ path: ["gpa", "value"], code: z.ZodIssueCode.custom, message: "Must be a number." });
    return;
  }
  if (data.gpa.scale === "percentage" && (numValue < 0 || numValue > 100)) {
    ctx.addIssue({ path: ["gpa", "value"], code: z.ZodIssueCode.custom, message: "0-100 expected." });
  } else if (data.gpa.scale === "four" && (numValue < 0 || numValue > 4.0)) {
    ctx.addIssue({ path: ["gpa", "value"], code: z.ZodIssueCode.custom, message: "0.0-4.0 expected." });
  } else if (data.gpa.scale === "five" && (numValue < 0 || numValue > 5.0)) {
    ctx.addIssue({ path: ["gpa", "value"], code: z.ZodIssueCode.custom, message: "0.0-5.0 expected." });
  }
});

export const unlockSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms." }),
  }),
});
