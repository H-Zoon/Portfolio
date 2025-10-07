// components/HeroSection.tsx
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Entry, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import { TypeAboutSkeleton } from '@/types/contentful';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});


export default function HeroSection({ content }: { content: Entry<TypeAboutSkeleton> | undefined }) {
  if (!content) {
    return null;
  }

  const { title, introduction, profileImage: rawProfileImage} = content.fields;

  const profileImage = rawProfileImage as Asset | undefined;
  const profileImageUrl = profileImage?.fields.file?.url;
  const profileImageDescription = typeof profileImage?.fields.description === 'string' ? profileImage?.fields.description : 'Profile Image';

  const displayTitle = typeof title === 'string' ? title : '';

  return (
    <section 
      id="about" 
      className={`bg-white dark:bg-gray-900 ${inter.variable} ${playfairDisplay.variable} font-sans`}
    >
      <div className="container mx-auto py-24 px-6">
        
        {/* --- 1. LAYOUT CHANGE: 제목을 최상단으로 이동 --- */}
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold mb-16 font-serif text-center text-gray-900 dark:text-white">
            {displayTitle}
          </h1>
        )}

        {/* --- 2. LAYOUT CHANGE: 이미지와 소개글을 한 행(grid)으로 묶음 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          
          {/* --- 왼쪽 열: 프로필 이미지 --- */}
          <div className="md:col-span-1 flex justify-center">
            {profileImageUrl && (
              <div className="relative group w-[250px] h-[250px]">
                <Image
                  src={`https:${profileImageUrl}`}
                  alt={profileImageDescription}
                  width={250}
                  height={250}
                  className="rounded-full shadow-2xl object-cover border-4 border-white dark:border-gray-700 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 animate-pulse group-hover:animate-none"></div>
              </div>
            )}
          </div>

          {/* --- 오른쪽 열: 소개글 및 버튼 --- */}
          <div className="md:col-span-2 text-left">
            {/* 텍스트 정렬을 위해 prose에서 text-left 클래스 직접 적용 */}
            <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300 mb-8">
              {introduction && documentToReactComponents(introduction as Document)}
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
              <a
                href="https://velog.io/@jun34723/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                Blog
              </a>
              <a
                href="https://github.com/H-Zoon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-black transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}