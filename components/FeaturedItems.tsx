// components/FeaturedItems.tsx
import { TypePortfolioItemSkeleton } from "@/types/contentful";
import type { Entry, Asset } from "contentful";
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedItemsProps {
  title: string;
  items: Entry<TypePortfolioItemSkeleton>[];
  type: 'project' | 'active'; // 링크 경로를 결정할 타입
}

export default function FeaturedItems({ title, items, type }: FeaturedItemsProps) {
    return (
        <section id={type} className="py-20 px-8 bg-white dark:bg-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    {title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item) => {
                        const { id } = item.sys;
                        const { slug, title, preview, skills, thumbnail: rawThumbnail } = item.fields;

                        const thumbnail = rawThumbnail as Asset | undefined;
                        const thumbnailImageUrl = thumbnail?.fields.file?.url;
                        const altText = typeof thumbnail?.fields.description === 'string' ? thumbnail?.fields.description : '';
                        
                        const displayTitle = typeof title === 'string' ? title : '';
                        const previewText = typeof preview === 'string' ? preview : '';
                        const skillsList = Array.isArray(skills) ? skills : [];

                        return (
                            <Link
                                key={id}
                                href={`/${type}/${slug}`} // prop으로 받은 type을 사용
                                className="block bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                {thumbnailImageUrl && (
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={`https:${thumbnailImageUrl}`}
                                            alt={altText}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{displayTitle}</h3>
                                    <pre className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap break-words">
                                        {previewText}
                                    </pre>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsList.map((tag: string) => (
                                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}