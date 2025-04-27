// src/hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies, destroyCookie } from "nookies";

export default function useAuth() {
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    picture: string;
  }>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["google-videobridge-auth-token"];

    if (!token) {
      router.push("/sign-in");
      return;
    }

    // Load thêm info từ localStorage (chỉ lưu những cái không nhạy cảm)
    const name = localStorage.getItem("user_name_info");
    const email = localStorage.getItem("user_email_info");
    const picture = localStorage.getItem("user_picture_info");

    if (name && email && picture) {
      setUser({ name, email, picture });
    }
  }, []);

  const logout = () => {
    destroyCookie(null, "google-videobridge-auth-token");
    localStorage.removeItem("user_name_info");
    localStorage.removeItem("user_email_info");
    localStorage.removeItem("user_picture_info");
    localStorage.removeItem("token_user");
    router.push("/login");
  };

  return { user, logout };
}
