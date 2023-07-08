<script lang="ts">
	import ChatInteraction from '$lib/components/ChatInteraction.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1>History</h1>
	<main>
		<div>
			<!-- 2. -->
			{#each data.history as chatInteraction (chatInteraction.id)}
				<ChatInteraction {chatInteraction} />
			{/each}
		</div>
	</main>
</div>
