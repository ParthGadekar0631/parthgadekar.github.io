// ...removed 'use client' to allow metadata export...
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import Navbar from "./components/Navbar/page";
import { AskScottyProvider } from "./context/AskScottyContext";
import { LoadingProvider } from "./context/LoadingContext";
import PageContent from "./components/PageContent";
import AskScottyWrapper from '@/app/components/AskScottyWrapper';
// import LenisProvider from "./components/LenisProvider";
import Footer from "./components/Footer/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parth Gadekar | Portfolio",
  description: "Explore the portfolio of Parth Gadekar, a software engineer building backend systems, data pipelines, full-stack products, and analytics-driven applications.",
  keywords: [
    "Parth Gadekar",
    "Risksray",
    "Portfolio",
    "Software Engineer",
    "Data Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Projects",
    "Software Engineer"
  ],
  authors: [{ name: "Parth Gadekar", url: "https://github.com/ParthGadekar0631" }],
  creator: "Parth Gadekar",
  openGraph: {
    title: "Parth Gadekar | Portfolio",
    description: "Projects, work experience, education, and a chatbot assistant branded as Risksray.",
    url: "https://risksray.vercel.app",
    siteName: "Parth Gadekar Portfolio",
    images: [
      {
        url: "https://risksray.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Parth Gadekar Portfolio Open Graph Image"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Gadekar | Portfolio",
    description: "Software engineering, data systems, and full-stack product work by Parth Gadekar.",
    creator: "@ParthGadekar0631",
    images: ["https://risksray.vercel.app/twitter-image"]
  },
  metadataBase: new URL("https://risksray.vercel.app"),
  alternates: {
    canonical: "/"
  }
  ,
  icons: {
    icon: "/parth-logo.svg",
    shortcut: "/parth-logo.svg",
    apple: "/parth-logo.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/parth-logo.svg" as="image" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <AskScottyProvider>
              {/* <LenisProvider /> Only use LenisProvider on pages without custom scroll logic */}
              <Navbar />
              <PageContent>{children}</PageContent>
                  <Footer />
              <AskScottyWrapper />
            </AskScottyProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
