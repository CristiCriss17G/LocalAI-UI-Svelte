import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.chatInteraction.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { history: { response } };
}) satisfies PageServerLoad;
