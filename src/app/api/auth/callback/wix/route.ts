import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/src/lib/constants";
import { getWixServerClient } from "@/src/lib/wix-client.server";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const error_description = req.nextUrl.searchParams.get("error_description");

  if (error) {
    return new Response(error_description, { status: 400 });
  }

  const cookieStore = await cookies();

  const oAuthCookie = cookieStore.get(WIX_OAUTH_DATA_COOKIE);
  const oAuthData: OauthData = JSON.parse(oAuthCookie?.value || "{}");

  if (!code || !state || !oAuthData) {
    return new Response("Invalid request", { status: 400 });
  }

  const wixClient = getWixServerClient();

  const memberTokens = await wixClient.auth.getMemberTokens(
    code,
    state,
    oAuthData
  );

  await cookieStore.delete(WIX_OAUTH_DATA_COOKIE);
  await cookieStore.set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return new Response("null", {
    status: 302,
    headers: { Location: oAuthData.originalUri || "/" },
  });
}
