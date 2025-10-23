import { z } from 'zod';

const VoiceRecordSchema = z.any();

export type AddMemoFormValue = z.infer<typeof createNewMemoSchema>;

/* */

export const tokenFormSchema = z.object({
  token: z.string().min(1),
});

export type AddTokenFormValue = z.infer<typeof tokenFormSchema>;

const TokenSchema = tokenFormSchema;

/* */

export const createNewMemoSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  tokens: z.array(TokenSchema), // может быть пустым
  description: z.string().optional(),
  records: z.array(VoiceRecordSchema), // может быть пустым
  created: z.number().optional(),
  updated: z.number().optional(),
});
