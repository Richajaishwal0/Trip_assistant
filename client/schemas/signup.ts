import { z } from "zod";

// --- Phone Regex (same as your existing one) ---
const phonePattern =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;


// Signup Schema
export const SignupSchema = z
  .object({
    userName: z.string().min(5, "Username mut be atleast 5 characters").max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_@]+$/, "Username can only contain letters, numbers, @ and underscores"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    mobileNo: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .regex(phonePattern, "Please enter a valid phone number format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
