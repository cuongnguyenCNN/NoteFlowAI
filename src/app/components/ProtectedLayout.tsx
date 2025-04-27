// components/layouts/ProtectedLayout.tsx
"use client";
import useProtectPage from "@/src/hooks/useProtectPage";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { checkingAuth } = useProtectPage();

  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
