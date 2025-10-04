// app/projects/[slug]/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { TypeProjectSkeleton } from "@/types/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Asset } from 'contentful'; 

interface ProjectPageParams {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
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

export default async function ProjectPage(props: ProjectPageParams) {
  const params = await props.params;
  const project = await getProject(params.slug);
  const thumbnail = project.fields.thumbnail as Asset | undefined;

  return (
    <article className="container mx-auto py-20 px-8">
      {thumbnail?.fields.file?.url && (
        <img
          src={`https:${thumbnail.fields.file.url}`}
          alt={typeof thumbnail.fields.description === 'string' 
                ? thumbnail.fields.description 
                : project.fields.title
              }
          className="w-full max-w-4xl mx-auto h-auto rounded-lg shadow-lg mb-12"
        />
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        {project.fields.title}
      </h1>

      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {project.fields.skills.map(tag => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* 2. 본문 내용 (Rich Text) 렌더링 */}
      <div className="prose dark:prose-invert max-w-2xl mx-auto">
        {project.fields.description && documentToReactComponents(project.fields.description)}
      </div>
    </article>
  );
}