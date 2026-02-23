import type { Metadata } from "next";
import { DM_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
