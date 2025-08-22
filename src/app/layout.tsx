import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import I18nProvider from "@/components/I18nProvider";
import LanguageSwitcher from "@/components/language-switcher";
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "José Galván de la Torre | Backend Developer & AI Engineer",
  description: "Estudiante de Ingeniería Informática especializado en desarrollo backend a gran escala e inteligencia artificial. Experiencia internacional con certificaciones en Google Cloud y AWS.",
  keywords: ["José Galván", "Backend Developer", "AI Engineer", "Ingeniería Informática", "Google Cloud", "AWS", "TypeScript", "Next.js", "Inteligencia Artificial"],
  authors: [{ name: "José Galván de la Torre" }],
  openGraph: {
    title: "José Galván de la Torre | Backend Developer & AI Engineer",
    description: "Portfolio profesional de desarrollador backend especializado en sistemas a gran escala e inteligencia artificial",
    url: "https://josegalvan.dev",
    siteName: "José Galván de la Torre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "José Galván de la Torre | Backend Developer & AI Engineer",
    description: "Portfolio profesional de desarrollador backend especializado en sistemas a gran escala e inteligencia artificial",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // aquí detecto si estamos en pantalla de carga
  // asumo que la pantalla de carga se controla por una clase en el body o por un estado global
  // lo más fácil es que el componente de loading no renderice el botón
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          {/* el botón de idioma siempre está visible, menos cuando está cargando */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageSwitcher />
            {children}
            <Toaster/>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
