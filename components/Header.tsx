// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          OOO's Portfolio
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Home
          </Link>
          <a href="/#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            About
          </a>
          <a href="/#experience" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Experience
          </a>
          <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Projects
          </a>
        </nav>
      </div>
    </header>
  );
}