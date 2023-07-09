import prisma from '$lib/server/prisma';

export const saveUserInput = async (model: string, input: string) => {
	const response = await prisma.chatInteraction.create({
		data: {
			model: model,
			userRequest: input
		}
	});

	// return the id of the new chat interaction
	return response.id;
};

export const saveBotResponse = async (id: number, response: string) => {
	const chatInteraction = await prisma.chatInteraction.update({
		where: {
			id: id
		},
		data: {
			botResponse: response
		}
	});

	return chatInteraction;
};
