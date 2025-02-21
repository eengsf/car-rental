'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function CheckFooter() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return <Footer />;
}
