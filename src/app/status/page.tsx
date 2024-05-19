"use client";

import GlobalProvider from "@client/providers/Global";
import StatusScreen from "@client/screens/Status";

export default function Page() {
  return (
    <GlobalProvider>
      <StatusScreen />
    </GlobalProvider>
  );
}
