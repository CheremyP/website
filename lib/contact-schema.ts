import { z } from "zod";

const noNewlines = (v: string) => !/[\r\n]/.test(v);

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").refine(noNewlines, "Name cannot contain newlines"),
  email: z.string().email("Please enter a valid email address").max(150, "Email is too long").refine(noNewlines, "Email cannot contain newlines"),
  phone: z.string().max(50, "Phone number is too long").optional(),
  company: z.string().max(150, "Company name is too long").optional(),
  sector: z.string().min(1, "Please select a sector").max(100, "Sector is too long"),
  budget: z.string().max(100, "Budget string is too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long (max 5000 characters)"),
  honeypot: z.string().max(0, "Invalid submission").optional(), // Anti-spam
});

export type ContactFormData = z.infer<typeof contactSchema>;
