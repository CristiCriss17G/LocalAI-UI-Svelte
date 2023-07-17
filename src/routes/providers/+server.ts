import type { RequestHandler } from './$types';
import { getAiProvidersFE } from '$lib/server/aiProviderActions/getAiProviders';

export const GET: RequestHandler = async () => {
	const providers = await getAiProvidersFE();

	return new Response(JSON.stringify(providers));
};
