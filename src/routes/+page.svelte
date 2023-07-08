<script lang="ts">
	import './global.css';
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';

	interface Model {
		id: string;
		object: string;
	}

	// let isLoading = false;
	let error = false;
	let currentAssistantMessage = '';
	let selectedModel = '';
	let chatContainerRef;

	const { messages, handleSubmit, input, isLoading } = useChat({
		api: '/chat'
	});

	const handleSubmitCustom = async (e: any) => {
		e.preventDefault();
		// isLoading = true;
		console.log(e);
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

<!-- <section>
    <h1>Chat</h1>

    <p>Available models: </p>

    <ul>
        {#each models as model}
            <li>{model.id}</li>
        {/each}
    </ul>

    <ul>
        {#each $messages as message}
            <li>{message.role} says... {message.content}</li>
        {/each}
    </ul>

    <form on:submit={handleSubmit}>
        <input bind:value={$input} placeholder="Say Something..."/>
        <button type="submit">Send</button>
    </form>

</section> -->

<main class="chat-page">
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
							<pre>{message.content}</pre>
						{/if}
					</span>
				</div>
			{/each}
		</div>
	</div>
	<form class="chat-input" on:submit={handleSubmitCustom}>
		<!-- Render input field and submit button  -->
		<input bind:value={$input} class="input-field" placeholder="Say Something..." />
		<button type="submit" disabled={!input || $isLoading}>Send</button>
	</form>
	<!-- Render error message if there's an error -->
	{#if error}
		<div class="error-message">{error}</div>
	{/if}
</main>

<!-- <style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style> -->
