import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient application for managing personal notes.",
  openGraph: {
    title: "NoteHub App",
    description: "A simple application for managing personal notes.",
    url: "https://08-zustand-psi.vercel.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub App",
    description: "A simple application for managing personal notes.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
