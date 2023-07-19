<script lang="ts">
	import type { AiProvider } from '@prisma/client';
	import Markdown from '@magidoc/plugin-svelte-marked';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSquareCheck, faSquareXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

	export let provider: AiProvider;
	export let className = '';
	export let handleDelete: (id: number) => void;
</script>

<div class="chat-interaction {className ? className : ''}">
	<p>Created at: <code>{provider.createdAt}</code></p>
	<div class="flex w-full">
		<div class="w-3/4">
			<table class="table-auto border-separate border-spacing-3">
				<tbody>
					<tr>
						<td>Name</td>
						<td>{provider.name}</td>
					</tr>
					<tr>
						<td>Endpoint</td>
						<td>{provider.endpoint}</td>
					</tr>
					{#if provider.openAiModel}
						<tr>
							<td>OpenAi Model</td>
							<td><Fa class="inline-block" icon={faSquareCheck} /></td>
						</tr>
						<tr>
							<td>Model Name</td>
							<td>{provider.model}</td>
						</tr>
						<tr>
							<td>Stream</td>
							<td
								><Fa
									class="inline-block"
									icon={provider.stream ? faSquareCheck : faSquareXmark}
								/></td
							>
						</tr>
					{:else}
						<tr>
							<td>OpenAi Model</td>
							<td><Fa class="inline-block" icon={faSquareXmark} /></td>
						</tr>
						<tr>
							<td>Payload</td>
							<td><Markdown source={'```\n' + provider.payload + '\n```'} /></td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
		{#if handleDelete}
			<div class="w-1/4">
				<button class="button block ml-auto mr-3" on:click={() => handleDelete(provider.id)}
					><Fa icon={faTrash} /></button
				>
			</div>
		{/if}
	</div>
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

	/* .chat-interaction ul li {
		margin: 0;
		padding: 0;
	} */

	/* .chat-interaction ul li:first-child {
		margin-bottom: 0.5rem;
	} */
</style>
