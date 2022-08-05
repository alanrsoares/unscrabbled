<script>
	import AppBar from '../ui/AppBar.svelte';

	import '../app.css';

	let year = new Date().getFullYear();
</script>

<div class="h-screen flex flex-col gap-16">
	<AppBar />
	<div
		style="--gradient-border-radius=16px"
		class="clamp p-4 grid place-items-center flex-1 ring-[6px] ring-black/40 rounded-sm gradient-border"
	>
		<slot />
	</div>
	<footer class="p-4">
		<div class="clamp mx-auto grid place-items-center">&copy; {year} // unwordled</div>
	</footer>
</div>
