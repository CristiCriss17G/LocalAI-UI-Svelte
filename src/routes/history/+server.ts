import type { PageServerLoad } from './$types';
import { deleteChats } from '$lib/server/chatInteractionActions/deleteChats';

export const DELETE = (async () => {
	const count = await deleteChats();

	return new Response(`Deleted ${count} chat interactions`, {
		status: 200
	});
}) satisfies PageServerLoad;
