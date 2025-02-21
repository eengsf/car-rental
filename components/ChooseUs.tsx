import Image from 'next/image';
import { IoIosWallet } from 'react-icons/io';
import { HiMiniChatBubbleLeftRight } from 'react-icons/hi2';
import { PiSteeringWheelFill } from 'react-icons/pi';
import { FaUserClock } from 'react-icons/fa';

const choose = [
  {
    icon: <IoIosWallet size={24} className="text-custom-main1 " />,
    title: 'Best Price Guarantee',
    desc: 'Find a lower price? We will refund you 100% of the difference',
  },
  {
    icon: <PiSteeringWheelFill size={24} className="text-custom-main1 " />,
    title: 'Experience driver',
    desc: 'Dont have a driver? Dont worry, we have many experienced driver for you',
  },
  {
    icon: <FaUserClock size={24} className="text-custom-main1 " />,
    title: '24-hour car delivery',
    desc: 'Book your car anytime and we will deliver it directly to you',
  },
  {
    icon: <HiMiniChatBubbleLeftRight size={24} className="text-custom-main1 " />,
    title: '24/7 technical support',
    desc: 'Have a question? Contact Carentall support anytime when you have problem',
  },
];

function ChooseUs() {
  return (
    <div id='chooseus' className="w-full bg-custom-thin scroll-mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-center justify-evenly gap-16 lg:px-10 px-5 py-8 md:py-20 lg:h-screen h-full scroll-mt-20">
        <div className="md:w-[35%] w-[80%]">
          <Image
            src="/choose2.jpg"
            alt="choose-us"
            width={500}
            height={500}
            priority
            className="w-full object-cover scale-x-[-1]"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm text-custom-dark">WHY CHOOSE US</h2>
            <h2 className="lg:text-3xl text-2xl font-bold text-custom-dark">
              We offer the best experience with our rental deals
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {choose.map((choose, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-custom-medium shadow-lg flex justify-center items-center">
                  {choose.icon}
                </div>
                <div className="flex flex-1 flex-col">
                  <h2 className="lg:text-base text-sm font-bold text-custom-dark">
                    {choose.title}
                  </h2>
                  <p className="lg:text-sm text-xs text-custom-main2">
                    {choose.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
