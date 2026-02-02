import { z } from 'zod';

export const LoginTokenPayloadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  module: z.string(),
});

export type LoginTokenPayload = z.infer<typeof LoginTokenPayloadSchema>;
