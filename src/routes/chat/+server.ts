import type { RequestHandler } from './$types';
import { getAiProvider } from '$lib/server/aiProviderActions/getAiProviders';
import { makeOpenAiRequest } from '$lib/server/openAiInteraction/openAiInteraction';
import { makeGeneralAiRequest } from '$lib/server/chatInteractionActions/generalChatInteraction';

export const POST: RequestHandler = async ({ request }) => {
	const { messages, temperature, selectedProvider } = await request.json();

	console.log('payload', { messages, temperature, selectedProvider });

	const provider = await getAiProvider(selectedProvider);

	// create new object with just the latest message
	const message = messages[messages.length - 1];

	const newMessages = [message];

	console.log('newMessages', newMessages);

	// const response = await makeOpenAiRequest(provider, newMessages, temperature);
	const response = provider.openAiModel
		? await makeOpenAiRequest(provider, newMessages, temperature)
		: await makeGeneralAiRequest(provider, newMessages, temperature);

	return response;
};
