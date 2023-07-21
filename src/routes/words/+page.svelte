<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { getRandomWord, getWordDefinition } from "~/lib/db";
  import WordInput from "~/ui/WordInput.svelte";

  export let inputWord = "";
  export let patternLength = 5;

  export let maxAttempts = 5;
  export let attempts = 0;

  type Meta = {
    letter: string;
    status: "correct" | "missing" | "misplaced";
  }[];

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

  $: definitionQuery = createQuery(
    ["word-definition", inputWord],
    () => getWordDefinition(inputWord),
    {
      enabled: inputWord.length === patternLength,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );

  let inputMeta: Meta = [];
  let previousAttempts: Meta[] = [];

  $: validateInput = () => {
    if (inputWord === $query.data?.word) {
      alert("You found the word!");
      inputWord = "";
      // update meta
      inputMeta = inputWord.split("").map((letter) => ({
        letter,
        status: "correct",
      }));

      // reset attempts
      attempts = 0;
      // reset previous attempts
      previousAttempts = [];
      // refetch random word
      $query.refetch();
    } else {
      // check if the input word has a definition
      if (!$definitionQuery.isSuccess) {
        alert("This word doesn't exist!");
      } else {
        // increment attempts
        attempts++;
        // check if the user has reached the max attempts
        if (attempts === maxAttempts) {
          alert("You lost!");
          inputWord = "";
          // reset attempts
          attempts = 0;
          // reset previous attempts
          previousAttempts = [];
          // refetch random word
          $query.refetch();
        } else {
          // populate input meta with the correct status for each letter
          inputMeta = inputWord.split("").map((letter, index) => {
            if ($query.data?.word.includes(letter)) {
              if (letter === $query.data?.word[index]) {
                return { letter, status: "correct" };
              } else {
                return { letter, status: "misplaced" };
              }
            } else {
              return { letter, status: "missing" };
            }
          });

          // push the input meta to the list of attempts
          previousAttempts.push(inputMeta);

          alert("Try again!");
        }
      }
    }

    // populate input meta with the correct status for each letter
    inputMeta = inputWord.split("").map((letter, index) => {
      if ($query.data?.word.includes(letter)) {
        if (letter === $query.data?.word[index]) {
          return { letter, status: "correct" };
        } else {
          return { letter, status: "misplaced" };
        }
      } else {
        return { letter, status: "missing" };
      }
    });
  };

  $: if (
    inputWord.length === patternLength &&
    ($definitionQuery.isSuccess || $definitionQuery.isError)
  ) {
    validateInput();
  }
</script>

<section class="flex flex-col gap-4 md:gap-8 flex-1 relative">
  <div class="grid place-items-center">
    <ul>
      {#each previousAttempts as attempt}
        <li>
          <WordInput
            id={`previous-attempt-${attempt}`}
            length={patternLength}
            meta={attempt}
            value={attempt.map((x) => x.letter).join("")}
            isStatic
            readonly
          />
        </li>
      {/each}
    </ul>
    <WordInput
      id="pattern"
      bind:length={patternLength}
      bind:value={inputWord}
      isStatic
      secondaryLabel={`Attempt ${attempts + 1} of ${maxAttempts}`}
    >
      <span slot="label" class="text-center mx-auto">
        Discover the word in {5} attempts
      </span>
    </WordInput>
    <ul class="grid gap-2 p-2 menu">
      {#each $query.data?.validMeanings ?? [] as meaning}
        <li class="text-center font-serif list-item">
          {meaning.def}
        </li>
      {/each}
    </ul>
  </div>
</section>
