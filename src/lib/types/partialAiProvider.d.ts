import type { AiProvider } from '@prisma/client';

export type PartialAiProvider = Pick<AiProvider, 'name' | 'endpoint' | 'openAiModel' | 'payload'>;
