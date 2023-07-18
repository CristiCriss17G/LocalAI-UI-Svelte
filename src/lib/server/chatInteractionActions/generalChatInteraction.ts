import type { AiProvider } from '@prisma/client';
import { saveUserInput, saveBotResponse } from '$lib/server/chatInteractionActions/saveChat';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export const makeGeneralAiRequest = async (
	provider: AiProvider,
	messages: ChatCompletionRequestMessage[],
	temperature: number
) => {
	const chatId: number = await saveUserInput(provider.id, messages[0].content!);
	// replace %MESSAGE% with the user's message in the prompt
	const prompt = provider.payload.replace('%MESSAGE%', messages[0].content!);

	// replace %TEMPERATURE% with the user's temperature in the prompt
	const promptWithTemperature = prompt.replace('%TEMPERATURE%', temperature.toString());

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: promptWithTemperature
	};

	const response = await fetch(provider.endpoint, requestOptions);

	const data = await response.json();

	console.log('response', data);

	saveBotResponse(chatId, data.choices[0].text);

	return new Response(JSON.stringify(data));
};
