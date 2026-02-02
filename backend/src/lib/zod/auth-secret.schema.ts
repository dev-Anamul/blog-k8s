import { AppModule } from '@/shared/enum/user.enum';
import { z } from 'zod';

export const AuthSecretSchema = z.object({
  email: z.string().email(),
  module: z.nativeEnum(AppModule),
  apiKey: z.string(),
  apiSecret: z.string(),
  id: z.string().optional(),
});

export type AuthSecretSchemaType = z.infer<typeof AuthSecretSchema>;
export const CreateAuthSecretSchema = AuthSecretSchema.omit({ id: true });
export const UpdateAuthSecretSchema = AuthSecretSchema.omit({ id: true });

export type CreateAuthSecretType = z.infer<typeof CreateAuthSecretSchema>;
export type UpdateAuthSecretType = z.infer<typeof UpdateAuthSecretSchema>;
