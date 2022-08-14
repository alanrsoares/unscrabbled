<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Button, Card } from 'flowbite-svelte';

	import { geWordsByLength } from '~/lib/db';
	import { toRgexp } from '~/lib/misc';
	import WordInput from '~/ui/WordInput.svelte';

	let pattern = '';
	let patternLength = 5;

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		//
		console.log({
			submit: e
		});

		e.preventDefault();
		return;
	};

	$: queryResult = useQuery(['words-by-length', patternLength, pattern], () =>
		geWordsByLength(patternLength, toRgexp(pattern))
	);
</script>

<section class="flex flex-col gap-8 flex-1">
	<WordInput id="pattern" label="Pattern" bind:length={patternLength} bind:value={pattern} />
	<Card class="m-auto w-full flex-1 overflow-y-scroll max-h-[60vh]">
		<h1>Search results: {$queryResult.data?.length ?? 0}</h1>
		{#if $queryResult.error}
			<div>failed</div>
		{/if}
		<ul class="grid gap-1">
			{#each $queryResult.data ?? [] as word}
				<li class="rounded p-2 px-3 bg-white/20">{word}</li>
			{/each}
		</ul>
	</Card>
</section>
