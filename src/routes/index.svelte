<script>
	import WordInput from '../ui/WordInput.svelte';
</script>

<form>
	<WordInput
		id="pattern"
		label="pattern"
		length={5}
		on:change={(e) => {
			console.log({ pattern: String(e.detail) });
		}}
	/>
	<WordInput
		id="pattern2"
		label="pattern2"
		length={5}
		on:change={(e) => {
			console.log({ pattern2: String(e.detail) });
		}}
	/>
	<WordInput
		id="pattern3"
		label="pattern3"
		length={5}
		on:change={(e) => {
			console.log({ pattern3: String(e.detail) });
		}}
	/>
</form>
