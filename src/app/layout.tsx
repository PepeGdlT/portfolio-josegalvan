import type { Metadata, Viewport } from "next";
import I18nProvider from "@/components/I18nProvider";
import "./globals.css";
import "./portfolio.css";

const siteUrl = "https://josegalvan.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "José Galván | Software Engineering, AI & Machine Learning",
    template: "%s | José Galván",
  },
  description:
    "José Galván — software developer at Clínica EGOS. React, TypeScript and AWS, ATP tennis prediction, and co-authored research on evolutionary ensembles at the University of Murcia.",
  keywords: [
    "José Galván",
    "Software Engineer",
    "Backend Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Engineering",
    "University of Murcia",
  ],
  authors: [{ name: "José Galván de la Torre", url: siteUrl }],
  creator: "José Galván de la Torre",
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: siteUrl,
    siteName: "José Galván",
    title: "José Galván | Software Engineering, AI & Machine Learning",
    description:
      "Software developer at Clínica EGOS. Explore my work with React, AWS, tennis prediction and evolutionary machine learning.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "José Galván portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Galván | Software Engineering, AI & Machine Learning",
    description:
      "Software developer at Clínica EGOS. React, AWS, tennis prediction and evolutionary machine learning.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07111f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
