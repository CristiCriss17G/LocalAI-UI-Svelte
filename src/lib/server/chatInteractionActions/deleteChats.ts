import prisma from '$lib/server/prisma';

export const deleteChats = async () => {
	const response = await prisma.chatInteraction.deleteMany();

	const count = response.count;

	return count;
};
