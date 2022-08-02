import got from 'got';
import path from 'path';
import fs from 'fs/promises';

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
const WORDS_INDEX_PATH = path.resolve(`./static/db/words/index.json`);

async function syncByLetter(letter = '') {
	const dictionary = await getDictionaryByLetter(letter);
	const words = Object.keys(dictionary);

	const encoded = JSON.stringify(dictionary, null, 2);

	const fullMetaFile = path.resolve(`./static/db/full/${letter}.json`);

	const wordsIndex = await fs.readFile(WORDS_INDEX_PATH, 'utf-8');
	const currentWordsIndex = JSON.parse(wordsIndex ?? '{}');
	const nextWordsIndex = JSON.stringify(
		{
			...currentWordsIndex,
			[letter]: words
		},
		null,
		2
	);

	await Promise.all([
		fs.writeFile(fullMetaFile, encoded),
		fs.writeFile(WORDS_INDEX_PATH, nextWordsIndex)
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
