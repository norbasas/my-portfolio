import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Norberto Basas",
  description:
    "Frontend developer and designer with a passion for creating responsive and visually stunning web applications.",
    icons: {
      apple: '/icons/apple-touch-icon.png',
      icon: [
        { rel: 'icon', url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { rel: 'icon', url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/icons/favicon.ico',
    },
    manifest: '/icons/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics />
      <body className={`dark ${inter.className}`}>{children}</body>
    </html>
  );
}
