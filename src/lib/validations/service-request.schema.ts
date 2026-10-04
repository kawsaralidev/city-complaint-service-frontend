import { z } from "zod";

export const serviceRequestSchema = z.object({
  serviceId: z.string().uuid("Please select a valid service"),

  location: z.string().trim().min(3, "Location must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 10,
      "Description must be at least 10 characters",
    ),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;
