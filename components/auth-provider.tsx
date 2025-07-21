"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

// Extend the session type to include our custom fields
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
