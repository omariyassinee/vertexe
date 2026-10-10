import { getRequestIP } from "@/lib/utils";

import { env } from "@/env";

const server = Bun.serve({
	port: env.port,

	async fetch(request) {
		const ip = getRequestIP(request);
		if (!ip) return new Response("Invalid Request", { status: 400 });

		return new Response(`Hello from Bun! Your IP is ${ip}`);
	},
});

console.log(`Server running on http://localhost:${server.port}`);
