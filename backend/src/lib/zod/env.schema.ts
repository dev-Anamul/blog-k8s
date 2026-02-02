import { z } from 'zod';

export const envSchema = z.object({
  // common
  NODE_ENV: z.string(),
  PORT: z.string().transform((val) => Number.parseInt(val)),
  API_BASE_URL: z.string(),
  CLIENT_BASE_URL: z.string(),

  // MONGO NODE'S
  MONGO_HOST: z.string(),
  MONGO_PORT: z.string().transform((val) => Number.parseInt(val)),

  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  // LOGIN TOKEN
  LOGIN_SECRET: z.string(),
  LOGIN_EXPIRES_IN: z.string(),

  // REFRESH TOKEN
  REFRESH_SECRET: z.string(),
  REFRESH_EXPIRES_IN: z.string(),

  // REDIS
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((val) => Number.parseInt(val)),

  // MAIL
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string().transform((val) => Number.parseInt(val)),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
  MAIL_TO: z.string(),

  // multer
  MAX_FILE_SIZE: z.string().transform((val) => Number.parseInt(val)),
  UPLOAD_PATH: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
