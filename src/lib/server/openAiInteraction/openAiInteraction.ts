import type { AiProvider } from '@prisma/client';
import type { ChatCompletionRequestMessage } from 'openai-edge';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { saveUserInput, saveBotResponse } from '$lib/server/chatInteractionActions/saveChat';

export const makeOpenAiRequest = async (
	provider: AiProvider,
	messages: ChatCompletionRequestMessage[],
	temperature: number
) => {
	const config = new Configuration({
		basePath: `${provider.endpoint}/v1`
	});

	const api = new OpenAIApi(config);

	const response = await api.createChatCompletion({
		model: provider.model!,
		stream: true,
		messages,
		temperature
	});

	// const data = await response.json();

	// console.log('response', data);

	// const stream = OpenAIStream(new Response(JSON.stringify(data)));
	// const stream = OpenAIStream(response);

	// Convert the response into a friendly text-stream
	let chatId: number;
	const stream = OpenAIStream(response, {
		onStart: async () => {
			// This callback is called when the stream starts
			// You can use this to save the prompt to your database
			//   await savePromptToDatabase(prompt)
			console.log('stream started', messages[0].content);
			chatId = await saveUserInput(provider.id, messages[0].content!);
		},
		// onToken: async (token: string) => {
		// 	// This callback is called for each token in the stream
		// 	// You can use this to debug the stream or save the tokens to your database
		// 	// console.log(token);
		// },
		onCompletion: async (completion: string) => {
			// This callback is called when the stream completes
			// You can use this to save the final completion to your database
			//   await saveCompletionToDatabase(completion)
			console.log('stream completed', completion);
			await saveBotResponse(chatId, completion);
		}
	});

	return new StreamingTextResponse(stream);
};
