// app/project/[slug]/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { TypePortfolioItemSkeleton } from "@/types/contentful";
import { notFound } from "next/navigation";
import PortfolioItemPage from "@/components/PortfolioItemPage";

export async function generateStaticParams() {
  const response = await contentfulClient.getEntries<TypePortfolioItemSkeleton>({
    content_type: 'project',
    select: ['fields.slug'],
  });

  return response.items
    .filter(item => item.fields?.slug)
    .map((item) => ({
      slug: item.fields.slug,
    }));
}

interface PageParams {
  params: { slug: string };
}

async function getItem(slug: string) {
  const response = await contentfulClient.getEntries<TypePortfolioItemSkeleton>({
    content_type: 'project',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  });

  if (response.items.length === 0) {
    notFound();
  }
  return response.items[0];
}

export default async function ProjectPage({ params: { slug } }: PageParams) {
  const item = await getItem(slug); // 바로 slug 변수 사용
  return <PortfolioItemPage item={item} />;
}