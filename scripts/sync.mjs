import got from 'got';
import path from 'path';
import fs from 'fs/promises';
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
const BY_LENGTH_INDEX_PATH = path.resolve(`./static/db/words/by-length`);

async function readFileOrDefault(filePath = '', defaultContent = '') {
	try {
		return await fs.readFile(filePath, 'utf-8');
	} catch (error) {
		return defaultContent;
	}
}

async function syncByLength(length = 0, words = []) {
	const filtered = words.filter((x) => x.length === length);

	if (!filtered.length) return;

	console.log('syncByLength', { length, words: filtered.length });

	const filePath = `${BY_LENGTH_INDEX_PATH}/${length}.json`;
	const wordsIndex = await readFileOrDefault(filePath, '[]');
	const currentWordsIndex = JSON.parse(wordsIndex || '[]');

	const encoded = JSON.stringify([...uniq([...currentWordsIndex, ...filtered])], null, 2);

	await fs.writeFile(filePath, encoded);
}

async function syncByLetter(letter = '') {
	console.log('syncByLetter', { letter });

	const dictionary = await getDictionaryByLetter(letter);

	const words = Object.keys(dictionary);

	const filtered = words.filter((x) => !/\s+/.test(x));

	if (filtered.length !== words.length) {
		console.log(`${words.length - filtered.length} words filtered`);
	}

	const encoded = JSON.stringify(dictionary, null, 2);

	const wordsIndex = await fs.readFile(BY_LETTER_INDEX_PATH, 'utf-8');

	const currentWordsIndex = JSON.parse(wordsIndex || '{}');
	const nextWordsIndex = JSON.stringify(
		{
			...currentWordsIndex,
			[letter]: filtered
		},
		null,
		2
	);

	const fullMetaFilePath = path.resolve(`./static/db/full/${letter}.json`);

	await Promise.all([
		fs.writeFile(fullMetaFilePath, encoded),
		fs.writeFile(BY_LETTER_INDEX_PATH, nextWordsIndex)
	]);

	const maxLength = Math.max(...filtered.map((x) => x.length));

	for (let i = 2; i <= maxLength; i++) {
		await syncByLength(i, filtered);
	}
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
