"use client";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import HeaderWrapper from "../../components/Headwrapper";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "@/components/SessionProvider";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-Manrope",
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
