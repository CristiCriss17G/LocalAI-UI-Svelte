import prisma from '$lib/server/prisma';

export const getChats = async () => {
	const response = await prisma.chatInteraction.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	return response;
};
