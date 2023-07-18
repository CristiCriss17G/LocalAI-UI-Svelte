<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';
	import Markdown from '@magidoc/plugin-svelte-marked';
	import type { PartialAiProviderFE } from '$lib/types/partialAiProviderFE';

	// let isLoading = false;
	let error = false;
	// let currentAssistantMessage = '';
	let selectedProvider = 0;
	let temperature = 0.5;
	let chatContainerRef: HTMLDivElement;

	const { messages, handleSubmit, input, isLoading, stop } = useChat({
		api: '/chat'
	});

	const handleSubmitCustom = async (e: SubmitEvent) => {
		e.preventDefault();
		// isLoading = true;
		console.log(e);
		// Clear the old content
		chatContainerRef.children[0].innerHTML = '';
		handleSubmit(e, { options: { body: { temperature, selectedProvider } } });
	};

	let providers: PartialAiProviderFE[] = [];

	async function getProviders() {
		const response = await fetch('/chat/providers', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		providers = data.data;
	}

	onMount(() => {
		getProviders();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte AI chat demo app" />
</svelte:head>

<!-- <main class="chat-page"> -->
<!-- Render dropdown list for models -->
<div class="model-dropdown">
	<select value={selectedProvider}>
		{#each providers as provider}
			<option value={provider.id}>
				{provider.name}
			</option>
		{/each}
	</select>
</div>
<div class="chat-container" bind:this={chatContainerRef}>
	<div class="chat-messages">
		<!-- Render user input and chatbot responses -->
		{#each $messages as message}
			<div class="chat-message {message.role === 'user' ? 'user-message' : 'assistant-message'}">
				<span class="message-role">
					{message.role === 'user' ? 'You' : 'LocalAI'}:
				</span>
				<span class="message-content">
					{#if message.role === 'user'}
						{message.content}
					{:else}
						<Markdown source={message.content} />
					{/if}
				</span>
			</div>
		{/each}
	</div>
</div>
<form class="chat-input" on:submit={handleSubmitCustom}>
	<!-- Render input field and submit button  -->
	<input bind:value={$input} class="input-field" placeholder="Say Something..." />
	<button type="submit" class="submit-button" disabled={!input || $isLoading}>Send</button>
</form>
<!-- Render error message if there's an error -->
{#if error}
	<div class="error-message">{error}</div>
{/if}
<!-- </main> -->
