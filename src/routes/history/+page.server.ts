import type { PageServerLoad } from './$types';
import { getChats } from '$lib/server/chatInteractionActions/getChats';

export const load = (async () => {
	const response = await getChats();

	return { history: { response } };
}) satisfies PageServerLoad;
