"use client"

import { Skeleton } from "@/components/ui/skeleton";
import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

// Layout component props definition
interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

// Main Layout component
export default function Layout({ children, params }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<any>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      const collectionData = await getCollectionBySlug(getWixServerClient(), params.slug);
      if (!collectionData) {
        notFound();
      } else {
        setCollection(collectionData);
      }
      setLoading(false);
    };

    fetchCollection();
  }, [params.slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return <CollectionsLayout collection={collection} params={params}>{children}</CollectionsLayout>;
}

// CollectionsLayout component for rendering the collection details
function CollectionsLayout({ children, collection, params: { slug } }: { children: React.ReactNode, collection: any, params: { slug: string } }) {
  const banner = collection.media?.mainMedia?.image;

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10">
        {banner && (
          <div className="relative hidden sm:block">
            <WixImage
              mediaIdentifier={banner.url}
              width={1280}
              height={400}
              alt={banner.altText}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl font-bold text-white lg:text-5xl">
              {collection.name}
            </h1>
          </div>
        )}
        <h1 className={cn("mx-auto text-3xl font-bold md:text-4xl", banner && "sm:hidden")}>
          {collection.name}
        </h1>
      </div>
      {children}
    </main>
  );
}

// Loading skeleton placeholder component
function LoadingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <Skeleton className="mx-auto h-10 w-48 sm:block sm:aspect-[1280/400] sm:h-full sm:w-full" />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[26rem] w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
