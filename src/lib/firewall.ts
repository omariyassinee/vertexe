import { cloudflare } from "@/lib/cloudflare";
import { isValidIP, tryPromise } from "@/lib/utils";
import { env } from "@/env";

/**
 * Applies a firewall rule to the specified IP address using Cloudflare's API.
 * @param ip - The IP address to which the firewall rule will be applied.
 * @param mode - The mode of the firewall rule ("block", "challenge", "js_challenge", "whitelist", "managed_challenge").
 * @param notes - Optional notes for the rule.
 */

export const firewallIP = async (ip: string, mode: Mode, notes?: string) => {
	if (!isValidIP(ip)) return { error: "Invalid IP Address", data: null };

	const { data, error } = await tryPromise(() => createFirewallRule({ ip, notes, mode }));
	if (error) return { error: "Failed to create firewall rule", data: null };

	return { error: null, data };
};

export const blockIP = async (ip: string, notes?: string) => firewallIP(ip, "block", notes);

export const JSChallengeIP = async (ip: string, notes?: string) => {
	return firewallIP(ip, "js_challenge", notes);
};

export const challengeIP = async (ip: string, notes?: string) => {
	return firewallIP(ip, "challenge", notes);
};

export const unblockIP = async (ip: string) => {
	return firewallIP(ip, "whitelist", "Unblocked by BunServer");
};

type Mode = "js_challenge" | "block" | "challenge" | "whitelist" | "managed_challenge";

type CreateFirewallRuleParams = { ip: string; notes?: string; mode: Mode };
const createFirewallRule = async (args: CreateFirewallRuleParams) => {
	const { ip, notes, mode } = args;

	return cloudflare.firewall.accessRules.create({
		mode,
		configuration: { target: "ip", value: ip },
		notes: notes || "Blocked by BunServer",
		zone_id: env.zoneId,
	});
};
