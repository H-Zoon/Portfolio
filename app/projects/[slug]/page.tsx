// app/projects/[slug]/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { TypeProjectSkeleton } from "@/types/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import Link from "next/link";

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
  const { title, summary, content, thumbnail: thumb, skills, gitHubLink, storeLink } = project.fields;
  const thumbnail = thumb as Asset | undefined;

  // 렌더링 옵션 정의
  const options: Options = {
    // 인라인(inline) 스타일 렌더링 (볼드, 이탤릭 등)
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: text => <u className="underline">{text}</u>,
      [MARKS.CODE]: text => (
        <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 font-mono text-sm">
          {text}
        </code>
      ),
    },
    // 블록(block) 단위 요소 렌더링 (헤딩, 문단, 리스트 등)
    renderNode: {
      // --- 헤딩 H1 ~ H6 ---
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-lg font-bold mt-3 mb-1">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-base font-bold mt-2 mb-1">{children}</h6>
      ),

      // --- 기타 블록 요소 ---
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-300 dark:border-gray-600" />,

      // --- 이미지 렌더링을 위한 규칙 추가 ---
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target as Asset | undefined;

        if (!asset?.fields?.file?.url) {
          return null; // 에셋이나 URL이 없으면 렌더링하지 않음
        }

        const mimeType = asset.fields.file.contentType;
        const url = `https:${asset.fields.file.url}`;
        const description = typeof asset.fields.description === 'string' ? asset.fields.description : '';

        // 이미지 타입인 경우
        if (typeof mimeType === 'string' && mimeType.includes('image')) {
          const details = asset.fields.file.details;
          let width, height;

          // [수정] 'in' 연산자를 사용해 'image' 속성의 존재 여부를 안전하게 확인
          if (details && 'image' in details && details.image) {
            width = details.image.width;
            height = details.image.height;
          }
          
          return (
            <div className="my-6 flex justify-center">
              <img 
                src={url} 
                alt={description} 
                width={width} 
                height={height}
                className="rounded-lg shadow-md max-w-full h-auto"
                loading="lazy"
              />
            </div>
          );
        }
        // if (mimeType.includes('video')) { ... }

        return null;
      },
    },
  };

  return (
    <article className="container mx-auto py-20 px-8">
      {/* --- 제목 --- */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        {title}
      </h1>

      {/* --- 썸네일 이미지와 요약을 묶는 컨테이너 (변경됨) --- */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto mb-16">

        {/* --- 썸네일 이미지 (왼쪽, 3/10 너비) --- */}
        <div className="w-full md:w-3/10">
          {thumbnail?.fields.file?.url && (
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https:${thumbnail.fields.file.url}`}
                alt={
                  typeof thumbnail.fields.description === 'string'
                    ? thumbnail.fields.description
                    : title
                }
                className="w-full h-full object-cover" // 이미지가 컨테이너에 맞게 잘리도록 설정
              />
            </div>
          )}
        </div>

        {/* --- 프로젝트 요약 (오른쪽, 7/10 너비) --- */}
        <div className="w-full md:w-7/10 text-lg text-gray-600 dark:text-gray-300">
          {summary && documentToReactComponents(summary, options)}
        </div>
      </div>

      {/* --- 스킬 태그 --- */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {skills.map(tag => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* --- 링크 버튼 (Github, Store) --- */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {gitHubLink && (
          <Link href={gitHubLink} target="_blank" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            GitHub
          </Link>
        )}
        {storeLink && (
          <Link href={storeLink} target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Visit Store
          </Link>
        )}
      </div>

      {/* --- 본문 내용 (content) --- */}
      <div className="prose dark:prose-invert max-w-2xl mx-auto">
        {content && documentToReactComponents(content, options)}
      </div>
    </article>
  );
}