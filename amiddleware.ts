// // import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export default async function middleware(req: NextRequest) {
//   const sessionToken = req.cookies.get("next-auth.session-token")?.value;

//   // Jika tidak ada sesi, redirect ke login
//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // Verifikasi token NextAuth untuk mendapatkan data pengguna
//     const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
//     const { payload } = await jwtVerify(sessionToken, secret);

//     // Cek apakah token Firebase masih ada
//     if (!payload.token) {
//       console.error("Token Firebase tidak ditemukan di sesi");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // Token Firebase valid, lanjutkan request
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Sesi atau token Firebase tidak valid:", error);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// // Tentukan halaman yang dilindungi middleware
// export const config = { matcher: ["/dashboard"] };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export async function middleware(req: NextRequest) {
  const authToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  
  if (!authToken) return NextResponse.redirect(new URL("/login", req.url));

  try {
    // Verifikasi token
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!);

    // Cek apakah sesi masih valid di Firestore
    const sessionRef = doc(db, "users", decoded.id);
    const sessionSnap = await getDoc(sessionRef);

    if (!sessionSnap.exists() || sessionSnap.data()?.token !== authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/dashboard/:path*"] };
