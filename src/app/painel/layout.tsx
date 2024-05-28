import { type ReactNode } from "react";

import type { Metadata } from "next";

import PageProvider from "@client/providers/Page";
import PainelProvider from "@client/providers/Painel";

// eslint-disable-next-line quotes
export const metadata: Metadata = {
  title: `Painel`,
  description: `Generated by create next app`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <PageProvider mustBeAuthenticated>
      <PainelProvider>{children}</PainelProvider>
    </PageProvider>
  );
}