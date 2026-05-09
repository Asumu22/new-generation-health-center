import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Please enter a valid email address.");

export const appointmentSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(7, "Phone number is required."),
  serviceId: z.string().uuid("Invalid service selected."),
  email: z.string().email().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  message: z.string().max(1000).optional(),
  type: z.enum(["consultation", "quote"]).default("consultation"),
});

export const messageSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: emailSchema,
  message: z.string().min(10, "Message must be at least 10 characters."),
  subject: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
});
