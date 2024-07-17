"use client";
import { Forum } from "next/font/google";
import "./globals.css";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import HeaderWrapper from "../../components/Headwrapper";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "@/components/SessionProvider";

const jetBrainsMono = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>EliteNest</title>{" "}
      <body className={jetBrainsMono.className}>
        <SessionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <HeaderWrapper />
              {children}
            </PersistGate>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
