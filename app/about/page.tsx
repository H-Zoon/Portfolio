// app/about/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from "next/navigation";
import Image from 'next/image';

// About 페이지 데이터 타입을 위한 인터페이스 (새로 정의)
interface TypeAboutPageSkeleton {
  contentTypeId: "aboutPage"; // Contentful 모델 ID와 일치해야 합니다.
  fields: {
    title: import('contentful').EntryFieldTypes.Text;
    profileImage: import('contentful').EntryFieldTypes.AssetLink;
    body: import('contentful').EntryFieldTypes.RichText;
  };
}

// Contentful에서 About 페이지 데이터를 가져오는 함수
async function getAboutPageContent() {
  // About 페이지는 하나뿐이므로, slug 없이 타입으로만 가져옵니다.
  const response = await contentfulClient.getEntries<TypeAboutPageSkeleton>({
    content_type: 'aboutPage',
    limit: 1,
    include: 2,
  });

  if (response.items.length === 0) {
    notFound(); // 콘텐츠가 없으면 404
  }
  return response.items[0];
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const { title, profileImage, body } = content.fields;

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container mx-auto py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* 프로필 이미지 */}
          {profileImage?.fields.file?.url && (
             <Image
                src={`https:${profileImage.fields.file.url}`}
                alt={profileImage.fields.description || 'Profile Image'}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-8 shadow-lg"
             />
          )}
          {/* 제목 */}
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            {title}
          </h1>
        </div>

        {/* 본문 (Rich Text) */}
        <div className="prose dark:prose-invert max-w-2xl mx-auto">
          {body && documentToReactComponents(body)}
        </div>
      </div>
    </div>
  );
}