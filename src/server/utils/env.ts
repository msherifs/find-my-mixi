import { z } from "zod";

const envSchema = z.object({
	ENV: z.enum(["development", "production", "test"]).default("development"),
	DB_URL: z.string().min(1),
	JWT_SECRET: z.string().min(32),
	SPACES_ENDPOINT: z.string().min(1),
	SPACES_REGION: z.string().min(1),
	SPACES_BUCKET: z.string().min(1),
	SPACES_ACCESS_KEY_ID: z.string().min(1),
	SPACES_SECRET_ACCESS_KEY: z.string().min(1),
	MAILGUN_API_KEY: z.string().optional(),
	MAILGUN_DOMAIN: z.string().optional(),
	APP_URL: z.string().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;
export const Env = envSchema.parse(process.env);
