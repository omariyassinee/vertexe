export const isValidIP = (ip: string | null | undefined): boolean => {
	if (!ip) return false;

	const ipv4Regex =
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

	return ipv4Regex.test(ip);
};

export const getRequestIP = (req: Request): string | null => {
	return req.headers.get("CF-Connecting-IP");
};

type PromiseArg<T> = Promise<T> | (() => Promise<T>);
export const tryPromise = async <T>(promise: PromiseArg<T>) => {
	try {
		return { data: typeof promise === "function" ? await promise() : await promise, error: null };
	} catch (error) {
		return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
	}
};
