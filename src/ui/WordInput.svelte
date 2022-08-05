<script lang="ts">
	import { clamp, pipe, prop, range } from 'rambda';
	import { createEventDispatcher } from 'svelte/internal';

	import { preventDefault } from '~/lib/misc';

	export let id: string;

	export let label: string;

	export let isStatic = false;

	export let length = 4;

	const dispatch = createEventDispatcher();
	const getInput = (i: number) => document.getElementById(`${id}-${i}`) as HTMLInputElement;

	const inc = () => length++;
	const dec = () => length--;

	$: onKeyUp = <svelte.JSX.FormEventHandler<HTMLInputElement>>((e) => {
		const { value, id } = e.target as HTMLInputElement;

		const focusedIndex = Number(id.split('-')[1]);

		const nextFocusedIndex = clamp(
			0,
			length - 1,
			Boolean(value.length) ? focusedIndex + 1 : focusedIndex - 1
		);

		const word = range(0, length)
			.map(pipe(getInput, prop('value')))
			.join('');

		dispatch('change', word);
		getInput(nextFocusedIndex)?.focus();
	});

	$: letters = Array.from<string>({ length }).fill('');
</script>

<template>
	{#if label}
		<label for={`${id}-0`} class="py-2 inline-block">
			{label}
		</label>
	{/if}
	<div class="flex items-center gap-2 bg-white/20 rounded-xl p-4 py-6" class:px-14={isStatic}>
		{#if !isStatic}
			<button on:click={pipe(preventDefault, dec)}>&minus;</button>
		{/if}
		{#each letters as letter, i}
			<input
				id={`${id}-${i}`}
				type="text"
				class="h-12 w-12 rounded text-3xl text-black text-center uppercase mx-auto"
				maxlength={1}
				value={letter}
				on:keyup={onKeyUp}
			/>
		{/each}
		{#if !isStatic}
			<button on:click={pipe(preventDefault, inc)}>&plus;</button>
		{/if}
	</div>
</template>

<style lang="postcss">
	button {
		@apply h-8 w-8 bg-white/40 rounded-full text-xl pb-0.5 select-none;
	}
</style>
