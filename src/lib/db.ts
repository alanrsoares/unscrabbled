import ky from "ky";
import { withDebugger } from "./misc";
import { Maybe } from "./monads";

const client = ky.extend({
  cache: "force-cache",
});

export function all() {
  return [];
}

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
 *
 * @param {string} word
 * @returns {Promise<Definition>}
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
        .json<Record<string, Definition>>();

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
  }
);

/**
 * Get a list of words that have a common length.
 *
 * @param {number} length - The length of the words to return.
 * @param {RegExp} [pattern] - A regular expression to filter the words by.
 * @returns {Promise<string[]>}
 *
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
        all.filter((word) => pattern.test(word))
      );
    } catch (error) {
      return [];
    }
  }
);

export const getMeta = async () => {
  return client.get("/meta.json").json<{ version: string }>();
};
