import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyse Design System",
  description:
    "A production-ready React component registry built from the Lyse Figma Design System. Install components with shadcn CLI.",
  openGraph: {
    title: "Lyse Design System",
    description:
      "Production-ready React components from the Lyse Figma Design System.",
    url: "https://ui.lyse.dev",
    siteName: "Lyse Design System",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
