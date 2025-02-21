'use client';

import { IoMdHeart } from 'react-icons/io';
import { FaArrowRight, FaStar, FaUser } from 'react-icons/fa';
import { BsFillFuelPumpFill, BsSnow2 } from 'react-icons/bs';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { useCarsController } from '@/lib/useCarsController';
import Image from 'next/image';

function CarList() {
  const router = useRouter();
  const { cars, loading, fetchMoreCars } = useCarsController();

  const handleDetailCar = (id: string) => {
    router.push(`/car/${id}`);
  };

  if (!cars.length) {
    return (
      <div id='carslist' className="w-full bg-custom-light scroll-mt-4">
        <div className="container mx-auto h-full flex flex-col gap-5 lg:px-10 px-5 py-8 md:py-20  scroll-mt-20">
          <div className="flex flex-col">
            <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
              Most popular cars rental deals
            </h2>
            <p className="text-custom-medium text-center xs:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
              nisi.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-80 flex flex-col p-1.5 shadow-lg rounded-xl bg-custom-light animate-pulse gap-3"
              >
                <div className="w-full h-32 rounded-md bg-gray-200"></div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-4  rounded bg-gray-200"></div>
                  <div className="h-4  rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="space-y-3 ">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-4 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-4 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="carslist" className="w-full bg-custom-light scroll-mt-4">
      <div className="container mx-auto h-full flex flex-col gap-5 lg:px-10 px-5 py-8 md:py-20  scroll-mt-20">
        <div className="flex flex-col">
          <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
            Most popular cars rental deals
          </h2>
          <p className="text-custom-medium text-center xs:text-base text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
            nisi.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
          {cars.map((item, index) => (
            <div
              key={index}
              className="h-80 flex flex-col gap-3 p-1.5 pb-3 shadow-lg rounded-xl bg-custom-light border border-custom-medium"
            >
              <span className="flex justify-center items-center h-1/2 rounded-lg overflow-hidden bg-custom-thin relative">
                <Image
                  src={`${item.imageurl}`}
                  alt={`${item.name}`}
                  width={200}
                  height={200}
                  unoptimized
                  className="object-cover w-full rounded-lg "
                />
                <button onClick={() => handleDetailCar(item.id)} className="p-1 rounded-full border border-custom-medium absolute right-1 top-1">
                  <IoMdHeart size={16} className="text-custom-medium" />
                </button>
              </span>
              <div className="flex flex-col h-1/2 justify-between">
                <div className="w-full flex flex-col gap-3 px-1 ">
                  <div className="flex flex-col">
                    <span className="flex gap-1 items-center text-custom-dark text-xs">
                      <FaStar size={14} className="text-yellow-500" /> 4.8 (5
                      reviews)
                    </span>
                    <span
                      onClick={() => handleDetailCar(item.id)}
                      className="text-sm font-semibold text-custom-dark truncate cursor-pointer hover:text-custom-medium"
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="flex gap-1 items-center text-xs text-custom-dark">
                      <FaUser size={14} className=" text-custom-dark" />{' '}
                      {item.seat} Seat
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-dark">
                      <BsSnow2 size={14} className=" text-custom-dark" />{' '}
                      {item.ac ? 'AC' : 'Non AC'}
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-dark">
                      <TbManualGearboxFilled
                        size={14}
                        className=" text-custom-dark"
                      />{' '}
                      {item.transmission}
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-dark">
                      <BsFillFuelPumpFill
                        size={14}
                        className=" text-custom-dark"
                      />{' '}
                      {item.typefuel}
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center px-1">
                  <h2 className="text-xs font-semibold text-custom-dark">
                    ${item.price}/day
                  </h2>
                  <span
                    onClick={() => handleDetailCar(item.id)}
                    className="flex gap-1 items-center text-xs text-custom-dark cursor-pointer hover:text-custom-medium"
                  >
                    Rent Now <FaArrowRight size={14} className="" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            disabled={loading}
            onClick={fetchMoreCars}
            className="px-20 py-3 rounded-xl bg-custom-semiStrong text-custom-light hover:bg-custom-medium"
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarList;
