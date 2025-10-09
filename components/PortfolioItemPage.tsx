// components/PortfolioItemPage.tsx
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, type Text, type Document } from '@contentful/rich-text-types';
import type { Asset, Entry } from 'contentful';
import Link from "next/link";
import Image from "next/image";
import { Inter, Playfair_Display } from 'next/font/google';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypePortfolioItemSkeleton, TypeImageWithTextSkeleton } from '@/types/contentful';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS 변수로 사용
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display', // CSS 변수로 사용
});

const isText = (node: any): node is Text => {
  return node.nodeType === 'text';
};

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
    // [수정] PARAGRAPH 렌더러를 추가/수정하여 코드 블록을 처리합니다.
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // 문단에 포함된 컨텐츠가 1개이고, 해당 컨텐츠가 'code' 마크를 가진 Text 노드인지 확인합니다.
      if (
        node.content.length === 1 &&
        isText(node.content[0]) &&
        node.content[0].marks.some(mark => mark.type === 'code')
      ) {
        const codeNode = node.content[0];
        const codeString = codeNode.value;

        return (
          <div className="my-6 shadow-lg">
            <SyntaxHighlighter
              language="kotlin" // 기본 언어 설정 (필요시 Contentful에서 언어 필드를 추가하여 동적으로 변경 가능)
              style={atomDark}
              showLineNumbers // 라인 넘버 표시
              customStyle={{
                borderRadius: '0.5rem', // 둥근 모서리
                padding: '1.25rem',     // 내부 여백
                fontSize: '0.9rem',     // 폰트 크기
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }

      // 위 조건에 해당하지 않는 일반 문단은 기본 p 태그로 렌더링합니다.
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-outside my-4 pl-4">{children}</ul>
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

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data.target as Entry<TypeImageWithTextSkeleton | any, undefined, string>;

      if (entry.sys.contentType.sys.id === 'imageWithText') {
        const { image, text } = entry.fields;
        const img = image as Asset | undefined;

        const imageUrl = img?.fields.file?.url;
        const altText = typeof img?.fields.description === 'string' ? img.fields.description : 'Content image';

        // [추가] Contentful에서 이미지의 원본 너비와 높이 가져오기
        const details = img?.fields?.file?.details;
        let width, height;
        if (details && 'image' in details && details.image) {
          width = details.image.width;
          height = details.image.height;
        }

        return (
          <div className="flex flex-col md:flex-row items-center gap-8 my-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
            {/* [수정] 원본 크기를 사용하도록 전체 블록 수정 */}
            {imageUrl && width && height && (
              <div className="w-full md:w-1/3 flex-shrink-0">
                <Image
                  src={`https:${imageUrl}`}
                  alt={altText}
                  width={width}
                  height={height}
                  className="rounded-md max-w-full h-auto"
                />
              </div>
            )}
            <div className="w-full md:w-2/3">
              {text && typeof text === 'object' && (text as Document).nodeType === BLOCKS.DOCUMENT
                ? documentToReactComponents(text as Document, options)
                : null
              }
            </div>
          </div>
        );
      }

      return null;
    },

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

interface PortfolioItemPageProps {
  item: Entry<TypePortfolioItemSkeleton>;
}

export default function PortfolioItemPage({ item }: PortfolioItemPageProps) {
  const { title, summary, content, thumbnail: thumb, skills, gitHubLink, storeLink } = item.fields;
  const thumbnail = thumb as Asset | undefined;

  const displayTitle = typeof title === 'string' ? title : '';
  const thumbnailAltText = typeof thumbnail?.fields.description === 'string'
    ? thumbnail.fields.description
    : displayTitle;

  // --- 💡 Helper function to safely get the Document ---
  const getRenderableDocument = (field: Document | { [key: string]: any } | undefined): Document | undefined => {
    if (!field) return undefined;
    // Check if it's a valid Rich Text Document by looking for nodeType property
    if ('nodeType' in field && field.nodeType === 'document') {
      return field as Document;
    }
    return undefined;
  };

  const renderableSummary = getRenderableDocument(summary);
  const renderableContent = getRenderableDocument(content);
  const skillsList = Array.isArray(skills) ? skills : [];

  return (
    <article className={`container mx-auto py-20 px-6 ${inter.variable} ${playfairDisplay.variable} font-sans`}>

      {/* --- 1. LAYOUT: Hero 섹션 --- */}
      <header className="max-w-5xl mx-auto mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 font-serif">
          {/* 💡 수정된 변수 사용 */}
          {displayTitle}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

          {/* --- 왼쪽: 썸네일 이미지 --- */}
          <div className="w-full md:w-5/12">
            {thumbnail?.fields.file?.url && (
              <div className="group relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={`https:${thumbnail.fields.file.url}`}
                  alt={thumbnailAltText}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            )}
          </div>

          {/* --- 오른쪽: 프로젝트 핵심 정보 --- */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {renderableSummary && documentToReactComponents(renderableSummary, options)}
            </div>

            {/* --- 스킬 태그 --- */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(tag => (
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
        {renderableContent && documentToReactComponents(renderableContent, options)}
      </div>
    </article>
  );
}
