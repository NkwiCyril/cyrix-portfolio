import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const helvena = localFont({
  src: [
    {
      path: "../public/fonts/helvena/Helvena-Extralight.woff2",
      weight: "200",
    },
    {
      path: "../public/fonts/helvena/Helvena-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/helvena/Helvena-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/helvena/Helvena-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/helvena/Helvena-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/helvena/Helvena-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/helvena/Helvena-Extrabold.woff2",
      weight: "800",
    },
    {
      path: "../public/fonts/helvena/Helvena-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-helvena",
  display: "swap",
});

const puertos = localFont({
  src: "../public/fonts/puertos/Puertos-Regular.woff2",
  variable: "--font-puertos",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cyrix — Software Engineer, Web Developer & Content Creator",
  description:
    "Building modern digital experiences and sharing knowledge about tech, software & AI. Explore my portfolio, blog, and mentorship program.",
  keywords: [
    "software engineer",
    "web developer",
    "content creator",
    "portfolio",
    "Next.js",
    "React",
    "AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${helvena.variable} ${puertos.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
