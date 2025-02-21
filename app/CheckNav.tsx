'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CheckNavbar() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return <Navbar />;
}
