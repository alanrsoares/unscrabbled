<script lang="ts">
	import { clamp, pipe, prop, range } from 'rambda';
	import { createEventDispatcher } from 'svelte/internal';

	import { preventDefault } from '~/lib/misc';

	export let id: string;

	/**
	 * Input label
	 */
	export let label: string;

	export let secondaryLabel = 'Use * to match any letter';

	/**
	 * Whether length can be changed
	 */
	export let isStatic = false;

	/**
	 * Input length
	 */
	export let length = 4;

	export let include: string | undefined;
	export let exclude: string | undefined;

	/**
	 * Input value
	 */
	export let value = '';

	const dispatch = createEventDispatcher();
	const getInput = (i: number) => document.getElementById(`${id}-${i}`) as HTMLInputElement;

	const inc = () => length++;
	const dec = () => length--;

	const VALID_INPUT_REGEX = /[a-z*_]/i;

	$: handleInput = (focusedIndex: number) => <svelte.JSX.FormEventHandler<HTMLInputElement>>((
			e
		) => {
			const input = e.target as HTMLInputElement;

			const nextFocusedIndex = clamp(
				0,
				length - 1,
				Boolean(input.value.length) ? focusedIndex + 1 : focusedIndex - 1
			);

			const word = range(0, length)
				.map(pipe(getInput, prop('value')))
				.join('');

			dispatch('change', word);
			value = word;
			getInput(nextFocusedIndex)?.focus();
		});

	$: handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Backspace' && !VALID_INPUT_REGEX.test(e.key)) {
			e.preventDefault();
		}
	};

	$: letters = Array.from<string>({ length }).fill('');
</script>

<div class="grid gap-1.5 md:gap-2 m-auto w-full md:w-fit">
	{#if label}
		<label for={`${id}-0`} class="inline-block text-lg md:text-2xl text-center">
			{label}
		</label>
	{/if}
	<div
		class="flex items-center justify-between gap-2 bg-white/20 rounded-xl p-2 md:p-4 py-6 left-0 right-0 -top-14"
		class:px-14={isStatic}
	>
		{#if !isStatic}
			<button class="-translate-x-3 md:-translate-x-7" on:click={pipe(preventDefault, dec)}>
				&minus;
			</button>
		{/if}
		{#each letters as letter, idx}
			<input
				id={`${id}-${idx}`}
				type="text"
				class="h-8 w-8 hidden bg-gray-200/80 md:block md:h-16 md:w-16 rounded text-xl md:text-4xl font-display text-black/80 text-center uppercase mx-auto"
				maxlength={1}
				value={letter}
				on:input={handleInput(idx)}
				on:keydown={handleKeyDown}
			/>
		{/each}
		<input
			id={`${id}-0`}
			type="text"
			class="block md:hidden h-16 bg-gray-200/80 rounded-lg text-xl font-display text-black/80 text-center uppercase w-[80%] tracking-widest"
			placeholder={'_'.repeat(length)}
			bind:value
			on:keydown={handleKeyDown}
		/>
		{#if !isStatic}
			<button class="translate-x-3 md:translate-x-7" on:click={pipe(preventDefault, inc)}>
				&plus;
			</button>
		{/if}
	</div>
	<span class="opacity-80 text-center text-sm">{secondaryLabel}</span>
	<div class="md:flex grid gap-2">
		{#if include !== undefined}
			<label class="grid flex-1 gap-2" for="include">
				Must inlcude
				<input class="input" name="include" bind:value={include} />
			</label>
		{/if}
		{#if exclude !== undefined}
			<label class="grid flex-1 gap-2" for="exclude">
				Must exclude
				<input class="input" name="exclude" bind:value={exclude} />
			</label>
		{/if}
	</div>
</div>

<style lang="postcss">
	button {
		@apply block h-8 w-8 scale-150  bg-gray-800/80 rounded-full;
		@apply font-semibold text-xl pb-0.5 select-none origin-center;
		@apply md:bg-white/40;
	}

	.input {
		@apply h-12 rounded bg-gray-200/80 p-2 px-3.5;
		@apply text-black/80 text-center md:text-left font-mono text-lg uppercase tracking-widest font-semibold;
	}
</style>
