import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduStar - Bimbingan Belajar Terpercaya",
  description:
    "Tingkatkan prestasi akademikmu bersama EduStar. Bimbingan belajar dengan tutor berpengalaman, metode efektif, dan pendampingan intensif untuk SD, SMP, SMA, dan Persiapan UTBK.",
  keywords: [
    "bimbingan belajar",
    "tutoring",
    "les privat",
    "UTBK",
    "pendidikan",
    "EduStar",
  ],
  authors: [{ name: "EduStar" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-icon.png", sizes: "192x192", type: "image/png", rel: "android-icon" },
    ],
  },
  openGraph: {
    title: "EduStar - Bimbingan Belajar Terpercaya",
    description:
      "Tingkatkan prestasi akademikmu bersama EduStar. Tutor berpengalaman, metode efektif, dan pendampingan intensif.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-[family-name:var(--font-poppins)]`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
