"use client";

import PageProvider from "@client/providers/Page";
import StatusScreen from "@client/screens/Status";

export default function Page() {
  return (
    <PageProvider mustBeAuthenticated>
      <StatusScreen isWithAuthMiddleware />
    </PageProvider>
  );
}
