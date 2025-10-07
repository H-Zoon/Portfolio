// components/FeaturedProjects.tsx
import { TypeProjectSkeleton } from "@/types/contentful";
import type { Entry, Asset } from "contentful";
import Link from 'next/link';

export default function FeaturedProjects({ projects }: { projects: Entry<TypeProjectSkeleton>[] }) {
    return (
        <section id="projects" className="py-20 px-8 bg-white dark:bg-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project) => {
                        //코드 개선
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
                                href={`/projects/${slug}`}
                                className="block bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                {thumbnail?.fields.file?.url && (
                                    <img
                                        src={`https:${thumbnailImageUrl}`}
                                        alt={altText}
                                        className="w-full max-w-4xl mx-auto h-auto rounded-lg shadow-lg mb-12"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{displayTitle}</h3>
                                    <pre className="text-gray-700 dark:text-gray-300 mb-4">
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