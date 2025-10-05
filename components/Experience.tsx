// components/Experience.tsx

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Education</h3>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
              <div className="mb-8 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">명지대학교</h4>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2017.03 ~ 2023.03</time>
                <p className="text-base font-normal text-gray-600 dark:text-gray-300">컴퓨터공학과 전공 • 학사</p>
              </div>
            </div>
          </div>

          {/* Record Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Record</h3>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
               <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2024.12</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">개발 블로그 개설 운영중</p>
              </div>
              <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023.09</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">UNITON 10TH 참가 / 특별상 수상</p>
              </div>
               <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023.05</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Google Kotlin Conf’23 참가</p>
              </div>
              <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022.12</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">인턴십 프로젝트 어플리케이션 제작 (가계부)</p>
              </div>
               <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022.12</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Jetpack Compose Camp 이수</p>
              </div>
              <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022.09</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">ICT 직무캠프 인턴십 진행</p>
              </div>
               <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022.03</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">UNITON 8TH 참가</p>
              </div>
               <div className="mb-8 ml-6">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022.07</time>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">TimeLeft 어플리케이션 스토어 출간</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}