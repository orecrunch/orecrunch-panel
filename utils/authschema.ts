import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(5, 'Username must be at least 5 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  image: z.string().url(),
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

export const deleteCredentialsSchema = z.object({
  type: z.string(),
  credentialsId: z.string(),
})