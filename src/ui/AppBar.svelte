<script>
	import { InformationCircle } from 'svelte-heros';
	import Modal from './Modal.svelte';

	let isModalOpen = false;
</script>

<header class="sticky top-0 left-0 right-0 bg-black md:bg-black/30 border-white/30">
	<div class="p-4 border-b gradient-border">
		<nav class="clamp  flex items-center justify-between gap-4">
			<a href="/" class="w-full text-center md:text-left">
				<span class="brand">Unscrabbled</span>
			</a>
			<button
				class="settings-btn"
				on:click={() => {
					isModalOpen = true;
				}}
			>
				<InformationCircle />
			</button>
		</nav>
	</div>
</header>
<Modal bind:open={isModalOpen} title="About" id="info-modal">
	<div>hello</div>
</Modal>

<!-- <Modal bind:open={isModalOpen} placement="center">info</Modal> -->
<style lang="postcss">
	.brand {
		@apply self-center whitespace-nowrap text-xl font-display leading-snug font-semibold;
		@apply text-white uppercase;
	}

	.settings-btn {
		@apply h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full;
		@apply grid place-items-center hover:opacity-70 transition-opacity;
	}
</style>
