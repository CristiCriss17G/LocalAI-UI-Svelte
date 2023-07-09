import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
// import type { Message } from 'ai/svelte/dist';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { saveUserInput, saveBotResponse } from '$lib/server/chatInteractionActions/saveChat';

const config = new Configuration({
	basePath: `${env.AI_ENDPOINT}/v1`
});

const api = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	console.log('messages', messages);

	// create new object with just the latest message
	const message = messages[messages.length - 1];

	const newMessages = [message];

	console.log('newMessages', newMessages);

	const temperature = 0.7;

	const response = await api.createChatCompletion({
		model: env.CHAT_MODEL,
		stream: true,
		messages: newMessages,
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
			console.log('stream started', message.content);
			chatId = await saveUserInput(env.CHAT_MODEL, message.content);
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
