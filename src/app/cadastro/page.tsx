"use client";

import PageProvider from "@client/providers/Page";
import SignUpScreen from "@client/screens/SignUp";

export default function Page() {
  return (
    <PageProvider mustBeUnauthenticated>
      <SignUpScreen />
    </PageProvider>
  );
}
