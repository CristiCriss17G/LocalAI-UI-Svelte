import prisma from '$lib/server/prisma';

export const getAiProviders = async () => {
	const providers = await prisma.aiProvider.findMany({
		select: {
			id: true,
			name: true,
			endpoint: true,
			openAiModel: true,
			payload: true
		}
	});

	return providers;
};

export const getAiProvider = async (id: number) => {
	const provider = await prisma.aiProvider.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			endpoint: true,
			openAiModel: true,
			payload: true
		}
	});

	return provider;
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
