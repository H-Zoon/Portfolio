// app/page.tsx
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import { contentfulClient } from '@/lib/contentful';
import { TypeProjectSkeleton } from '@/types/contentful';

// 1. 함수의 이름을 바꾸고 limit: 2 옵션을 제거합니다.
async function getAllProjects() {
  const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
    content_type: 'project',
    order: ['-sys.createdAt'],
    include: 2,
  });
  return response.items;
}

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main>
      <HeroSection />
      <FeaturedProjects projects={projects} />
    </main>
  );
}