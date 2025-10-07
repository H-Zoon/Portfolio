// app/projects/[slug]/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { TypeProjectSkeleton } from "@/types/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import Link from "next/link";
import Image from "next/image";
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS 변수로 사용
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display', // CSS 변수로 사용
});

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

  return (
    // --- 2. TYPOGRAPHY: 폰트 변수 적용 ---
    <article className={`container mx-auto py-20 px-6 ${inter.variable} ${playfairDisplay.variable} font-sans`}>

      {/* --- 1. LAYOUT: Hero 섹션 --- */}
      <header className="max-w-5xl mx-auto mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 font-serif">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* --- 왼쪽: 썸네일 이미지 --- */}
          <div className="w-full md:w-5/12">
            {thumbnail?.fields.file?.url && (
              // --- 3. INTERACTION: 호버 효과를 위한 group 클래스 추가 ---
              <div className="group relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                {/* --- 1. CODE: next/image 컴포넌트로 교체 --- */}
                <Image
                  src={`https:${thumbnail.fields.file.url}`}
                  alt={
                    typeof thumbnail.fields.description === 'string'
                      ? thumbnail.fields.description
                      : title
                  }
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            )}
          </div>

          {/* --- 오른쪽: 프로젝트 핵심 정보 --- */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {summary && documentToReactComponents(summary, options)}
            </div>

            {/* --- 스킬 태그 --- */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(tag => (
                  // 아이콘 추가 제안: <IconComponent className="mr-1.5" />
                  <span key={tag} className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* --- 링크 버튼 --- */}
            <div className="flex flex-wrap gap-4 mt-auto">
              {gitHubLink && (
                <Link href={gitHubLink} target="_blank" className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                  GitHub
                </Link>
              )}
              {storeLink && (
                <Link href={storeLink} target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                  Visit Store
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <hr className="my-16 border-gray-200 dark:border-gray-700" />
      
      {/* --- 본문 내용 (prose로 스타일링) --- */}
      {/* 추가 개선 제안: framer-motion을 사용하여 스크롤 애니메이션 적용 가능
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      */}
      <div className="prose dark:prose-invert max-w-3xl mx-auto prose-lg">
        {content && documentToReactComponents(content, options)}
      </div>
    </article>
  );
}