<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Modal, Spinner } from 'flowbite-svelte';
	import { groupBy, prop } from 'rambda';

	import { getWordDefinition } from '~/lib/db';

	export let selectedWord = '';

	$: definitionQuery = useQuery(
		['word-definitions', selectedWord],
		() => getWordDefinition(String(selectedWord)),
		{
			enabled: Boolean(selectedWord)
		}
	);

	$: meanings = $definitionQuery?.data?.meanings ?? [];
	$: groupedBySpeechPart = groupBy(prop('speech_part'), meanings);
</script>

<Modal title={selectedWord.toUpperCase()} open={selectedWord.length > 0} placement="center">
	<section class="grid gap-4">
		{#if $definitionQuery.isError}
			<div>failed {JSON.stringify($definitionQuery.error)}</div>
		{:else if $definitionQuery.isLoading}
			<div class="p-2 flex gap-2 items-center justify-center">
				<Spinner size="6" color="purple" />
			</div>
		{:else if $definitionQuery.isSuccess}
			<span class="font-semibold text-lg text-white/60">
				Meanings ({meanings.length})
			</span>
			<ul aria-label={`${meanings.length} meanings for "${selectedWord}"`} class="grid gap-3">
				{#each Object.entries(groupedBySpeechPart) as [speech_part, meanings]}
					<li class="list-item gap-2">
						<span>
							<i class="font-serif italic text-gray-400/80">{speech_part}</i>
						</span>
						<ul class="list-decimal list-outside ml-3 grid gap-2">
							{#each meanings as meaning}
								<li class="gap-1 list-item">
									{meaning.def}
									{#if meaning.example}
										<div>
											<span class="text-gray-400/80">Example</span>
											<blockquote class="font-serif italic">
												&mdash; "{meaning.example}"
											</blockquote>
										</div>
									{/if}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</Modal>
