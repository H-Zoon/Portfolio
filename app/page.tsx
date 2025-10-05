// app/page.tsx
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import Experience from '@/components/Experience';
import { contentfulClient } from '@/lib/contentful';
import { TypeProjectSkeleton, TypeAboutPageSkeleton } from '@/types/contentful';

async function getAllProjects() {
  const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
    content_type: 'project',
    order: ['-sys.createdAt'],
    include: 2,
  });
  return response.items;
}

async function getAboutPageContent() {
  const response = await contentfulClient.getEntries<TypeAboutPageSkeleton>({
    content_type: 'aboutPage',
    limit: 1,
    include: 2,
  });
  return response.items[0];
}

export default async function Home() {
  const projects = await getAllProjects();
  const aboutContent = await getAboutPageContent();

return (
    <main>
      <HeroSection content={aboutContent} />
      <Experience /> 
      <FeaturedProjects projects={projects} />
    </main>
  );
}