import type { Metadata } from "next";
import { Forum } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "../../components/Header";
import HeaderWrapper from "../../components/Headwrapper";

const jetBrainsMono = Forum({
  subsets: ["latin"],
  weight: [ "400"],
  variable: "--font-Montserrat",
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
