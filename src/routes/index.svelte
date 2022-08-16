<script lang="ts">
	import { IsFetching, useQuery } from '@sveltestack/svelte-query';
	import { Card, Spinner } from 'flowbite-svelte';

	import { geWordsByLength } from '~/lib/db';
	import { dedupeString, sanitizePattern, toChars, toRgexp } from '~/lib/misc';
	import DefinitionModal from '~/ui/DefinitionModal.svelte';
	import WordInput from '~/ui/WordInput.svelte';

	let pattern = '';
	let include = '';
	let exclude = '';

	let patternLength = 5;
	let minLength = 2;
	let maxLength = 16;

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
			bind:exclude
			bind:include
		/>
		{#if $wordsQuery.isSuccess && pattern.length}
			<div class="clamp m-auto text-center">
				{$wordsQuery.data.length ? $wordsQuery.data.length : 'No'} results found
			</div>
		{/if}
		{#if $wordsQuery.isFetched}
			<Card
				class="m-auto w-full flex-1 overflow-y-scroll max-h-[60vh] relative !p-2 animate-appear-1 shadow-lg md:shadow-2xl"
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
