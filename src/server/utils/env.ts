import { z } from "zod";

const envSchema = z.object({
	ENV: z.enum(["development", "production", "test"]).default("development"),
	DB_URL: z.string().min(1),
	JWT_SECRET: z.string().min(32),
});

export type Env = z.infer<typeof envSchema>;
export const Env = envSchema.parse(process.env);
