import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { getWixClient } from "./wix-client.base";
import { WIX_SESSION_COOKIE } from "./constants";

const tokens: Tokens = JSON.parse(Cookies.get(WIX_SESSION_COOKIE) || "{}");

export const wixBrowserClient = getWixClient(tokens);
