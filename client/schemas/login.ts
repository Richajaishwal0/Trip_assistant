import { z } from "zod";

//  Login Schema
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});

