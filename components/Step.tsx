import React from 'react';
import {
  SiNissan,
  SiFord,
  SiMercedes,
  SiBmw,
  SiVolkswagen,
  SiAudi,
  SiMazda,
} from 'react-icons/si';
import { FaLocationDot } from 'react-icons/fa6';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiSolidBookReader } from 'react-icons/bi';

const logos = [
  <SiNissan key="nissan" />,
  <SiFord key="ford" />,
  <SiMercedes key="mercedes" />,
  <SiBmw key="bmw" />,
  <SiVolkswagen key="volkswagen" />,
  <SiAudi key="audi" />,
  <SiMazda key="mazda" />,
];

const steprules = [
  {
    name: 'Choose location',
    desc: 'Choose your location and find your best car',
    icon: <FaLocationDot color="white" size={40} />,
  },
  {
    name: 'Pick up date',
    desc: 'Select your pick up date and time to book your car',
    icon: <BsCalendar2Date color="white" size={40} />,
  },
  {
    name: 'Book your car',
    desc: 'Book your car and we will deliver it to you',
    icon: <BiSolidBookReader color="white" size={40} />,
  },
];

function Step() {
  return (
    <div id='step' className="w-full bg-custom-light scroll-mt-20">
      <div className="container mx-auto h-full flex flex-col gap-10 justify-evenly items-center lg:px-10 px-5 py-8 md:py-20">
        <div className="w-full flex justify-between  gap-3">
          {logos.map((logo) => (
            <div key={logo.key} className="md:text-5xl text-3xl">
              {logo}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-custom-medium font-bold">HOW IT WORK</p>
          <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
            Rent with following 3 working steps
          </h2>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-evenly w-full max-w-5xl gap-3">
          {steprules.map((steprule, index) => (
            <div key={index} className="w-64 flex flex-col items-center gap-2">
              <div className="sm:w-24 sm:h-24 w-20 h-20 flex justify-center items-center rounded-xl shadow-xl bg-custom-medium">
                {steprule.icon}
              </div>
              <h2 className="sm:text-xl text-sm text-center font-bold text-custom-dark">
                {steprule.name}
              </h2>
              <p className=" text-custom-medium text-center sm:text-sm text-xs">
                {steprule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
     </div>
  );
}

export default Step;
