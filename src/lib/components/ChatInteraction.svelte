<script lang="ts">
	import type { ChatInteraction } from '@prisma/client';
	import Markdown from '@magidoc/plugin-svelte-marked';

	export let interaction: ChatInteraction;
	export let className: string = '';
</script>

<div class="char-interaction {className ? className : ''}">
	<p>Created at: <code>{interaction.createdAt}</code></p>
	<ul>
		<li>User Input: {interaction.userRequest}</li>
		<li>Local AI Response: <Markdown source={interaction.botResponse} /></li>
	</ul>
</div>

<style>
	.char-interaction {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.char-interaction p {
		margin: 0;
	}

	.char-interaction ul li {
		margin: 0;
		padding: 0;
	}

	.char-interaction ul li:first-child {
		margin-bottom: 0.5rem;
	}
</style>
