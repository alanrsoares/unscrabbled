<script lang="ts">
	import { clamp, pipe, prop, range } from 'rambda';
	import { createEventDispatcher } from 'svelte/internal';

	import { preventDefault } from '~/lib/misc';

	export let id: string;

	/**
	 * Input label
	 */
	export let label: string;

	/**
	 * Whether length can be changed
	 */
	export let isStatic = false;

	/**
	 * Input length
	 */
	export let length = 4;

	/**
	 * Input value
	 */
	export let value = '';

	const dispatch = createEventDispatcher();
	const getInput = (i: number) => document.getElementById(`${id}-${i}`) as HTMLInputElement;

	const inc = () => length++;
	const dec = () => length--;

	const VALID_INPUT_REGEX = /[a-z*]/i;

	$: onInput = (focusedIndex: number) => <svelte.JSX.FormEventHandler<HTMLInputElement>>((e) => {
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

	$: letters = Array.from<string>({ length }).fill('');
</script>

<div class="grid gap-2 w-fit m-auto">
	{#if label}
		<label for={`${id}-0`} class="inline-block text-2xl">
			{label}
		</label>
	{/if}
	<div class="flex items-center gap-2 bg-white/20 rounded-xl p-4 py-6" class:px-14={isStatic}>
		{#if !isStatic}
			<button on:click={pipe(preventDefault, dec)}>&minus;</button>
		{/if}
		{#each letters as letter, idx}
			<input
				id={`${id}-${idx}`}
				type="text"
				class="h-16 w-16 rounded text-[2rem] font-display text-black/90 text-center uppercase mx-auto"
				maxlength={1}
				value={letter}
				on:input={onInput(idx)}
				on:keydown={(e) => {
					if (e.key !== 'Backspace' && !VALID_INPUT_REGEX.test(e.key)) {
						console.log(e.key, 'ignored');
						e.preventDefault();
					}
				}}
			/>
		{/each}
		{#if !isStatic}
			<button on:click={pipe(preventDefault, inc)}>&plus;</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	button {
		@apply h-8 w-8 bg-white/40 rounded-full text-xl pb-0.5 select-none;
	}
</style>
