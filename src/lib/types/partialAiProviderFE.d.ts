import type { AiProvider } from '@prisma/client';

export type PartialAiProviderFE = Pick<AiProvider, 'id' | 'name' | 'endpoint' | 'openAiModel'>;
