import { cache } from "react";
import { wixClient } from "../lib/wix-client.base";
import { members } from "@wix/members";

export const getLoggedInMember = cache(
  async (wixClient: wixClient): Promise<members.Member | null> => {
    if (!wixClient.auth.loggedIn()) {
      return null;
    }

    const memberData = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    return memberData.member || null;
  }
);
