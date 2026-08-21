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
  return {
    title: data.seo.title,
    description: data.seo.description,
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
