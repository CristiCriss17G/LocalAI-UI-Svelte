<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;

	let activeTab = 1;

	function setActiveTab(tab: number) {
		activeTab = tab;
	}

	let providerName = '';
	let endpoint = '';
	let openAiModel = false;
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
			payload
		});
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

	function validatePayload() {
		if (payload.length === 0 || payload.length > 1000) {
			isValid = false;
		} else {
			isValid = true;
		}
	}
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
			<p>Hello</p>
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

				<div class="my-4">
					<label for="open-ai-model">Open AI Model:</label>
					<input
						type="checkbox"
						id="open-ai-model"
						bind:checked={openAiModel}
						class="inline-block ml-2"
					/>
				</div>

				<div class="{(isValid && 'valid') || 'invalid'} my-4">
					<label for="payload" class="text-center block">Payload:</label>
					<textarea
						id="payload"
						bind:value={payload}
						on:input={validatePayload}
						class="block w-full h-24 min-h-full"
					/>
				</div>

				<button type="submit" class="mt-5" disabled={!isValid}>Submit</button>
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
