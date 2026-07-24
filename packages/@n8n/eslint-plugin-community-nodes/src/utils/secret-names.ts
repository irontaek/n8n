/**
 * Name fragments that mark a variable, object property, or credential field as
 * holding a secret. Matched case-insensitively as substrings, so `apiKey`,
 * `clientSecret`, `accessToken`, etc. are all covered.
 */
export const SENSITIVE_NAME_FRAGMENTS = [
	'password',
	'secret',
	'token',
	'cert',
	'passphrase',
	'apikey',
	'secretkey',
	'privatekey',
	'authkey',
];

/**
 * Fragments that override a sensitive match: a name containing one of these
 * refers to a public or identifying value (public key, id, URL) rather than a
 * secret, so it should not be treated as sensitive.
 */
export const NON_SENSITIVE_NAME_FRAGMENTS = ['url', 'pub', 'id'];

/**
 * Does this name look like it holds a secret? A name is sensitive when it
 * contains a sensitive fragment (or a caller-supplied `extra` one) and none of
 * the `exclusions`. Exclusions win, so `publicKey` and `tokenUrl` are not
 * sensitive even though they contain `key`/`token`.
 */
export function isSensitiveName(
	name: string,
	options: { extra?: string[]; exclusions?: string[] } = {},
): boolean {
	const { extra = [], exclusions = NON_SENSITIVE_NAME_FRAGMENTS } = options;
	const lower = name.toLowerCase();

	if (exclusions.some((fragment) => lower.includes(fragment))) {
		return false;
	}

	return [...SENSITIVE_NAME_FRAGMENTS, ...extra].some((fragment) => lower.includes(fragment));
}
