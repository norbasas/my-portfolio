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
  title: "Norberto Basas | Front-End Developer | JavaScript, React.js, TypeScript",
  description:
    "Frontend developer with a passion for creating responsive and visually stunning web applications. Specializing in JavaScript, React.js, and TypeScript. Based in Pasig, Metro Manila, Philippines.",
    icons: {
      apple: '/icons/apple-touch-icon.png',
      icon: [
        { rel: 'icon', url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: '/favicon.png',
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
      <head>
      <meta name="facebook-domain-verification" content="zr0uhgenjc1pn3a28pqcd26hww83i2" />
      <GoogleAnalytics />
      </head>
      <body className={`dark ${inter.className}`}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
