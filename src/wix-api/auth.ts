import { OauthData } from "@wix/sdk";
import { env } from "../env";
import { wixClient } from "../lib/wix-client.base";

export async function generateOAuthData(
  wixClient: wixClient,
  originPath?: string
) {
  return wixClient.auth.generateOAuthData(
    env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/wix",
    env.NEXT_PUBLIC_BASE_URL + "/" + (originPath || "")
  );
}

export async function getLoginUrl(wixClient: wixClient, oAuthData: OauthData) {
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
  });

  return authUrl;
}

export async function getLogoutUrl(wixClient: wixClient) {
  const { logoutUrl } = await wixClient.auth.logout(env.NEXT_PUBLIC_BASE_URL);

  return logoutUrl;
}
