<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Button, Card, Spinner } from 'flowbite-svelte';

	import { geWordsByLength } from '~/lib/db';
	import { dedupeString, sanitizePattern, toChars, toRgexp } from '~/lib/misc';
	import DefinitionModal from '~/ui/DefinitionModal.svelte';
	import WordInput from '~/ui/WordInput.svelte';

	// state
	let pattern = '';
	let include = '';
	let exclude = '';

	let patternLength = 5;
	let minLength = 2;
	let maxLength = 16;
	let showAdvancedFilters = false;

	let selectedWord: string | undefined;

	// guard min/max length bounds
	$: if (patternLength < minLength) {
		patternLength = minLength;
	} else if (patternLength > maxLength) {
		patternLength = maxLength;
	}

	// dedupe include/exclude
	$: if (include.length) {
		include = dedupeString(include);
	}
	$: if (exclude.length) {
		exclude = dedupeString(exclude);
	}

	$: patternRegex = toRgexp(sanitizePattern(pattern, patternLength));

	$: wordsQuery = useQuery(
		['words-by-length', patternLength, pattern, include, exclude],
		async () => {
			let result = await geWordsByLength(patternLength, patternRegex);

			if (include) {
				result = result.filter((x) => toChars(include).every((y) => x.includes(y)));
			}

			if (exclude) {
				result = result.filter((x) => !toChars(exclude).some((y) => x.includes(y)));
			}

			return result;
		},
		{
			enabled: pattern.length === patternLength
		}
	);
</script>

<template>
	<section class="flex flex-col gap-8 flex-1 relative">
		<WordInput
			id="pattern"
			label={`Enter pattern with ${patternLength} letters`}
			secondaryLabel="use * to match any"
			bind:length={patternLength}
			bind:value={pattern}
		/>
		{#if $wordsQuery.isSuccess && pattern.length}
			<div class="max-w-md mx-auto w-full flex items-center justify-between">
				<div class="text-lg font-mono">
					<span class="text-orange-400"
						>{$wordsQuery.data.length ? $wordsQuery.data.length : 'No'}</span
					> wordss
				</div>
				<Button
					size="xs"
					outline
					class="h-min transition-colors"
					aria-label="hide advanced filters"
					on:click={() => {
						showAdvancedFilters = !showAdvancedFilters;
					}}
				>
					{#if showAdvancedFilters}
						&minus;
					{:else}
						&plus;
					{/if}
					filters
				</Button>
			</div>
			{#if showAdvancedFilters}
				<div class="grid gap-8 animate-appear-2 max-w-md mx-auto w-full">
					{#if include !== undefined}
						<div class="grid">
							<label class="opacity-70" for="include"> Must inlcude </label>
							<input
								class="input flex-1 focus:border-b-purple-500 text-purple-500"
								id="include"
								bind:value={include}
							/>
						</div>
					{/if}
					{#if exclude !== undefined}
						<div class="grid">
							<label class="opacity-70" for="exclude"> Must exclude </label>
							<input
								class="input flex-1 focus:border-b-pink-500 text-pink-500"
								id="exclude"
								bind:value={exclude}
							/>
						</div>
					{/if}
				</div>
			{/if}
		{/if}
		{#if $wordsQuery.isFetched}
			<Card
				class="m-auto w-full flex-1 overflow-y-scroll max-h-[50vh] relative !p-2 animate-appear-1 shadow-lg md:shadow-2xl"
			>
				{#if $wordsQuery.isError}
					<div>failed {JSON.stringify($wordsQuery.error)}</div>
				{:else if $wordsQuery.isLoading}
					<div class="p-2 flex gap-2 items-center justify-center absolute top-2 right-0">
						<Spinner size="6" color="purple" />
					</div>
				{:else if $wordsQuery.isSuccess}
					<ul class="grid gap-1">
						{#each $wordsQuery.data as word}
							<li
								role="button"
								class="rounded p-2 px-3 bg-white/20"
								on:click={() => {
									selectedWord = word;
								}}
							>
								{word}
							</li>
						{/each}
					</ul>
				{/if}
			</Card>
		{/if}
	</section>
	<DefinitionModal bind:selectedWord />
</template>

<style lang="postcss">
	.input {
		@apply transition-colors;
		@apply h-12 bg-transparent border-b-2 outline-none;
		@apply text-center md:text-left font-mono text-lg uppercase tracking-widest font-semibold;
	}
</style>
