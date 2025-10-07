// components/Experience.tsx
import type { Entry } from 'contentful';
import type {TypeEducationSkeleton, TypeRecordSkeleton} from '@/types/contentful';

// 1. props 타입을 두 개의 배열로 변경
interface ExperienceProps {
  educations: Entry<TypeEducationSkeleton, undefined, string>[];
  records: Entry<TypeRecordSkeleton, undefined, string>[];
}

export default function Experience({ educations, records }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 px-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        {/* 2. 제목들을 다시 하드코딩 */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
              Education
            </h3>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
              {/* 3. educationItems prop을 직접 사용 */}
              {educations
                ?.filter(
                  (item): item is Entry<TypeEducationSkeleton, undefined, string> => 'fields' in item
                )
                .map((item) => (
                  <div className="mb-8 ml-6" key={item.sys.id}>
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg /* ... SVG 아이콘 ... */ />
                    </span>
                    <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {item.fields.schoolName}
                    </h4>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {item.fields.period}
                    </time>
                    <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                      {item.fields.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Record Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
              Record
            </h3>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
              {/* 4. recordItems prop을 직접 사용 (API에서 이미 정렬됨) */}
              {records
                ?.filter(
                  (item): item is Entry<TypeRecordSkeleton, undefined, string> => 'fields' in item
                )
                .map((item) => (
                  <div className="mb-8 ml-6" key={item.sys.id}>
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                    <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {item.fields.date.slice(0, 7).replace('-', '.')}
                    </time>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.fields.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}