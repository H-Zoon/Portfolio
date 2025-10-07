// components/FeaturedProjects.tsx
import { TypeActiveSkeleton } from "@/types/contentful";
import type { Entry, Asset } from "contentful";
import Link from 'next/link';
import Image from 'next/image'; // 변경점: next/image 임포트

export default function FeaturedProjects({ projects }: { projects: Entry<TypeActiveSkeleton>[] }) {
    return (
        <section id="projects" className="py-20 px-8 bg-white dark:bg-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => {
                        const { id } = project.sys;
                        const { slug, title, preview, skills, thumbnail: rawThumbnail } = project.fields;

                        const thumbnail = rawThumbnail as Asset | undefined;
                        const thumbnailImageUrl = thumbnail?.fields.file?.url;
                        const altText = typeof thumbnail?.fields.description === 'string' ? thumbnail?.fields.description : '';

                        const displayTitle = typeof title === 'string' ? title : '';
                        const previewText = typeof preview === 'string' ? preview : '';
                        const skillsList = Array.isArray(skills) ? skills : [];

                        return (
                            <Link
                                key={id}
                                href={`/active/${slug}`}
                                className="block bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                {/** 변경점: Image 컴포넌트 사용 및 높이 고정
                                 * 1. `relative`와 `aspect-video`를 가진 div로 이미지를 감싸 일정한 비율을 유지합니다.
                                 * 2. <img>를 <Image>로 변경하고, `fill` 속성으로 부모 div를 꽉 채웁니다.
                                 * 3. `object-cover`로 이미지 비율을 유지하면서 컨테이너를 채우도록 합니다.
                                 * 4. `sizes` 속성을 추가하여 반응형 환경에서 이미지 로딩을 최적화합니다.
                                 */}
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