import { type ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import GlobalProvider from "@client/providers/Global";
import ThemeProvider from "@client/providers/Theme";
import WindowProvider from "@client/providers/Window";

import "./globals.css";

// eslint-disable-next-line quotes
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Create Next App`,
  description: `Generated by create next app`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WindowProvider>
          <ThemeProvider>
            <GlobalProvider>{children}</GlobalProvider>
          </ThemeProvider>
        </WindowProvider>
      </body>
    </html>
  );
}
