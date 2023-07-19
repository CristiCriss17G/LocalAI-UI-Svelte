<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;
	import AiProvider from '$lib/components/AiProvider.svelte';
	import type { AiProvider as AiProviderType } from '@prisma/client';
	import { onMount } from 'svelte';

	let activeTab = 1;

	function setActiveTab(tab: number) {
		if (tab === activeTab) return;
		if (tab === 1) getProviders();
		activeTab = tab;
	}

	let providerName = '';
	let endpoint = '';
	let openAiModel = false;
	let model = '';
	let stream = false;
	let payload = '';
	let isValid = true;

	const handleSubmit = async (e: SubmitEvent) => {
		// Perform form submission logic here
		// You can access the form field values as modelName, endpoint, openAiModel, and payload
		e.preventDefault();

		console.table({
			providerName,
			endpoint,
			openAiModel,
			model,
			payload
		});

		const requestBody = {
			name: providerName,
			endpoint,
			openAiModel,
			model,
			payload,
			stream
		};

		const response = await fetch('/chat/providers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const data = await response.json();

		console.log(data);

		if (data.createdAt) {
			providerName = '';
			endpoint = '';
			openAiModel = false;
			stream = false;
			model = '';
			payload = '';
		}
	};

	const handleDelete = async (id: number) => {
		const response = await fetch(`/chat/providers/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		console.log(data);

		getProviders();
	};

	function validateProviderName() {
		if (providerName.length === 0 || providerName.length > 50) {
			isValid = false;
		} else {
			isValid = true;
		}
	}

	function validateEndpoint() {
		if (endpoint.length === 0 || endpoint.length > 100 || !/^https?:\/\/.+/.test(endpoint)) {
			isValid = false;
		} else {
			isValid = true;
		}
	}

	function validateModel() {
		if (model.length > 50 && openAiModel) {
			isValid = false;
		} else {
			isValid = true;
		}
	}

	function validatePayload() {
		if ((payload.length === 0 || payload.length > 1000) && !openAiModel) {
			isValid = false;
		} else {
			isValid = true;
		}
	}

	let providers: AiProviderType[] = [];

	async function getProviders() {
		const response = await fetch('/chat/providers?fullProviders=true', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		providers = data;
	}

	onMount(() => {
		getProviders();
	});
</script>

<svelte:head>
	<title>Providers</title>
	<meta name="description" content="View and add AI providers" />
</svelte:head>

<div class="flex w-3/4 mb-4">
	<button class="tab-button" class:selected={activeTab === 1} on:click={() => setActiveTab(1)}>
		List Providers
	</button>

	<button class="tab-button" class:selected={activeTab === 2} on:click={() => setActiveTab(2)}>
		Add provider
	</button>
</div>

<div class="chat-container">
	{#if activeTab === 1}
		<!-- Content for Tab 1 -->
		<div class="tab-content active">
			<!-- Add your content for Tab 1 here -->
			{#each providers as provider}
				<AiProvider {provider} {handleDelete} className="message-content" />
			{/each}
		</div>
	{/if}

	{#if activeTab === 2}
		<!-- Content for Tab 2 -->
		<div class="tab-content active">
			<form on:submit={handleSubmit}>
				<div class="flex gap-2 mb-4">
					<div class="{(isValid && 'valid') || 'invalid'} w-1/2">
						<label for="provider-name" class="text-center block">Provider Name:</label>
						<input
							type="text"
							id="provider-name"
							bind:value={providerName}
							on:input={validateProviderName}
							class="block w-full"
						/>
						<!-- Display validation error message for Model Name field -->
					</div>

					<div class="{(isValid && 'valid') || 'invalid'} w-1/2">
						<label for="endpoint" class="text-center block">Endpoint:</label>
						<input
							type="text"
							id="endpoint"
							bind:value={endpoint}
							on:input={validateEndpoint}
							class="block w-full"
						/>
						<!-- Display validation error message for Endpoint field -->
					</div>
				</div>

				<div class="flex gap-2 mb-4 justify-around items-center">
					<div class="my-4">
						<label for="open-ai-model">Open AI Model:</label>
						<input
							type="checkbox"
							id="open-ai-model"
							bind:checked={openAiModel}
							class="inline-block ml-2"
						/>
					</div>

					<div class="my-4">
						<label for="open-ai-stream" class={(!openAiModel && 'text-gray-50/10') || ''}
							>Streaming Model:</label
						>
						<input
							type="checkbox"
							id="open-ai-stream"
							bind:checked={stream}
							class="inline-block ml-2 {(!openAiModel && 'opacity-10') || ''}"
							disabled={!openAiModel}
						/>
					</div>

					<div class="{(isValid && 'valid') || 'invalid'} my-4">
						<label for="model" class="text-center block {(!openAiModel && 'text-gray-50/10') || ''}"
							>Model:</label
						>
						<input
							type="text"
							id="model"
							bind:value={model}
							on:input={validateModel}
							class="block mx-auto {(!openAiModel && 'opacity-10') || ''}"
							disabled={!openAiModel}
						/>
					</div>
				</div>

				<div class="{(isValid && 'valid') || 'invalid'} my-4">
					<hr class="mb-2" />
					<div class="mb-2 {(openAiModel && 'text-gray-50/10') || ''}">
						<p>
							For a proper interpretation of the payload please add the following variables if the
							model supports them:
						</p>
						<ul>
							<li><code>%MESSAGE%</code> - in the place where the message/prompt should be put</li>
							<li><code>%TEMPERATURE%</code> - in the place where the temperature should be put</li>
						</ul>
					</div>
					<label for="payload" class="text-center block {(openAiModel && 'text-gray-50/10') || ''}"
						>Payload:</label
					>
					<textarea
						id="payload"
						bind:value={payload}
						on:input={validatePayload}
						class="block w-full h-24 min-h-full {(openAiModel && 'opacity-10') || ''}"
						disabled={openAiModel}
					/>
				</div>

				<button type="submit" class="block mt-10 mx-auto submit-button" disabled={!isValid}
					>Submit</button
				>
			</form>
		</div>
	{/if}
</div>

<style lang="postcss">
	.tab-button {
		@apply flex-1 p-4 text-center font-semibold transition-all duration-150 rounded-sm;
	}

	.tab-button:hover {
		@apply bg-gray-100 bg-opacity-25 cursor-pointer;
	}

	.tab-button.selected {
		@apply border-b-2 border-white;
	}

	input,
	textarea {
		@apply text-black;
	}

	.invalid input,
	.invalid textarea {
		@apply border-red-500 border-dashed border-2;
	}
</style>
