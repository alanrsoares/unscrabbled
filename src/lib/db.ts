import ky from "ky";
import { withDebugger } from "./misc";

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
 * Get a word's definition from the dictionary
 *
 * @param word
 * @returns {Definition}
 */
export async function getWordDefinition(word: string) {
  try {
    if (!word) {
      throw new ArgumentMissingException("word");
    }

    const [initial] = [...word];

    const indexed = await client
      .get(`/db/dictionary/${initial}.json`)
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

    throw new Error("failed to fetch word definition", {
      cause: error as Error,
    });
  }
}

export const getWordsByLength = withDebugger(
  {
    groupLabel: "geWordsByLength",
  },
  async (length: number, pattern?: RegExp) => {
    try {
      const all = await client
        .get(`/db/words/by-length/${length}.json`)
        .json<string[]>();
      if (!pattern) {
        return all;
      }
      return all.filter((x) => pattern.test(x));
    } catch (error) {
      return [];
    }
  }
);
