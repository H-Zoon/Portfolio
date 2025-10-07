// app/page.tsx
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import Experience from '@/components/Experience';
import { contentfulClient } from '@/lib/contentful';
import { TypeProjectSkeleton, TypeAboutSkeleton, TypeEducationSkeleton, TypeRecordSkeleton} from '@/types/contentful';

async function getAbout() {
  const response = await contentfulClient.getEntries<TypeAboutSkeleton>({
    content_type: 'about',
    limit: 1,
    locale: 'en-US',
    include: 2,
  });
  return response.items[0];
}

async function getProjects() {
  const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
    content_type: 'project',
    order: ['-sys.createdAt'],
    locale: 'en-US', // 필요시 'ko' 등으로 변경
    include: 2,
  });
  return response.items;
}

// 3. Education Item들을 가져오는 함수 추가
async function getEducations() {
  const response = await contentfulClient.getEntries<TypeEducationSkeleton>({
    content_type: 'education',
    order: ['sys.createdAt'], // 생성된 순서대로 정렬 (필요시 변경)
  });
  return response.items;
}

// 4. Record Item들을 가져오는 함수 추가 (최신순 정렬 포함)
async function getRecords() {
  const response = await contentfulClient.getEntries<TypeRecordSkeleton>({
    content_type: 'record',
    order: ['-fields.date'], // 날짜 필드 기준 내림차순 (최신순)
  });
  return response.items;
}

export default async function Home() {
  // 5. Promise.all을 사용해 모든 데이터를 병렬로 호출
  const [
    projects,
    about,
    educations,
    records
  ] = await Promise.all([
    getProjects(),
    getAbout(),
    getEducations(),
    getRecords(),
  ]);

  return (
    <main>
      <HeroSection content={about} />
      <Experience educations={educations} records={records} />
      <FeaturedProjects projects={projects} />
    </main>
  );
}