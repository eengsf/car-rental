import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();


  // Cek autentikasi pengguna
  const token = req.cookies.get('authToken')?.value; // Ambil token dari cookie
  const loginUrl = new URL('/login', req.url); // Redirect ke halaman login jika tidak ada token

  // Proteksi halaman di bawah /dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(loginUrl); // Redirect ke /login jika belum login
  }

  return res;
}

// Matcher untuk menentukan route mana yang membutuhkan middleware
export const config = {
  matcher: ['/dashboard/:path*'], // Middleware aktif di semua halaman /dashboard dan API
};
