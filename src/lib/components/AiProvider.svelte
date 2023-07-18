<script lang="ts">
	import type { AiProvider } from '@prisma/client';
	import Markdown from '@magidoc/plugin-svelte-marked';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

	export let provider: AiProvider;
	export let className = '';
</script>

<div class="chat-interaction {className ? className : ''}">
	<p>Created at: <code>{provider.createdAt}</code></p>
	<ul>
		<li>Name: {provider.name}</li>
		<li>Endpoint: {provider.endpoint}</li>
		{#if provider.openAiModel}
			<li>OpenAi Model: <Fa class="inline-block" icon={faSquareCheck} /></li>
		{:else}
			<li>OpenAi Model: <Fa class="inline-block" icon={faSquareXmark} /></li>
		{/if}
		<li>Payload: <Markdown source={'```\n' + provider.payload + '\n```'} /></li>
	</ul>
</div>

<style>
	.chat-interaction {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.chat-interaction p {
		margin: 0;
	}

	.chat-interaction ul li {
		margin: 0;
		padding: 0;
	}

	/* .chat-interaction ul li:first-child {
		margin-bottom: 0.5rem;
	} */
</style>
