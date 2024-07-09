import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "../../components/Header";
import HeaderWrapper from "../../components/Headwrapper";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "400", "700"],
  variable: "--font-jetBrainsMono",
});

export const metadata: Metadata = {
  title: "EliteNest",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
