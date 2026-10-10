import { Cloudflare } from "cloudflare";
import { env } from "@/env";

export const cloudflare = new Cloudflare({ apiToken: env.apiToken });
