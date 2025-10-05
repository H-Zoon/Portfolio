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

                        const title = typeof project.fields.title === 'string'
                            ? project.fields.title
                            : '제목 없음';

                        const preview = typeof project.fields.preview === 'string'
                            ? project.fields.preview
                            : '설명 없음';

                        const skillsList = Array.isArray(project.fields.skills)
                            ? project.fields.skills
                            : project.fields.skills?.['ko-KR'] || [];

                        const thumbnail = project.fields.thumbnail as Asset | undefined;
                        const thumbnailImageUrl = thumbnail?.fields.file?.url
                        const thumbnailImageDescription = typeof thumbnail?.fields.description === 'string'
                            ? thumbnail.fields.description
                            : title;

                        return (
                            <Link
                                key={project.sys.id}
                                href={`/projects/${project.fields.slug}`}
                                className="block bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                {thumbnailImageUrl && (
                                    <img
                                        src={`https:${thumbnailImageUrl}`}
                                        alt={thumbnailImageDescription}
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                                    <pre className="text-gray-700 dark:text-gray-300 mb-4">
                                        {preview}
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