<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { EyeIcon, MinusIcon, PlusIcon, SearchIcon } from "lucide-svelte";

  import { getWordsByLength } from "~/lib/db";
  import { dedupeString, sanitizePattern, toChars, toRgexp } from "~/lib/misc";
  import DefinitionModal from "~/ui/DefinitionModal.svelte";
  import Spinner from "~/ui/Spinner.svelte";
  import WordInput from "~/ui/WordInput.svelte";

  // state
  let pattern = "";
  let include = "";
  let exclude = "";

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

  $: wordsQuery = createQuery(
    ["words-by-length", patternLength, pattern, include, exclude],
    async () => {
      let result = await getWordsByLength(patternLength, patternRegex);

      if (include) {
        result = result.filter((x) =>
          toChars(include).every((y) => x.includes(y))
        );
      }

      if (exclude) {
        result = result.filter(
          (x) => !toChars(exclude).some((y) => x.includes(y))
        );
      }

      return result;
    },
    {
      enabled: pattern.length === patternLength,
    }
  );

  const handleSelectWord =
    (word: string) => (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && !["Enter", " "].includes(e.key)) {
        return;
      }

      selectedWord = word;
    };
</script>

<section class="flex flex-col gap-4 md:gap-8 flex-1 relative">
  <WordInput id="pattern" bind:length={patternLength} bind:value={pattern}>
    <label
      for="pattern-0"
      slot="label"
      class="inline-block text-lg md:text-2xl text-center"
    >
      Enter word pattern with <span class="border rounded px-2"
        >{patternLength}</span
      > letters
    </label>
    <span slot="secondary-label" class="text-center p-1">
      use <kbd>*</kbd>, <kbd> {"<space>"} </kbd> or <kbd>_</kbd> to match any
    </span>
  </WordInput>

  {#if pattern.length === patternLength}
    <div class="max-w-md mx-auto w-full flex items-center justify-between">
      <div class="text-lg font-mono">
        <span class="text-orange-400">
          {$wordsQuery.data?.length ? $wordsQuery.data.length : "No"}
        </span>
        words
      </div>
      <button
        class="btn btn-primary btn-xs md:btn-sm h-min transition-colors gap-1"
        aria-label="hide advanced filters"
        on:click={() => {
          showAdvancedFilters = !showAdvancedFilters;
        }}
      >
        {#if showAdvancedFilters}
          <MinusIcon size="14" />
        {:else}
          <PlusIcon size="14" />
        {/if}
        filters
      </button>
    </div>
    <div
      class="grid gap-8 animate-appear-2 max-w-md mx-auto w-full"
      class:hidden={!showAdvancedFilters}
    >
      {#if include !== undefined}
        <div class="grid">
          <label class="opacity-70" for="include"> Must include </label>
          <input
            class="filter-input flex-1 focus:border-b-purple-500 text-purple-500"
            id="include"
            value={include}
            on:input={(e) => {
              e.preventDefault();
              include = e.currentTarget.value;
            }}
          />
        </div>
      {/if}
      {#if exclude !== undefined}
        <div class="grid">
          <label class="opacity-70" for="exclude"> Must exclude </label>
          <input
            class="filter-input flex-1 focus:border-b-pink-500 text-pink-500"
            id="exclude"
            value={exclude}
            on:input={(e) => {
              e.preventDefault();
              exclude = e.currentTarget.value;
            }}
          />
        </div>
      {/if}
    </div>
    <article
      class="card -mx-4 md:m-auto bg-gray-900 w-screen md:w-full flex-1 relative shadow-lg md:shadow-xl p-2"
    >
      <div
        class="card-body overflow-y-scroll snap-proximity max-h-[49vh] md:max-h-[60vh] p-4"
      >
        {#if $wordsQuery.isError}
          <div>failed {JSON.stringify($wordsQuery.error)}</div>
        {:else if $wordsQuery.isLoading}
          <div
            class="p-2 flex gap-2 items-center justify-center absolute top-2 right-0"
          >
            <Spinner label="loading dictionary..." />
          </div>
        {:else if $wordsQuery.data?.length}
          <ul class="grid gap-1">
            {#each $wordsQuery.data as word}
              <li class="flex flex-1">
                <button
                  on:click={handleSelectWord(word)}
                  class="rounded flex-1 p-2 px-3 bg-white/20 group flex items-center justify-between uppercase"
                >
                  <span class="text-base font-medium">
                    {word}
                  </span>
                  <span class="pill"> <EyeIcon /> definition </span>
                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <div class="grid absolute inset-0 place-items-center">
            <div class="grid place-items-center gap-2">
              <SearchIcon size="36" />
              <span> No words matching the provided filters. </span>
            </div>
          </div>
        {/if}
      </div>
    </article>
  {/if}
</section>
<DefinitionModal bind:word={selectedWord} />

<style lang="postcss">
  .filter-input {
    @apply transition-colors;
    @apply h-12 bg-transparent border-b-2 outline-none;
    @apply text-center md:text-left font-mono text-lg uppercase tracking-widest font-semibold;
  }

  .pill {
    @apply flex items-center gap-2 opacity-0 group-hover:opacity-100 text-purple-400;
    @apply transition-opacity self-end rounded-md text-xs py-1 px-2 border border-purple-400;
  }

  kbd {
    @apply bg-gray-600 text-white font-mono align-bottom font-semibold leading-tight;
    @apply transition-colors;
    @apply rounded-md px-2 py-1 border border-gray-500;
    @apply hover:bg-gradient-to-br from-pink-500 to-purple-800;
    @apply hover:shadow-md;
  }
</style>
