import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OOO의 포트폴리오",
  description: "문제를 해결하는 안드로이드 개발자 OOO입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. body 태그를 flex 컨테이너로 만들어 푸터를 항상 하단에 고정시킵니다. */}
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* 3. children(각 페이지 내용)을 main 태그로 감싸고 flex-grow를 줍니다. */}
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}