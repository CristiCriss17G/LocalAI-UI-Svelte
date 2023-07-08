import type { RequestHandler } from './$types';
import { CHAT_MODEL, AI_ENDPOINT } from '$env/static/private';
// import type { Message } from 'ai/svelte/dist';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
	basePath: `${AI_ENDPOINT}/v1`
});

const api = new OpenAIApi(config);

// interface ChatResponse {
// 	objcet: string;
// 	model: string;
// 	choices: [
// 		{
// 			message: {
// 				role: string;
// 				content: string;
// 			};
// 		}
// 	];
// 	usage: {
// 		prompt_tokens: number;
// 		completion_tokens: number;
// 		total_tokens: number;
// 	};
// }

// export const POST: RequestHandler = async ({ request }) => {
// 	const { messages } = await request.json();

// 	console.log('messages', messages);

// 	const temperature = 0.7;

// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({
// 			model: CHAT_MODEL,
// 			messages: [...messages],
// 			temperature
// 			// stream: true
// 		})
// 	};

// 	const chatEndpoint = `${AI_ENDPOINT}/v1/chat/completions`;

// 	// console.table({ chatEndpoint, requestOptions });

// 	// Start fetch request
// 	const response = await fetch(chatEndpoint, requestOptions);

// 	// If the response is okay, return the response
// 	if (response.ok) {
// 		const data: ChatResponse = await response.json();

// 		const message: Message = {
// 			id: '1',
// 			content: data.choices[0].message.content,
// 			role: 'assistant'
// 		};

// 		new

// 		return new Response(JSON.stringify(message));
// 	} else {
// 		// Handle error
// 		throw new Error(`Request failed with status ${response.status}`);
// 	}
// };

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	console.log('messages', messages);

	// create new object with just the latest message
	const message = messages[messages.length - 1];

	const newMessages = [message];

	console.log('newMessages', newMessages);

	const temperature = 0.7;

	const response = await api.createChatCompletion({
		model: CHAT_MODEL,
		stream: true,
		messages: newMessages,
		temperature
	});

	// const data = await response.json();

	// console.log('response', data);

	// const stream = OpenAIStream(new Response(JSON.stringify(data)));
	// const stream = OpenAIStream(response);

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		onStart: async () => {
			// This callback is called when the stream starts
			// You can use this to save the prompt to your database
			//   await savePromptToDatabase(prompt)
			console.log('stream started', message.content);
		},
		onToken: async (token: string) => {
			// This callback is called for each token in the stream
			// You can use this to debug the stream or save the tokens to your database
			// console.log(token);
		},
		onCompletion: async (completion: string) => {
			// This callback is called when the stream completes
			// You can use this to save the final completion to your database
			//   await saveCompletionToDatabase(completion)
			console.log('stream completed', completion);
		}
	});

	return new StreamingTextResponse(stream);
};
