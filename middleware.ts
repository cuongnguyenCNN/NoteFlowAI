import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các URL cần bảo vệ
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  debugger;
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      // Nếu không có token => redirect đến trang /signin
      const signInUrl = new URL("/signin", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Nếu có token hoặc không phải route cần bảo vệ => cho phép tiếp tục
  return NextResponse.next();
}

// Chỉ chạy middleware cho các route sau
export const config = {
  matcher: ["/dashboard", "/profile", "/settings"],
};
