import type { RequestHandler } from './$types';
import { AI_ENDPOINT } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	const chatEndpoint = `${AI_ENDPOINT}/v1/models`;

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
