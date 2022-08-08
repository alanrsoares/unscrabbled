import got from 'got';
import path from 'path';
import fs from 'fs/promises';
import { range } from 'rambda';
import { uniq } from 'rambda';

const BASE_URL = 'https://raw.githubusercontent.com/wordset/wordset-dictionary/master/data';

const LETTERS = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));

const client = got.extend({
	prefixUrl: BASE_URL,
	cache: true
});

function getDictionaryByLetter(letter = '') {
	if (!/^\w$/.test(letter)) {
		throw new Error('invalid argument');
	}

	const url = `${letter}.json`;

	return client.get(url).json();
}

const BY_LETTER_INDEX_PATH = path.resolve(`./static/db/words/index.json`);
const BY_LENGTH_INDEX_PATH = path.resolve(`./static/db/words/by-length.json`);

async function syncByLength(length = 0, words = []) {
	console.log('syncByLength', { length, words });

	const filtered = words.filter((x) => x.length === length);

	if (!filtered.length) return;

	const wordsIndex = await fs.readFile(BY_LENGTH_INDEX_PATH, 'utf-8');
	const currentWordsIndex = JSON.parse(wordsIndex || '{}');

	const encoded = JSON.stringify(
		{
			...currentWordsIndex,
			[length]: uniq([...(currentWordsIndex[length] ?? []), ...words])
		},
		null,
		2
	);

	await fs.writeFile(BY_LETTER_INDEX_PATH, encoded);
}

async function syncByLetter(letter = '') {
	console.log('syncByLetter', { letter });

	const dictionary = await getDictionaryByLetter(letter);
	const words = Object.keys(dictionary);

	const encoded = JSON.stringify(dictionary, null, 2);

	const wordsIndex = await fs.readFile(BY_LETTER_INDEX_PATH, 'utf-8');
	const currentWordsIndex = JSON.parse(wordsIndex || '{}');
	const nextWordsIndex = JSON.stringify(
		{
			...currentWordsIndex,
			[letter]: words
		},
		null,
		2
	);

	const fullMetaFilePath = path.resolve(`./static/db/full/${letter}.json`);

	await Promise.all([
		fs.writeFile(fullMetaFilePath, encoded),
		fs.writeFile(BY_LETTER_INDEX_PATH, nextWordsIndex),
		...range(2, 10).map((i) => {
			// syncByLength(i, words);
		})
	]);
}

async function syncAll() {
	for (let letter of LETTERS) {
		await syncByLetter(letter);
	}
}

async function main() {
	syncAll();
}

await main();
