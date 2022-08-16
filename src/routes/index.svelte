<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Card, Modal, Spinner } from 'flowbite-svelte';

	import { getWordDefinition, geWordsByLength } from '~/lib/db';
	import { dedupeString, toChars, toRgexp } from '~/lib/misc';
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

	// guard include/exclude
	$: if (include.length) {
		include = dedupeString(include);
	}
	$: if (exclude.length) {
		exclude = dedupeString(exclude);
	}

	$: patternRegex = toRgexp(pattern.toLowerCase().slice(0, patternLength).replaceAll(/\s/gi, '*'));

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

	$: definitionQuery = useQuery(
		['word-definitions', selectedWord],
		() => getWordDefinition(String(selectedWord)),
		{
			enabled: Boolean(selectedWord)
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
		<Card class="m-auto w-full flex-1 overflow-y-scroll max-h-[60vh] relative !p-2">
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
	</section>
	<Modal
		open={Boolean(selectedWord)}
		on:hide={() => {
			if (selectedWord) {
				selectedWord = undefined;
			}
		}}
	>
		<section class="grid gap-4">
			<header>
				<h1 class="uppercase font-semibold text-xl">{selectedWord}</h1>
			</header>
			<main class="grid gap-2">
				{#if $definitionQuery.isError}
					<div>failed {JSON.stringify($definitionQuery.error)}</div>
				{:else if $definitionQuery.isLoading}
					<div class="p-2 flex gap-2 items-center justify-center">
						<Spinner size="6" color="purple" />
					</div>
				{:else if $definitionQuery.isSuccess}
					<span class="font-semibold text-lg"
						>Meanings ({$definitionQuery.data.meanings.length})</span
					>
					<ul class="grid gap-3 list-decimal list-outside ml-4">
						{#each $definitionQuery.data.meanings as meaning}
							<li class="list-item gap-2">
								<blockquote>
									<i>{meaning.speech_part}</i> <span>&middot;</span>
									{meaning.def}
								</blockquote>

								{#if meaning.example}
									<span class="font-semibold text-lg">Exampes:</span>
									<blockquote class="italic">
										"{meaning.example}"
									</blockquote>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</main>
		</section>
	</Modal>
</template>
