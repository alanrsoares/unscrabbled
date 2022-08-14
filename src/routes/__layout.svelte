<script>
	import AppBar from '~/ui/AppBar.svelte';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	import '~/app.css';

	const queryClient = new QueryClient();
	const year = new Date().getFullYear();
</script>

<QueryClientProvider client={queryClient}>
	<div class="h-screen flex flex-col gap-12">
		<AppBar />
		<div class="clamp p-4 flex flex-col justify-center flex-1">
			<slot />
		</div>
		<footer class="p-8">
			<div class="clamp mx-auto grid place-items-center">&copy; {year} // unwordled</div>
		</footer>
	</div>
</QueryClientProvider>
