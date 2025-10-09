// components/Header.tsx
"use client"; // 1. 클라이언트 컴포넌트로 전환

import Link from 'next/link';
import { useState, useEffect } from 'react'; // 2. Hook 가져오기

export default function Header() {
  // 2. 현재 활성화된 섹션을 저장할 상태
  const [activeSection, setActiveSection] = useState('');

  // 3. 스크롤 감지를 위한 useEffect
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // 화면 정중앙에 위치할 때 활성화
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // 컴포넌트가 언마운트될 때 observer를 정리합니다. (메모리 누수 방지)
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 설정

  // 4. 활성화 상태에 따라 적용될 공통 스타일
  const navLinkClasses = (sectionId: string) => 
    `text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300 ${
      activeSection === sectionId ? 'text-blue-600 font-bold' : ''
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          HyunJun's Portfolio
        </Link>
        <nav className="space-x-4">
          <a href="/#about" className={navLinkClasses('about')}>
            About
          </a>
          <a href="/#experience" className={navLinkClasses('experience')}>
            Experience
          </a>
          <a href="/#project" className={navLinkClasses('project')}>
            Project
          </a>
          <a href="/#active" className={navLinkClasses('active')}>
            Active
          </a>
        </nav>
      </div>
    </header>
  );
}