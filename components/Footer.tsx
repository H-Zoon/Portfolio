// components/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center">
      <div className="container mx-auto">
        <p className="text-gray-600 dark:text-gray-400">
          © {currentYear} OOO. All rights reserved.
        </p>
        {/* 여기에 GitHub, LinkedIn 등 소셜 링크를 추가할 수 있습니다. */}
      </div>
    </footer>
  );
}