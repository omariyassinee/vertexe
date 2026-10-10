const rawEnv = {
	port: process.env.PORT,
	apiToken: process.env.CLOUDFLARE_API_TOKEN,
	zoneId: process.env.CLOUDFLARE_ZONE_ID,
	accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
};

export const env = {
	apiToken: rawEnv.apiToken,
	zoneId: rawEnv.zoneId,
	accountId: rawEnv.accountId,
	port: Number(rawEnv.port),
};
