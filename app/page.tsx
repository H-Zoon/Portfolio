// app/page.tsx
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import { contentfulClient } from '@/lib/contentful';
import { TypeProjectSkeleton } from '@/types/contentful';

// Contentful에서 데이터를 가져오는 비동기 함수
async function getFeaturedProjects() {
  const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
    content_type: 'project', // Contentful에서 설정한 콘텐츠 모델의 ID
    limit: 2, // 메인에는 2개만 보여주기
    order: ['-sys.createdAt'], // 최신순으로 정렬
  });
  return response.items;
}

export default async function Home() {
  // 페이지가 렌더링되기 전에 데이터를 미리 불러옵니다.
  const projects = await getFeaturedProjects();

  return (
    <main>
      <HeroSection />
      {/* 불러온 데이터를 FeaturedProjects 컴포넌트로 전달합니다. */}
      <FeaturedProjects projects={projects} />
    </main>
  );
}