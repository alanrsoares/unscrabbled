<script>
	import AppBar from '~/ui/AppBar.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	import '~/app.css';
	import { APP_NAME } from '~/config';
	import { useMobileDetect } from '~/lib/hooks';
	import { onMount } from 'svelte/internal';

	const { isMobile } = useMobileDetect();

	const queryClient = new QueryClient();
	const year = new Date().getFullYear();

	onMount(() => {
		if (isMobile()) {
			// prevent backbutton closing the mmobile window
			window.history.forward();
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<div class="shell">
		<AppBar />
		<div class="clamp p-4 flex flex-col justify-center flex-1">
			<slot />
		</div>
		<footer class="p-8">
			<div class="clamp mx-auto grid place-items-center">
				&copy; {year} // {APP_NAME}
			</div>
		</footer>
	</div>
</QueryClientProvider>

<style lang="postcss">
	.shell {
		@apply h-screen flex flex-col gap-4 sm:gap-8 md:gap-12 overflow-x-hidden;
		@apply bg-gradient-to-b from-black/80 to-gray-900;
	}
</style>
