import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/lib/auth-context";
import JsonLd from "@/components/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maqsadquran.com"),
  title: {
    default: "Maqsad-e-Quran Academy | Online Quran Classes with Certified Scholars",
    template: "%s | Maqsad-e-Quran Academy",
  },
  description:
    "Learn Quran online 1-on-1 with qualified male and female certified scholars from Al-Azhar & Wifaq. Noorani Qaida, Tajweed, Hifz, and Tafseer for kids, sisters, and adults worldwide. Book a 3-Day Free Trial!",
  keywords: [
    "Online Quran Academy",
    "Learn Quran Online",
    "Online Quran Classes for Kids",
    "Female Quran Teacher Online",
    "Tajweed Rules Online",
    "Quran Hifz Online",
    "Noorani Qaida Online",
    "Quran Academy USA UK Canada Australia",
    "Alimah Online Quran Teacher",
  ],
  authors: [{ name: "Maqsad-e-Quran Academy" }],
  creator: "Maqsad-e-Quran Academy",
  publisher: "Maqsad-e-Quran Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maqsadquran.com",
    siteName: "Maqsad-e-Quran Academy",
    title: "Maqsad-e-Quran Academy | Online Live 1-on-1 Quran Classes with Certified Scholars",
    description:
      "Online Quran classes for kids and adults with certified male and female scholars worldwide. Flexible schedules and 3-Day Free Trial.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maqsad-e-Quran Academy Online Quran Classes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maqsad-e-Quran Academy | Online Quran Classes",
    description:
      "Learn Quran online 1-on-1 with certified male & female scholars. Start your 3-Day Free Trial today!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://maqsadquran.com",
    languages: {
      "en-US": "https://maqsadquran.com",
      "ur-PK": "https://maqsadquran.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`${jakarta.variable} ${amiri.variable} font-sans antialiased text-slate-900 selection:bg-amber-400 selection:text-emerald-950`}>
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
        
        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 md:hidden pointer-events-none">
          <a 
            href="#admissions"
            className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3.5 text-center font-black text-emerald-950 shadow-[0_10px_35px_rgba(245,158,11,0.5)] pointer-events-auto transition active:scale-95 border border-amber-300 flex items-center justify-center gap-2"
          >
            <span>Claim 3-Day Free Trial</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </body>
    </html>
  );
}