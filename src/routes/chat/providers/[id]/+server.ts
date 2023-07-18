import type { RequestHandler } from './$types';
import type { PartialAiProvider } from '$lib/types/partialAiProvider';
import { updateAiProvider } from '$lib/server/aiProviderActions/saveAiProvider';

export const PUT: RequestHandler = async ({ request }) => {
	const providerId = Number(request.url.split('/').pop());

	const {
		name: providerName,
		endpoint,
		openAiModel,
		model,
		payload
	}: PartialAiProvider = await request.json();

	const provider = await updateAiProvider(providerId, {
		name: providerName,
		endpoint,
		openAiModel,
		model,
		payload
	});

	return new Response(JSON.stringify(provider));
};
