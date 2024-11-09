import Product from "@/src/components/Product";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getWixServerClient } from "@/src/lib/wix-client.server";
import { getCollectionBySlug } from "@/src/wix-api/collections";
import { queryProducts } from "@/src/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'; // or 'force-static' depending on your needs

interface PageProps {
  children: React.ReactNode;
  params: { slug?: string } | any;
}

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const collection = await getCollectionBySlug(getWixServerClient(), slug);

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner ? [{ url: banner.url }] : [],
    },
  };
}

const ProductsPage = async ({ params: { slug } }: PageProps) => {
  const collection = await getCollectionBySlug(getWixServerClient(), slug);

  if (!collection?._id) notFound();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <Products collectionId={collection._id} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;

// Move this function to ensure it is treated as a Server Component
const Products = async ({ collectionId }: { collectionId: string }) => {
  const collectionProducts = await queryProducts(getWixServerClient(), {
    collectionIds: collectionId,
  });

  if (!collectionProducts.length) notFound();

  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {collectionProducts.items.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
