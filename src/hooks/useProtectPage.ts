// hooks/useProtectPage.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function useProtectPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["google-videobridge-auth-token"];

    if (!token) {
      router.push("/sign-in");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  return { checkingAuth };
}
