<script lang="ts">
  import { browser } from "$app/environment";
  import { createQuery } from "@tanstack/svelte-query";
  import {
    EyeIcon,
    InfoIcon,
    MinusIcon,
    PlusIcon,
    SearchIcon,
  } from "~/lib/icons";
  import { getMeta } from "~/lib/db";
  import Modal from "./Modal.svelte";
  import Typewriter from "./Typewriter.svelte";

  let metaQuery = createQuery(() => ({
    queryKey: ["meta"],
    queryFn: getMeta,
    enabled: browser,
  }));

  let isModalOpen = $state(false);
</script>

<header
  class="sticky top-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-10 border-white/30"
>
  <div class="p-4 border-b gradient-border">
    <nav class="clamp flex items-center justify-between gap-4">
      <a href="/" class="w-full text-center md:text-left">
        <span class="brand">
          <Typewriter
            strings={[
              "Unscrwhat?",
              "Unscrambld",
              "Unscramble",
              "Unscrambled",
              "Unscrabbled",
            ]}
            persist={true}
          />
        </span>
      </a>
      <button
        class="btn btn-circle h-10 aspect-square grid place-items-center bg-gradient-to-br from-pink-500 to-purple-800"
        onclick={() => {
          isModalOpen = true;
        }}
      >
        <InfoIcon class="h-7 w-7" />
      </button>
    </nav>
  </div>
</header>
<Modal
  bind:open={isModalOpen}
  onclose={() => {
    setTimeout(() => {
      isModalOpen = false;
    }, 150);
  }}
  title="About Unscrabbled"
  subtitle={`v${metaQuery.data?.version}`}
>
  <div class="space-y-6">
    <p class="text-base text-gray-300 leading-relaxed">
      <span class="text-white font-semibold">Unscrabbled</span> is a powerful dictionary
      search engine designed to help you solve even the most complex word puzzles.
    </p>

    <div>
      <h4
        class="font-bold text-gray-400 mb-4 text-xs uppercase tracking-widest"
      >
        Key Features
      </h4>
      <ul class="space-y-4">
        <li class="flex items-center gap-3">
          <div class="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
            <SearchIcon class="w-5 h-5" />
          </div>
          <span class="text-gray-200 leading-snug"
            >Match words with complex patterns</span
          >
        </li>
        <li class="flex items-center gap-3">
          <div class="p-2 bg-green-500/20 rounded-lg text-green-400 shrink-0">
            <PlusIcon class="w-5 h-5" />
          </div>
          <span class="text-gray-200 leading-snug"
            >Filter by including letters</span
          >
        </li>
        <li class="flex items-center gap-3">
          <div class="p-2 bg-red-500/20 rounded-lg text-red-400 shrink-0">
            <MinusIcon class="w-5 h-5" />
          </div>
          <span class="text-gray-200 leading-snug"
            >Filter by excluding letters</span
          >
        </li>
        <li class="flex items-center gap-3">
          <div class="p-2 bg-purple-500/20 rounded-lg text-purple-400 shrink-0">
            <EyeIcon class="w-5 h-5" />
          </div>
          <span class="text-gray-200 leading-snug"
            >View detailed definitions</span
          >
        </li>
      </ul>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .brand {
    @apply self-center whitespace-nowrap text-xl font-display leading-snug font-semibold;
    @apply text-white uppercase;
  }
</style>
