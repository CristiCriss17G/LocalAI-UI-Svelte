<script lang="ts">
	import Header from './Header.svelte';
	import './global.css';

	// export let data: LayoutData;
</script>

<div class="app">
	<Header />

	<main class="chat-page">
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		max-height: 100vh;
		height: 100vh;
		max-width: 100vw;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 90%;
		/* max-width: 64rem; */
		margin: 0 auto;
		/* box-sizing: border-box; */
	}

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
