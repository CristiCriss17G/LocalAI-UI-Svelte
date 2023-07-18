import prisma from '$lib/server/prisma';
import type { AiProvider } from '@prisma/client';

export const getAiProviders = async () => {
	const providers = await prisma.aiProvider.findMany({});

	return providers;
};

export const getAiProvider = async (id: number): Promise<AiProvider> => {
	const provider = await prisma.aiProvider.findUnique({
		where: {
			id: id
		}
	});

	return provider as AiProvider;
};

export const getAiProvidersFE = async () => {
	const providers = await prisma.aiProvider.findMany({
		select: {
			id: true,
			name: true,
			endpoint: true,
			openAiModel: true
		}
	});

	return providers;
};

export const getAiProviderFE = async (id: number) => {
	const provider = await prisma.aiProvider.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			endpoint: true,
			openAiModel: true
		}
	});

	return provider;
};
