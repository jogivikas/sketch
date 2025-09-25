// schemas/user.ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // require at least 6 chars (adjust as you like)
  name: z.string().min(3).max(50), // allow common name lengths
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(50), // if you want to accept "name" and create slug server-side
});
