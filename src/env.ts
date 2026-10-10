const rawEnv = {
	port: process.env.PORT,
	apiToken: process.env.CLOUDFLARE_API_TOKEN,
	zoneId: process.env.CLOUDFLARE_ZONE_ID,
	accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
	isDevelopment: process.env.NODE_ENV === 'development',
};

if (!rawEnv.apiToken || !rawEnv.zoneId || !rawEnv.accountId || !rawEnv.port || isNaN(Number(rawEnv.port))) {
	throw new Error('Missing required environment variables');
}

export const env = {
	apiToken: rawEnv.apiToken,
	zoneId: rawEnv.zoneId,
	accountId: rawEnv.accountId,
	port: Number(rawEnv.port),
	isDevelopment: rawEnv.isDevelopment,
};
