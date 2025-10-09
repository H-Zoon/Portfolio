// components/HeroSection.tsx
"use client"

import Image from 'next/image';
import type { Entry, Asset } from 'contentful';
import { TypeAboutSkeleton } from '@/types/contentful';
import { TypeAnimation } from 'react-type-animation';

const SKILLS = ['Android', 'Compose', 'Kotlin'];
const BLOG_URL = "https://velog.io/@jun34723/posts";
const GITHUB_URL = "https://github.com/H-Zoon";

type HeroSectionProps = {
  content: Entry<TypeAboutSkeleton> | undefined;
};

export default function HeroSection({ content }: HeroSectionProps) {
  if (!content) {
    return null;
  }


  const profileImage = content.fields.image as Asset | undefined;
  const profileImageUrl = profileImage?.fields.file?.url;
  const profileImageDescription = profileImage?.fields.description ?? 'Profile Image';
  const animationSequence = SKILLS.flatMap((skill) => [skill, 3000]);

  return (
    <section
      id="about"
      className={`bg-white dark:bg-gray-900 font-sans`}
    >
      <div className="container mx-auto py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center max-w-6xl mx-auto">

          {/* 왼쪽 열: 프로필 이미지 */}
          <div className="md:col-span-1 flex justify-center">
            {profileImageUrl && (
              <div className="relative group w-[250px] h-[250px]">
                <Image
                  src={`https:${profileImageUrl}`}
                  alt={profileImageDescription as string}
                  width={250}
                  height={250}
                  className="rounded-full shadow-2xl object-cover border-4 border-white dark:border-gray-700 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 animate-pulse group-hover:animate-none"></div>
              </div>
            )}
          </div>

          {/* 오른쪽 열: 소개글 및 버튼 */}
          <div className="md:col-span-2 text-left">
            <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300 mb-8">
              <h1 className="text-4xl font-bold">
                안녕하세요,
                <br />
                <TypeAnimation
                  sequence={animationSequence}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  speed={10}
                  className="text-yellow-400"
                />
                를 좋아하는
                <br />
                개발자 최현준 입니다.
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                Blog
              </a>
              <a
                href={GITHUB_URL}
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