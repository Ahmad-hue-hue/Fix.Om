import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./globals.css";
import { BilingualProvider } from "@/lib/hooks/use-bilingual";

export const metadata: Metadata = {
  title: "FIX Speciality Coffee | Oman",
  description: "Speciality Coffee. Precision Calibration. Premium coffee experience in Oman.",
  keywords: ["coffee", "speciality coffee", "Oman", "Muscat", "FIX coffee"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body className="min-h-screen bg-obsidian text-bone antialiased overflow-x-hidden">
        <BilingualProvider>
          {children}
        </BilingualProvider>
      </body>
    </html>
  );
}