import ky from 'ky';

const client = ky.extend({
	cache: 'force-cache'
});

export function all() {
	return [];
}

export async function geWordsByLength(length: number, pattern?: RegExp) {
	try {
		const all = await client.get(`/db/words/by-length/${length}.json`).json<string[]>();
		if (!pattern) {
			return all;
		}
		return all.filter((x) => pattern.test(x));
	} catch (error) {
		return [];
	}
}
