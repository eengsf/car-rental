// 'use client';

// import { useAuth } from '@/app/context/AuthContext';
// import { logout } from '@/lib/firebase/auth';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { MdLogout } from 'react-icons/md';

// const listnav = [
//   {
//     name: 'How it work?',
//     link: '#step',
//   },
//   {
//     name: 'Why choose us',
//     link: '#chooseus',
//   },
//   {
//     name: 'Rental deals',
//     link: '#listcar',
//   },
//   {
//     name: 'Testimonials',
//     link: '#testimonials',
//   },
// ];

// function Navbar() {
//   const { user, userData } = useAuth();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   const handleProfileClick = () => {
//     setIsLoading(true); // Aktifkan loading
//     router.push('/dashboard');
//   };

//   return (
//     <nav className="w-full bg-white bg-opacity-10 backdrop-blur-lg sticky top-0 z-50">
//       <div className="flex container mx-auto items-center justify-between py-4 lg:px-10 px-5">
//         <Link href={'/'} className="flex items-center gap-2">
//           <Image src="/logo.svg" alt="logo" width={32} height={32} />
//           <h2 className="text-xl font-semibold text-custom-dark">Carentall</h2>
//         </Link>

//         <ul className="md:flex hidden gap-3 text-sm items-center">
//           {listnav.map((list, index) => (
//             <li key={index}>
//               <Link href={list.link}>{list.name}</Link>
//             </li>
//           ))}
//         </ul>

//         {user ? (
//           <div className="flex gap-2 items-center">
//             <div className="flex flex-col text-end">
//               <h2 className="text-xs text-custom-dark">{userData?.name}</h2>
//               <p className="text-xs text-custom-medium">{userData?.email}</p>
//             </div>

//             <button
//               onClick={handleProfileClick}
//               className="flex justify-center items-center rounded-full border border-custom-medium w-10 h-10 cursor-pointer relative"
//               disabled={isLoading} // Matikan tombol saat loading
//             >
//               <Image
//                 src={userData?.profilePhotoUrl || '/user.png'}
//                 alt="user"
//                 width={32}
//                 height={32}
//                 className="object-cover rounded-full"
//               />
//               {isLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full">
//                   <div className="w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
//                 </div>
//               )}
//             </button>

//             <button
//               onClick={handleLogout}
//               className="flex justify-center items-center bg-custom-medium rounded-full w-10 h-10"
//             >
//               <MdLogout size={20} className="text-custom-light" />
//             </button>
//           </div>
//         ) : (
//           <div className="md:flex hidden gap-2 items-center">
//             <button className="w-20 h-9 text-xs text-custom-dark rounded-xl border border-custom-semiStrong">
//               Login
//             </button>
//             <button className="w-20 h-9 text-xs text-custom-light rounded-xl bg-custom-semiStrong">
//               Register
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

'use client';

import { monitorAuthState } from '@/lib/authController';
import { logout } from '@/lib/firebase/auth';
import { UserData } from '@/models/UserData';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';

const listnav = [
  { name: 'How it works?', link: '#step' },
  { name: 'Why choose us', link: '#chooseus' },
  { name: 'Rental deals', link: '#carslist' },
  { name: 'Testimonials', link: '#testimonials' },
];

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const pathname = usePathname();

  const handleUserFound = (userData: UserData) => {
    setUser(userData);
  };
  const handleUserNotFound = () => {
    setUser(null);
  };
  useEffect(() => {
    const unsubscribe = monitorAuthState(handleUserFound, handleUserNotFound);
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="w-full bg-white bg-opacity-10 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex container mx-auto items-center justify-between py-4 lg:px-10 px-5">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h2 className="text-xl font-semibold text-custom-dark">Carentall</h2>
        </Link>

        {pathname === '/dashboard' ? (
          <div>
            <h2 className="font-bold">Profile {user?.name}</h2>
          </div>
        ) : (
          <ul className="md:flex hidden gap-3 text-sm items-center">
            {listnav.map((list, index) => (
              <li key={index}>
                <Link href={list.link}>{list.name}</Link>
              </li>
            ))}
          </ul>
        )}

        {user ? (
          <div className="flex gap-2 items-center">
            <div className="flex flex-col text-end">
              <h2 className="text-xs text-custom-dark">{user.name}</h2>
              <p className="text-xs text-custom-medium">{user.email}</p>
            </div>
            <button
              onClick={handleProfileClick}
              className="flex justify-center items-center rounded-full border border-custom-medium w-10 h-10 cursor-pointer relative"
            >
              <Image
                src={user.profilePhotoUrl || '/user.png'}
                alt="user"
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            </button>
            <button
              onClick={handleLogout}
              className="flex justify-center items-center bg-custom-medium rounded-full w-10 h-10"
            >
              <MdLogout size={20} className="text-custom-light" />
            </button>
          </div>
        ) : (
          <div className="md:flex hidden gap-2 items-center">
            <button
              onClick={() => router.push('/login')}
              className="w-20 h-9 text-xs text-custom-dark rounded-xl border border-custom-semiStrong"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="w-20 h-9 text-xs text-custom-light rounded-xl bg-custom-semiStrong"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
