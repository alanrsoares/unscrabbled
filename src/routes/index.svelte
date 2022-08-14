<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Card, Spinner } from 'flowbite-svelte';

	import { geWordsByLength } from '~/lib/db';
	import { toRgexp } from '~/lib/misc';
	import WordInput from '~/ui/WordInput.svelte';

	let pattern = '';
	let patternLength = 5;

	let minLength = 2;
	let maxLength = 16;

	// guard min/max length bounds
	$: if (patternLength < minLength) {
		patternLength = minLength;
	} else if (patternLength > maxLength) {
		patternLength = maxLength;
	}

	$: patternRegex = toRgexp(pattern.slice(0, patternLength).replaceAll(/\s/gi, '*'));

	$: queryResult = useQuery(['words-by-length', patternLength, pattern], () =>
		geWordsByLength(patternLength, patternRegex)
	);
</script>

<section class="flex flex-col gap-8 flex-1">
	<WordInput
		id="pattern"
		label={`Enter pattern with ${patternLength} letters`}
		secondaryLabel="use * to match any"
		bind:length={patternLength}
		bind:value={pattern}
	/>
	<Card class="m-auto w-full flex-1 overflow-y-scroll max-h-[60vh] relative">
		{#if $queryResult.isError}
			<div>failed {JSON.stringify($queryResult.error)}</div>
		{:else if $queryResult.isLoading}
			<div class="p-2 flex gap-2 items-center justify-center absolute top-2 right-0">
				<Spinner size="6" color="purple" />
			</div>
		{:else if $queryResult.isSuccess}
			<ul class="grid gap-1">
				{#each $queryResult.data ?? [] as word}
					<li class="rounded p-2 px-3 bg-white/20">{word}</li>
				{/each}
			</ul>
		{/if}
	</Card>
</section>
