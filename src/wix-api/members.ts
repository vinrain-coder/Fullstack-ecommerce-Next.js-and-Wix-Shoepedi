import { cache } from "react";
import { members } from "@wix/members";
import { wixClient } from "@/lib/wix-client.base";

export const getLoggedInMember = cache(
  async (wixClient: wixClient): Promise<members.Member | null> => {
    if (!wixClient.auth.loggedIn()) {
      return null;
    }

    const memberData = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    return memberData.member || null;
  },
);

export interface UpdateMemberInfoValues {
  firstName: string;
  lastName: string;
}

export async function updateMemberInfo(
  wixClient: wixClient,
  { firstName, lastName }: UpdateMemberInfoValues,
) {
  const loggedInMember = await getLoggedInMember(wixClient);

  if (!loggedInMember?._id) {
    throw Error("No member ID found");
  }

  return wixClient.members.updateMember(loggedInMember._id, {
    contact: {
      firstName,
      lastName,
    },
  });
}
