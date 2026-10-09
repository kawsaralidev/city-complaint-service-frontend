import { z } from "zod";

export const complaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Complaint title must be at least 5 characters"),

  categoryId: z.string().uuid("Please select a valid complaint category"),

  location: z
    .string()
    .trim()
    .min(3, "Complaint location must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Complaint description must be at least 10 characters"),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;
