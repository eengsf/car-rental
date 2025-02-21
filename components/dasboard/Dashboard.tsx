'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoIosHeartEmpty } from 'react-icons/io';
import { CiViewList } from 'react-icons/ci';
import { HiOutlineUser } from 'react-icons/hi2';
import { PiChatText } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import Profile from './Profile';
// import Order from './Order';
// import WishList from './WishList';
// import Review from './Review';
// import Setting from './Setting';
import { UserData } from '@/models/UserData';
import Setting from './Setting';
import Review from './Review';
import Order from './Order';
import WishList from './WishList';

interface MenuButtonProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className={`flex gap-2 items-center hover:bg-blue-200 hover:text-custom-main1 py-2 px-3 rounded-lg whitespace-nowrap cursor-pointer ${
        isActive ? 'bg-blue-200 text-custom-main1' : ''
      }`}
    >
      <Icon size={20} />
      {label}
    </span>
  );
};

function Dashboard({ user }: { user: UserData }) {
  const [buttonText, setButtonText] = useState<string>('Profile');
  const buttons = [
    { label: 'Profile', icon: HiOutlineUser },
    { label: 'Order History', icon: CiViewList },
    { label: 'Wish List', icon: IoIosHeartEmpty },
    { label: 'Review', icon: PiChatText },
    { label: 'Setting', icon: IoSettingsOutline },
  ];
  const userUpper = user.name?.charAt(0).toUpperCase();
  const name = user.name?.slice(1);

  return (
    <div className="flex lg:flex-row flex-col lg:gap-5 gap-3 lg:px-16 md:p-10 p-3 w-full h-full ">
      <section className="w-full lg:max-w-72 flex flex-col bg-custom-light shadow-lg  rounded-lg lg:divide-y divide-custom-dark">
        <div className="lg:flex gap-2 items-center p-5 hidden">
          <Image
            src={`${user.profilePhotoUrl ? user.profilePhotoUrl : '/user.png'}`}
            alt="profile"
            width={37}
            height={37}
            priority
            className="rounded-full "
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-custom-dark">
              {userUpper}
              {name}
            </h2>
            <p className="text-xs text-custom-main2">{user.email}</p>
          </div>
        </div>
        <div className="flex lg:flex-col flex-row gap-3 p-4 overflow-x-auto">
          {buttons.map((button) => (
            <MenuButton
              key={button.label}
              icon={button.icon}
              label={button.label}
              isActive={buttonText === button.label}
              onClick={() => setButtonText(button.label)}
            />
          ))}
        </div>
      </section>
    
      <main className="w-full h-full min-h-[490px] flex flex-col gap-5 bg-custom-light shadow-lg rounded-lg p-5">
        <h2 className="text-lg font-semibold">{buttonText}</h2>
        {buttonText === 'Profile' ? <Profile data={user} /> : buttonText === 'Setting' ? <Setting /> : buttonText === 'Review' ? <Review /> : buttonText === 'Wish List' ? <WishList /> : buttonText === 'Order History' ? <Order />  : null}
      </main>
    </div>
  );
}

export default Dashboard;
