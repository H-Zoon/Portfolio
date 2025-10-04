// components/FeaturedProjects.tsx
import { TypeProjectSkeleton } from "@/types/contentful";
import type { Entry, Asset } from "contentful"
import Link from 'next/link';

// 컴포넌트가 projects라는 이름의 prop을 받도록 수정합니다.
export default function FeaturedProjects({ projects }: { projects: Entry<TypeProjectSkeleton>[] }) {
    return (
        <section id="projects" className="py-20 px-8 bg-white dark:bg-gray-800">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    대표 프로젝트
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/*prop으로 받은 projects를 사용합니다. */}
                    {projects.map((project) => {
                        const thumbnail = project.fields.thumbnail as Asset | undefined;
                        return (
                            <Link
                                key={project.sys.id}
                                href={`/projects/${project.fields.slug}`}
                                className="block bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                {thumbnail?.fields.file?.url && (
                                    <img
                                        src={`https:${thumbnail.fields.file.url}`}
                                        alt={typeof thumbnail.fields.description === 'string'
                                            ? thumbnail.fields.description
                                            : project.fields.title 
                                        }
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{project.fields.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        프로젝트 설명을 보려면 클릭하세요.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.fields.skills.map(tag => (
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