// app/projects/page.tsx

import { contentfulClient } from "@/lib/contentful";
import { TypeProjectSkeleton } from "@/types/contentful";
import type { Entry, Asset } from "contentful";
import Link from 'next/link';

// 모든 프로젝트를 가져오는 함수 (limit 없음)
async function getAllProjects() {
    const response = await contentfulClient.getEntries<TypeProjectSkeleton>({
        content_type: 'project',
        order: ['-sys.createdAt'], // 최신순으로 정렬
        include: 2,
    });
    return response.items;
}

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="container mx-auto py-20 px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                    All Projects
                </h1>
                {/* 이 부분은 FeaturedProjects 컴포넌트와 거의 동일합니다. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => {
                        // thumbnail의 타입을 여기서 단언합니다.
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
                                        상세 내용 보기
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
        </div>
    );
}