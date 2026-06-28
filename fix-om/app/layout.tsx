import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BilingualProvider } from "@/lib/hooks/use-bilingual";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({ 
  weight: ["400", "600", "700"],
  subsets: ["arabic"], 
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIX Speciality Coffee | Oman",
  description: "Speciality Coffee. Precision Calibration. Premium coffee experience in Oman.",
  keywords: ["coffee", "speciality coffee", "Oman", "Muscat", "FIX coffee"],
  openGraph: {
    title: "FIX Speciality Coffee | Oman",
    description: "Speciality Coffee. Precision Calibration.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A4352",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" style={{ colorScheme: "light" }}>
      <body className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${ibmPlexArabic.variable} min-h-screen bg-obsidian text-bone antialiased overflow-x-hidden`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        <BilingualProvider>
          {children}
        </BilingualProvider>
      </body>
    </html>
  );
}