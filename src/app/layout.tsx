import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Norberto Basas | Front-End Developer | JavaScript, React.js, TypeScript",
  description:
    "Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, and TypeScript. Based in Pasig, Metro Manila, Philippines.",
    icons: {
      apple: '/icons/apple-touch-icon.png',
      icon: [
        { rel: 'icon', url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { rel: 'icon', url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/icons/favicon.ico',
    },
    manifest: '/icons/site.webmanifest',
    authors: [{ name: 'Norberto Basas' }],
    keywords: ['Norberto Basas', 'Front-End Developer', 'JavaScript', 'React.js', 'TypeScript'],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://norbasas.vercel.app',
      siteName: 'Norberto Basas',
      title: 'Norberto Basas | Front-End Developer | JavaScript, React.js, TypeScript',
      description:
        'Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, and TypeScript. Based in Pasig, Metro Manila, Philippines.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Norberto Basas | Front-End Developer | JavaScript, React.js, TypeScript',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Norberto Basas | Front-End Developer | JavaScript, React.js, TypeScript",
      description: "Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, and TypeScript. Based in Pasig, Metro Manila, Philippines.",
      images: ['/images/og-image.jpg'],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics />
      <body className={`dark ${inter.className}`}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
