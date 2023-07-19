import type { AiProvider } from '@prisma/client';

export type PartialAiProvider = Pick<
	AiProvider,
	'name' | 'model' | 'endpoint' | 'openAiModel' | 'stream' | 'payload'
>;
