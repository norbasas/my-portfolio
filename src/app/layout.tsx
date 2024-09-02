import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://norbasas.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: "Norberto Basas ❖ Web Developer",
  description:
    "Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, Next.js and TypeScript. Based in Pasig, Metro Manila, Philippines.",
    icons: {
      apple: '/icons/apple-touch-icon.png',
      icon: [
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.svg',
    },
    manifest: '/icons/site.webmanifest',
    authors: [{ name: 'Norberto Basas' }],
    keywords: ['Norberto Basas', 'Nor Basas', 'Norbz', 'Front-end Developer', 'Web Developer', 'JavaScript', 'React.js', 'TypeScript'],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://norbasas.vercel.app',
      title: 'Norberto Basas ❖ Web Developer',
      description:
        'Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, Next.js and TypeScript. Based in Pasig, Metro Manila, Philippines.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Norberto Basas ❖ Web Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Norberto Basas ❖ Web Developer",
      description: "Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, Next.js and TypeScript. Based in Pasig, Metro Manila, Philippines.",
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
      <head>
      <meta name="facebook-domain-verification" content="zr0uhgenjc1pn3a28pqcd26hww83i2" />
      <meta name="msvalidate.01" content="CB74772C8513D76CD892607847078292" />
      <GoogleAnalytics />
      </head>
      <body className={`dark ${inter.className}`}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
