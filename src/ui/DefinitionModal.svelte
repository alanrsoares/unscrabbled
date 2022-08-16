<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Modal, Spinner } from 'flowbite-svelte';

	import { getWordDefinition } from '~/lib/db';

	export let selectedWord = '';

	$: definitionQuery = useQuery(
		['word-definitions', selectedWord],
		() => getWordDefinition(String(selectedWord)),
		{
			enabled: Boolean(selectedWord)
		}
	);
</script>

<Modal
	open={selectedWord.length > 0}
	on:hide={() => {
		if (selectedWord) {
			selectedWord = '';
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
				<span class="font-semibold text-lg">Meanings ({$definitionQuery.data.meanings.length})</span
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
