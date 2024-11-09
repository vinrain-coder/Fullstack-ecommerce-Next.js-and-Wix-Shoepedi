import { cache } from "react";
import { collections } from "@wix/stores";
import { wixClient } from "@/lib/wix-client.base";

export const getCollectionBySlug = cache(
  async (wixClient: wixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollection = cache(
  async (wixClient: wixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") // all products
      .ne("_id", "7cb21df8-de94-8ac9-9b70-5bf95ebd503b") // featured products
      .find();

    return collections.items;
  },
);
