<script lang="ts">
  import { clamp, pipe, prop, range } from "rambda/immutable";
  import { createEventDispatcher } from "svelte/internal";
  import { PlusIcon, MinusIcon } from "lucide-svelte";

  import { preventDefault, sanitizePattern } from "~/lib/misc";

  export let id: string;

  /**
   * Input label
   */
  export let label = "";

  export let secondaryLabel = "";

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
  export let value = "";

  const dispatch = createEventDispatcher();
  const getInput = (i: number) =>
    document.getElementById(`${id}-${i}`) as HTMLInputElement;

  const inc = () => length++;
  const dec = () => length--;

  const VALID_INPUT_REGEX = /[a-z\*_]/i;

  $: handleInput = (focusedIndex: number) =>
    <svelte.JSX.FormEventHandler<HTMLInputElement>>((e) => {
      const input = e.target as HTMLInputElement;

      const nextFocusedIndex = clamp(
        0,
        length - 1,
        Boolean(input.value.length) ? focusedIndex + 1 : focusedIndex - 1
      );

      const word = sanitizePattern(
        range(0, length)
          .map(pipe(getInput, prop("value")))
          .join(""),
        length
      );

      dispatch("change", word);
      value = word;
      getInput(nextFocusedIndex)?.focus();
    });

  $: handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;

    if (key !== "Backspace" && !VALID_INPUT_REGEX.test(key)) {
      e.preventDefault();
    }
  };

  $: handleSingleInput = (value: string) => {
    const word = sanitizePattern(value, length);

    dispatch("change", word);
    value = word;
  };

  $: letters = Array.from<string>({ length }).fill("");
</script>

<div class="grid gap-1.5 md:gap-2 m-auto w-full md:w-fit">
  <slot name="label">
    <label for={`${id}-0`} class="inline-block text-lg md:text-2xl text-center">
      {label}
    </label>
  </slot>
  <div
    class="flex items-center justify-between gap-2 bg-white/20 rounded-xl p-2 md:p-4 py-6 left-0 right-0 -top-14"
    class:px-14={isStatic}
  >
    {#if !isStatic}
      <button
        aria-label="decrease word length by 1 character"
        class="-translate-x-3 md:-translate-x-8"
        on:click={pipe(preventDefault, dec)}
      >
        <MinusIcon class="h-4 w-4" />
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
        aria-label={`pattern input ${idx + 1}`}
      />
    {/each}
    <input
      id={`-${id}-1`}
      type="text"
      class="block md:hidden h-16 bg-gray-200/80 rounded-lg text-xl font-display text-black/80 text-center uppercase w-[80%] tracking-widest"
      placeholder={"_".repeat(length)}
      maxlength={length}
      on:keydown={handleKeyDown}
      bind:value
      on:input={(e) => handleSingleInput(e.currentTarget.value)}
    />
    {#if !isStatic}
      <button
        aria-label="increase word length by 1 character"
        class="translate-x-3 md:translate-x-8"
        on:click={pipe(preventDefault, inc)}
      >
        <PlusIcon class="h-4 w-4" />
      </button>
    {/if}
  </div>
  <slot name="secondary-label">
    <span class="opacity-80 text-center text-sm">{secondaryLabel}</span>
  </slot>
</div>

<style lang="postcss">
  button {
    @apply block h-6 w-6 scale-[1.75] md:scale-[2] bg-gray-500/95 rounded-full;
    @apply font-semibold text-xl select-none origin-center;
    @apply grid place-items-center;
  }
</style>
