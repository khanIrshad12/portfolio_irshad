import type { Metadata } from "next";
import { Archivo_Black, Lexend_Mega, Orbitron, Share_Tech_Mono } from "next/font/google";
import { getPortfolioData, themeToCssVars } from "@/lib/portfolio";
import { themeInitScript } from "@/lib/theme-script";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend-mega",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: data.seo.title,
    description: data.seo.description,
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      title: data.seo.title,
      description: data.seo.description,
      siteName: data.profile.name,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${data.profile.name} — ${data.profile.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();
  const themeVars = themeToCssVars(data.theme);

  return (
    <html lang="en" style={themeVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${archivoBlack.variable} ${lexendMega.variable} ${orbitron.variable} ${shareTech.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
