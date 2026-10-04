import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(3, "Service name must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 10,
      "Description must be at least 10 characters",
    ),

  baseFee: z
    .string()
    .min(1, "Base fee is required")
    .refine((value) => Number(value) > 0, "Base fee must be greater than 0"),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
