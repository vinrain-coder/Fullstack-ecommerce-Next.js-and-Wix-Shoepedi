import { wixClient } from "../lib/wix-client.base";

export async function getCollectionBySlug(wixClient: wixClient, slug: string) {
  const { collection } = await wixClient.collections.getCollectionBySlug(slug);

  return collection || null;
}
