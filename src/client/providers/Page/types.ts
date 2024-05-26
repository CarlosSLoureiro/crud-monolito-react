import type { ReactNode } from "react";

export interface PageProviderProps {
  children: ReactNode;
  mustBeAuthenticated?: boolean;
  mustBeUnauthenticated?: boolean;
}
