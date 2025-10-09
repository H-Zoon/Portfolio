// app/project/[slug]/page.tsx
import { contentfulClient } from "@/lib/contentful";
import { TypePortfolioItemSkeleton } from "@/types/contentful";
import { notFound } from "next/navigation";
import PortfolioItemPage from "@/components/PortfolioItemPage"; // 공통 페이지 컴포넌트

interface PageParams {
  params: { slug: string };
}

async function getItem(slug: string) {
  const response = await contentfulClient.getEntries<TypePortfolioItemSkeleton>({
    content_type: 'project', // content_type만 다름
    'fields.slug': slug,
    limit: 1,
    include: 2,
  });

  if (response.items.length === 0) {
    notFound();
  }
  return response.items[0];
}

export default async function ProjectPage({ params }: PageParams) {
  const item = await getItem(params.slug);
  return <PortfolioItemPage item={item} />;
}