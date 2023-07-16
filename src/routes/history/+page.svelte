<script lang="ts">
	import ChatInteraction from '$lib/components/ChatInteraction.svelte';
	import type { PageData } from './$types';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;

	$: ({ history } = data);

	const handleDeleteHistory = async () => {
		const res = await fetch('/history', {
			method: 'DELETE'
		});
		if (res.ok) {
			history.response = [];
		}
	};
</script>

<svelte:head>
	<title>History</title>
	<meta name="description" content="History of chat interactions" />
</svelte:head>

<h1>History</h1>
<div class="chat-container">
	<main>
		<div>
			{#each history.response as chatInteraction}
				<ChatInteraction interaction={chatInteraction} className="message-content" />
			{/each}
		</div>
	</main>
</div>

<form class="chat-input" on:submit={handleDeleteHistory}>
	<button type="submit" class="submit-button">
		<Fa icon={faTrash} />
	</button>
</form>

<style>
	h1 {
		margin-top: 0;
	}
</style>
