import ky from "ky";
import invariant from "tiny-invariant";

import { withDebugger } from "./misc";
import { Maybe } from "./monads";

const client = ky.extend({
  cache: "force-cache",
});

export type Meaning = {
  id: string;
  def: string;
  example: string;
  speech_part: string;
};

export type Definition = {
  word: string;
  wordset_id: string;
  meanings: Meaning[];
};

export type DictionaryEntries = Record<string, Definition>;
export class ArgumentMissingException extends Error {
  constructor(argumentName: string) {
    super(`Argument missing: '${argumentName}'`);
  }
}

export class DefinitionNotFoundException extends Error {
  constructor(word: string) {
    super(`Definition not found for: '${word}'`);
  }
}

/**
 * Get the dictionary definition for a word.
 */
export const getWordDefinition = withDebugger(
  {
    groupLabel: "getWordDefinition",
  },
  async (word: string) => {
    try {
      if (!word) {
        throw new ArgumentMissingException("word");
      }

      const [initial] = [...word];

      const indexed = await client
        .get(`/db/dictionary/${initial.toLowerCase()}.json`)
        .json<DictionaryEntries>();

      if (word in indexed) {
        return indexed[word];
      }

      throw new DefinitionNotFoundException(word);
    } catch (error) {
      if (
        error instanceof ArgumentMissingException ||
        error instanceof DefinitionNotFoundException
      ) {
        throw error;
      }

      throw new Error("Unknown Error: failed to fetch word definition", {
        cause: error as Error,
      });
    }
  },
);

/**
 * Get a list of words that have a common length.
 */
export const getWordsByLength = withDebugger(
  {
    groupLabel: "geWordsByLength",
  },
  async (length: number, pattern?: RegExp) => {
    try {
      const all = await client
        .get(`/db/words/by-length/${length}.json`)
        .json<string[]>();

      return Maybe.of(pattern).mapOr(all, (pattern) =>
        all.filter((word) => pattern.test(word)),
      );
    } catch (error) {
      return [];
    }
  },
);

/**
 * Get a list of words that start with a given letter.
 */
export const getWordsByLetter = async (letter: string) => {
  invariant(/^[a-z]{1}$/.test(letter), "Invalid letter");

  const dictionaryEntries = await client
    .get(`/db/dictionary/${letter}.json`)
    .json<DictionaryEntries>();

  return Object.entries(dictionaryEntries).map(([word, { meanings }]) => ({
    word,
    meanings,
  }));
};

/**
 * Get a random word from the dictionary.
 */
export const getRandomWord = async (
  length: number,
  seeds = {
    seed1: Math.random(),
    seed2: Math.random(),
    seed3: Math.random(),
  },
) => {
  // random letter from
  const randomLetter = String.fromCharCode(Math.floor(seeds.seed1 * 26) + 97);
  const wordsByLetter = await getWordsByLetter(randomLetter);

  const wordsByLength = wordsByLetter.filter(
    (word) => word.word.length === length && word.meanings.length,
  );

  const { word, meanings } =
    wordsByLength[Math.floor(seeds.seed2 * wordsByLength.length)];

  const meaning = meanings[Math.floor(seeds.seed3 * meanings.length)];
  // only meanings that don't have the word in them
  const validMeanings = meanings.filter(
    (meaning) => !meaning.def.includes(word),
  );

  return {
    word,
    meaning,
    validMeanings,
  };
};

export const getMeta = async (): Promise<{ version: string }> => {
  return fetch("/meta.json")
    .then((res) => res.json())
    .catch(() => ({
      version: "unknown",
    }));
};
