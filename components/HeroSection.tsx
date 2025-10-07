// components/HeroSection.tsx
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Entry, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import { TypeAboutPageSkeleton } from '@/types/contentful';

export default function HeroSection({ content }: { content: Entry<TypeAboutPageSkeleton> | undefined }) {
  if (!content) {
    return null;
  }

  const { title, introduction, profileImage: rawProfileImage} = content.fields;

  const profileImage = rawProfileImage as Asset | undefined;
  const profileImageUrl = profileImage?.fields.file?.url;
  const profileImageDescription = typeof profileImage?.fields.description === 'string' ? profileImage?.fields.description : '';

  const displayTitle = typeof title === 'string' ? title : '';
  //const introductionText = typeof introduction === 'string' ? introduction : '';

  return (
    <section id="about" className="container mx-auto py-20 px-8 flex flex-col items-center">
      {title && (
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          {displayTitle}
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full max-w-5xl">
        <div className="md:col-span-1 flex justify-center">
          {profileImageUrl && (
            <Image
              src={`https:${profileImageUrl}`}
              alt={profileImageDescription}
              width={250}
              height={250}
              className="rounded-full shadow-lg object-cover"
              priority
            />
          )}
        </div>

        <div className="md:col-span-2">
          <div className="prose dark:prose-invert max-w-none">
            {introduction && documentToReactComponents(introduction as Document)}
          </div>
          <div className="flex space-x-4 mt-8">
            <a
              href="https://velog.io/@jun34723/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300"
            >
              Blog
            </a>
            <a
              href="https://github.com/H-Zoon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}