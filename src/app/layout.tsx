"use client";
import { Forum } from "next/font/google";
import "./globals.css";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import HeaderWrapper from "../../components/Headwrapper";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HeaderWrapper />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
