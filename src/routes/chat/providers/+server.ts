import type { RequestHandler } from './$types';
import type { PartialAiProvider } from '$lib/types/partialAiProvider';
import { saveAiProvider, updateAiProvider } from '$lib/server/aiProviderActions/saveAiProvider';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	const chatEndpoint = `${env.AI_ENDPOINT}/v1/models`;

	console.log('chatEndpoint', chatEndpoint);

	// Start fetch request
	const response = await fetch(chatEndpoint, requestOptions);

	// If the response is okay, return the response
	if (response.ok) {
		const data = await response.json();

		console.log('response', data);

		return new Response(JSON.stringify(data));
	} else {
		// Handle error
		throw new Error(`Request failed with status ${response.status}`);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const {
		name: providerName,
		endpoint,
		openAiModel,
		payload
	}: PartialAiProvider = await request.json();

	const provider = await saveAiProvider({
		name: providerName,
		endpoint,
		openAiModel,
		payload
	});

	return new Response(JSON.stringify(provider));
};

export const PUT: RequestHandler = async ({ request, params }) => {
	const data = await request.json();

	console.log('data', request);
	console.log('params', params);

	return new Response(JSON.stringify({ data, params }));

	const {
		name: providerName,
		endpoint,
		openAiModel,
		payload
	}: PartialAiProvider = await request.json();

	const provider = await updateAiProvider(Number(params.id), {
		name: providerName,
		endpoint,
		openAiModel,
		payload
	});

	return new Response(JSON.stringify(provider));
};
