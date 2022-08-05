<script lang="ts">
	import WordInput from '../ui/WordInput.svelte';

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		//
		console.log({ submit: e });
		return;
	};
</script>

<form on:submit={handleSubmit}>
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
		isStatic
		length={5}
		on:change={(e) => {
			console.log({ pattern2: String(e.detail) });
		}}
	/>
</form>
