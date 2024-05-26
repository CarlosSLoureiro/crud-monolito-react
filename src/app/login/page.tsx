"use client";

import PageProvider from "@client/providers/Page";
import LoginScreen from "@client/screens/Login";

export default function Page() {
  return (
    <PageProvider mustBeUnauthenticated>
      <LoginScreen />
    </PageProvider>
  );
}
