<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';
	import Markdown from '@magidoc/plugin-svelte-marked';

	interface Model {
		id: string;
		object: string;
	}

	// let isLoading = false;
	let error = false;
	// let currentAssistantMessage = '';
	let selectedModel = '';
	let chatContainerRef: HTMLDivElement;

	const { messages, handleSubmit, input, isLoading } = useChat({
		api: '/chat'
	});

	const handleSubmitCustom = async (e: SubmitEvent) => {
		e.preventDefault();
		// isLoading = true;
		console.log(e);
		// Clear the old content
		chatContainerRef.children[0].innerHTML = '';
		handleSubmit(e);
	};

	let models: Model[] = [];

	async function getModels() {
		const response = await fetch('/chat/models');
		const data = await response.json();
		models = data.data;
	}

	onMount(() => {
		getModels();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte AI chat demo app" />
</svelte:head>

<!-- <main class="chat-page"> -->
<!-- Render dropdown list for models -->
<div class="model-dropdown">
	<select value={selectedModel}>
		{#each models as model}
			<option value={model.id}>
				{model.id}
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
