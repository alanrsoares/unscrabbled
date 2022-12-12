#!/usr/bin/env zx

import fs from "fs/promises";
import got from "got";
import path from "path";
import { range, uniq } from "rambda/immutable";
import { spinner } from "zx/experimental";

const DICTIONARY_API_ENDPOINT =
  "https://raw.githubusercontent.com/wordset/wordset-dictionary/master/data";

const LETTERS = new Set("abcdefghijklmnopqrstuvwxyz".split(""));

const client = got.extend({
  prefixUrl: DICTIONARY_API_ENDPOINT,
  cache: true,
});

const MIN_LENGTH = 2;

/**
 * Returns a dictionary of words starting with the given letter.
 *
 * @param {string} letter
 * @returns {Promise<Record<string, {
 * 	word: string;
 * 	wordset_id: string;
 * 	meanings: {
 * 		id: string;
 * 		def: string;
 * 		example: string;
 * 		speech_part: string;
 * 	}[];
 * }>>}
 */
function getDictionaryByLetter(letter = "") {
  if (!/^[a-z]$/.test(letter)) {
    throw new Error("invalid argument");
  }

  const url = `${letter}.json`;

  return client.get(url).json();
}

const BY_LETTER_INDEX_PATH = path.resolve("./static/db/words/index.json");
const BY_LENGTH_INDEX_PATH = path.resolve("./static/db/words/by-length");

async function readFileOrDefault(filePath = "", defaultContent = "") {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    return defaultContent;
  }
}

/**
 *
 * @param {number} length
 * @param {string[]} words
 * @returns
 */
async function syncByLength(length = 0, words = []) {
  const filtered = words.filter((x) => x.length === length);

  if (!filtered.length) return;

  const filePath = `${BY_LENGTH_INDEX_PATH}/${length}.json`;
  const wordsIndex = await readFileOrDefault(filePath, "[]");
  const currentWordsIndex = JSON.parse(wordsIndex || "[]");

  const encoded = JSON.stringify(
    [...uniq([...currentWordsIndex, ...filtered])],
    null,
    2
  );

  await fs.writeFile(filePath, encoded);
}

async function syncByLetter(letter = "") {
  const dictionary = await getDictionaryByLetter(letter);

  const words = Object.keys(dictionary);

  const filtered = words.filter((x) => !/\s+/.test(x));

  const encoded = JSON.stringify(dictionary, null, 2);

  const currentWordsIndex = await readFileOrDefault(
    BY_LETTER_INDEX_PATH,
    "{}"
  ).then(JSON.parse);

  const nextWordsIndex = JSON.stringify(
    {
      ...currentWordsIndex,
      [letter]: filtered,
    },
    null,
    2
  );

  const dictionaryByLetterPath = path.resolve(
    `./static/db/dictionary/${letter}.json`
  );

  const maxLength = Math.max(...filtered.map((x) => x.length));

  const syncFilteredByLength = async (length = 0) =>
    syncByLength(length, filtered);

  await Promise.all([
    fs.writeFile(dictionaryByLetterPath, encoded),
    fs.writeFile(BY_LETTER_INDEX_PATH, nextWordsIndex),
    ...range(MIN_LENGTH, maxLength + 1).map(syncFilteredByLength),
  ]);
}

async function syncAll() {
  for (const letter of LETTERS) {
    await spinner(`Syncing letter: ${letter}`, () => syncByLetter(letter));
  }
}

async function main() {
  syncAll();
}

await main();
