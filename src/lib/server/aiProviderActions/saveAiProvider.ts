import prisma from '$lib/server/prisma';
import type { PartialAiProvider } from '$lib/types/partialAiProvider';

export const saveAiProvider = async (provider: PartialAiProvider) => {
	const response = await prisma.aiProvider.create({
		data: provider
	});

	return response;
};

export const updateAiProvider = async (id: number, provider: PartialAiProvider) => {
	const response = await prisma.aiProvider.update({
		where: {
			id: id
		},
		data: provider
	});

	return response;
};
