<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { getRandomWord } from "~/lib/db";
  import WordInput from "~/ui/WordInput.svelte";

  export let inputWord = "";
  export let patternLength = 5;

  $: query = createQuery(
    ["random-word", patternLength],
    () => getRandomWord(patternLength),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );
</script>

<section class="flex flex-col gap-4 md:gap-8 flex-1 relative">
  <div class="grid place-items-center">
    <WordInput id="pattern" bind:length={patternLength} bind:value={inputWord}>
      <span slot="label" class="text-center mx-auto">
        Discover the word in {5} attempts
      </span>
    </WordInput>
    {#if $query.data?.meaning}
      <blockquote class="text-center font-serif">
        {$query.data.meaning.def}
      </blockquote>
    {/if}
  </div>
</section>
