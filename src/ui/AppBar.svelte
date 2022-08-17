<script lang="ts">
	import { Modal, Navbar, NavBrand } from 'flowbite-svelte';
	import { InformationCircle } from 'svelte-heros';

	let isModalOpen = false;
</script>

<Navbar class="p-4 border-b border-white/30 !bg-black/95 gradient-border">
	<div class="clamp  flex items-center justify-between gap-4">
		<NavBrand href="/">
			<span class="brand"> Unscrabbled </span>
		</NavBrand>
		<nav class="flex-1" />
		<!-- <button
			class="settings-btn"
			on:click={() => {
				isModalOpen = true;
			}}
		>
			<InformationCircle />
		</button> -->
	</div>
</Navbar>

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
