<script>
  import { createQuery } from "@tanstack/svelte-query";
  import { InfoIcon } from "lucide-svelte";
  import { getMeta } from "~/lib/db";
  import Modal from "./Modal.svelte";
  import Typewriter from "./Typewriter.svelte";

  let metaQuery = createQuery(["meta"], getMeta);

  let isModalOpen = false;
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
        class="settings-btn"
        on:click={() => {
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
  on:close={() => {
    setTimeout(() => {
      isModalOpen = false;
    }, 150);
  }}
  title="About Unscrabbled"
  subtitle={`v${$metaQuery.data?.version}`}
  id="info-modal"
>
  <div class="prose">
    <p>
      Unscrabbled is a dictionary search engine that will help you solve complex
      word puzzles.

      <br />

      Here are some of the features:
    </p>

    <ol>
      <li>
        Find words with patterns: <br />
      </li>
      <li>Filter out words that includes a set of letters</li>
      <li>Filter out words that DOES NOT include a set of letters</li>
      <li>View the definition for a word</li>
    </ol>
  </div>
</Modal>

<!-- <Modal bind:open={isModalOpen} placement="center">info</Modal> -->
<style lang="postcss">
  .brand {
    @apply self-center whitespace-nowrap text-xl font-display leading-snug font-semibold;
    @apply text-white uppercase;
  }

  .settings-btn {
    @apply btn rounded-full h-10 aspect-square bg-gradient-to-br from-pink-500 to-purple-800 grid place-items-center;
  }
</style>
