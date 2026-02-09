<script lang="ts">
  import { pipe, range } from "rambda";
  import { PlusIcon, MinusIcon } from "~/lib/icons";

  import { preventDefault, sanitizePattern, clamp, prop } from "~/lib/misc";
  import { Maybe } from "~/lib/monads";
  import type { Snippet } from "svelte";

  interface Props {
    id: string;
    label?: string;
    secondaryLabel?: string;
    isStatic?: boolean;
    length?: number;
    value?: string;
    meta?: {
      letter: string;
      status: "correct" | "missing" | "misplaced";
    }[];
    readonly?: boolean;
    onchange?: (val: string) => void;
    labelSlot?: Snippet;
    secondaryLabelSlot?: Snippet;
  }

  let {
    id,
    label = "",
    secondaryLabel = "",
    isStatic = false,
    length = $bindable(4),
    value = $bindable(""),
    meta = [],
    readonly = false,
    onchange,
    labelSlot,
    secondaryLabelSlot,
  }: Props = $props();

  const getInput = (i: number) =>
    document.getElementById(`${id}-${i}`) as HTMLInputElement;

  const inc = () => length++;
  const dec = () => length--;

  const VALID_KEYS = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];

  const VALID_INPUT_REGEX = /[a-z\*_]/i;

  const extractWord = () =>
    sanitizePattern(
      range(0, length)
        .map(pipe(getInput, prop("value")))
        .join(""),
      length
    );

  const applyChange = (word: string) => {
    if (readonly) {
      return;
    }

    onchange?.(word);
    value = word;
  };

  const handleKeyDown = (focusedIndex: number) => (e: KeyboardEvent) => {
    if (readonly) {
      return;
    }
    const { key } = e;

    if (!VALID_KEYS.includes(key) && !VALID_INPUT_REGEX.test(key)) {
      e.preventDefault();
    }

    switch (key) {
      case "ArrowLeft":
        if (focusedIndex > 0) {
          getInput(focusedIndex - 1)?.focus();
        }
        break;
      case "ArrowRight":
        if (focusedIndex < length - 1) {
          getInput(focusedIndex + 1)?.focus();
        }
        break;
      case "Backspace":
        if (focusedIndex === -1) {
          return;
        }

        // clear the focused input value
        Maybe.of(getInput(focusedIndex)).map((input) => {
          const hadValue = Boolean(input.value);
          input.value = "";

          if (!hadValue && focusedIndex > 0) {
            const prevInput = getInput(focusedIndex - 1);
            if (prevInput) {
              prevInput.value = "";
              prevInput.focus();
            }
          }
        });

        applyChange(extractWord());

        // prevent input change behaviour
        e.preventDefault();
        break;
      case "Delete":
        if (focusedIndex === -1) {
          return;
        }
        // clear the focused input value
        Maybe.of(getInput(focusedIndex)).map((input) => {
          input.value = "";
        });

        if (focusedIndex < length - 1) {
          getInput(focusedIndex + 1)?.focus();
        }

        applyChange(extractWord());

        // prevent input change behaviour
        e.preventDefault();

        break;
      default:
        if (focusedIndex === -1 || key.length > 1) {
          return;
        }

        // Alphanumeric keys are handled by oninput to avoid double registration.
        // We just prevent default if they are not valid to filter them out early.
        if (!VALID_INPUT_REGEX.test(key)) {
          e.preventDefault();
        }

        break;
    }
  };

  const handleSingleInput = (val: string) => {
    if (readonly) {
      return;
    }
    const word = sanitizePattern(val, length);

    onchange?.(word);
    value = word;
  };

  let letters = $derived(Array.from<string>({ length }).fill(""));
</script>

<div class="grid gap-1.5 md:gap-2 m-auto w-full md:w-fit px-3 sm:px-0">
  {#if labelSlot}
    {@render labelSlot()}
  {:else}
    <label for={`${id}-0`} class="inline-block text-lg md:text-2xl text-center">
      {label}
    </label>
  {/if}
  <div
    class="flex items-center justify-between gap-2 bg-base-content/20 rounded-xl p-2 md:p-4 py-6 left-0 right-0 -top-14"
    class:px-14={isStatic}
  >
    {#if !isStatic}
      <button
        aria-label="decrease word length by 1 character"
        class="-translate-x-5 md:-translate-x-7"
        onclick={pipe(preventDefault, dec)}
      >
        <MinusIcon class="h-4 w-4" />
      </button>
    {/if}
    {#each letters as letter, index}
      <input
        id={`${id}-${index}`}
        type="text"
        class="h-8 w-8 hidden bg-base-content md:block md:h-16 md:w-16 rounded text-xl md:text-4xl font-display text-base-300 text-center uppercase mx-auto"
        maxlength={1}
        value={meta ? meta[index]?.letter ?? "" : letter ? letter : ""}
        class:bg-success={meta[index]?.status === "correct"}
        class:bg-error={meta[index]?.status === "missing"}
        class:bg-warning={meta[index]?.status === "misplaced"}
        onfocus={(e) => e.currentTarget.select()}
        oninput={({ target }) => {
          const input = target as HTMLInputElement;
          const val = sanitizePattern(input.value, 1);
          input.value = val;

          const word = extractWord();
          applyChange(word);

          if (val) {
            const nextFocusedIndex = clamp(
              { min: 0, max: length - 1 },
              index + 1
            );
            getInput(nextFocusedIndex)?.focus();
          }
        }}
        onkeydown={handleKeyDown(index)}
        aria-label={`pattern input ${index + 1}`}
        {readonly}
      />
    {/each}
    <input
      id={`-${id}-1`}
      type="text"
      class="block md:hidden h-16 bg-gray-200/80 rounded-lg text-xl font-display text-black/80 text-center uppercase w-[80%] tracking-widest"
      placeholder={"_".repeat(length)}
      maxlength={length}
      onkeydown={handleKeyDown(-1)}
      bind:value
      oninput={(e) => handleSingleInput(e.currentTarget.value)}
      {readonly}
    />
    {#if !isStatic}
      <button
        aria-label="increase word length by 1 character"
        class="translate-x-5 md:translate-x-7"
        onclick={pipe(preventDefault, inc)}
      >
        <PlusIcon class="h-4 w-4" />
      </button>
    {/if}
  </div>
  {#if secondaryLabelSlot}
    {@render secondaryLabelSlot()}
  {:else}
    <span class="opacity-80 text-center text-sm">{secondaryLabel}</span>
  {/if}
</div>

<style lang="postcss">
  button {
    @apply block h-6 w-6 scale-[1.75] md:scale-[2] bg-gray-500/95 rounded-full;
    @apply font-semibold text-xl select-none origin-center;
    @apply grid place-items-center;
  }
</style>