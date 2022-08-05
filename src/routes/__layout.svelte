<script>
	import AppBar from '../ui/AppBar.svelte';

	import '../app.css';

	let year = new Date().getFullYear();
</script>

<div class="min-h-screen flex flex-col gap-4">
	<AppBar />
	<div class="clamp p-4 grid place-items-center flex-1">
		<slot />
	</div>
	<footer class="p-4">
		<div class="clamp mx-auto grid place-items-center">&copy; {year} // unwordled</div>
	</footer>
</div>
