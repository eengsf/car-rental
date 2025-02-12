"use client";

import { logout } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  return (
    <div>
      <p>dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
