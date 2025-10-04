// components/HeroSection.tsx

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        안녕하세요, <br />
        안드로이드 개발자 OOO입니다.
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
        저는 사용자 경험 개선을 통해 실제 비즈니스 문제를 해결하는 것을 즐깁니다.
        Jetpack Compose와 Coroutines를 사용한 현대적인 앱 개발에 자신 있습니다.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="#projects" // 대표 프로젝트 섹션의 id로 연결
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          프로젝트 보기
        </a>
        <a
          href="https://github.com/your-github-id" // 본인 깃허브 주소로 변경하세요
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}