"use client";

import GlobalProvider from "@client/providers/Global";
import LoginScreen from "@client/screens/Login";

export default function Page() {
  return (
    <GlobalProvider>
      <LoginScreen />
    </GlobalProvider>
  );
}
