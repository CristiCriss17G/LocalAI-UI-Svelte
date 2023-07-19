import type { RequestHandler } from './$types';
import type { PartialAiProvider } from '$lib/types/partialAiProvider';
import { saveAiProvider } from '$lib/server/aiProviderActions/saveAiProvider';
import { getAiProvidersFE, getAiProviders } from '$lib/server/aiProviderActions/getAiProviders';
// import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const fullProviders = Boolean(url.searchParams.get('fullProviders') ?? false);

	const response = fullProviders ? await getAiProviders() : await getAiProvidersFE();

	// If the response is okay, return the response
	console.log('response', response);

	return new Response(JSON.stringify(response));
};

export const POST: RequestHandler = async ({ request }) => {
	const {
		name: providerName,
		endpoint,
		openAiModel,
		model,
		stream,
		payload
	}: PartialAiProvider = await request.json();

	const provider = await saveAiProvider({
		name: providerName,
		endpoint,
		openAiModel,
		model,
		stream,
		payload
	});

	return new Response(JSON.stringify(provider));
};
