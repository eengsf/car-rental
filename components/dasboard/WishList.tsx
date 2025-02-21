"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { BsSnow2 } from 'react-icons/bs';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { getCarsForWishList } from '@/lib/useWishListController';
import { ProductCar } from '@/models/ProductCar';

function WishList() {
  const [cars, setCars] = useState<ProductCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productCars = (await getCarsForWishList()) as ProductCar[];
        setCars(productCars);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-80 flex flex-col p-1.5 pb-3 shadow-lg rounded-xl bg-custom-light justify-between animate-pulse"
          >
             <div className="h-1/2 w-full  rounded bg-gray-200"></div>
             <div className="h-6 w-3/4  rounded bg-gray-200"></div>
             <div className="h-6 w-1/2  rounded bg-gray-200"></div>
             <div className="h-6 w-1/2  rounded bg-gray-200"></div>
             <div className="h-6 w-full  rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {cars.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
          {cars.map((item: ProductCar, index) => (
            <div
              key={index}
              className="h-80 flex flex-col gap-3 p-1.5 pb-3 shadow-lg rounded-xl bg-custom-light"
            >
              <span className="flex justify-center items-center h-1/2 rounded-lg overflow-hidden cursor-pointer bg-custom-main3 relative">
                <Image
                  src={`${item.imageurl}`}
                  alt="image"
                  width={200}
                  height={200}
                  className="object-cover w-full rounded-lg "
                />
              </span>
              <div className="flex flex-col h-1/2 justify-between">
                <div className="w-full flex flex-col gap-3 px-1 ">
                  <div className="flex flex-col">
                    <span className="flex gap-1 items-center text-custom-main2 text-xs">
                      <FaStar size={14} className="text-yellow-500" /> 4.8 (5
                      reviews)
                    </span>
                    <span className="text-sm font-semibold text-custom-dark truncate cursor-pointer hover:text-custom-main1">
                      {item.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="flex gap-1 items-center text-xs text-custom-main2">
                      <FaUser size={14} className=" text-custom-main2" />{' '}
                      {item.seat} Seat
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-main2">
                      <BsSnow2 size={14} className=" text-custom-main2" />{' '}
                      {item.ac ? 'AC' : 'Non AC'}
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-main2">
                      <TbManualGearboxFilled
                        size={14}
                        className=" text-custom-main2"
                      />{' '}
                      {item.transmission}
                    </span>
                    <span className="flex gap-1 items-center text-xs text-custom-main2">
                      <BsFillFuelPumpFill
                        size={14}
                        className=" text-custom-main2"
                      />{' '}
                      {item.typefuel}
                    </span>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center px-1">
                  <h2 className="text-xs font-semibold text-custom-dark">
                    ${item.price}/day
                  </h2>
                  <span className="flex gap-1 items-center text-xs text-custom-dark cursor-pointer hover:text-custom-main1">
                    Rent Now <FaArrowRight size={14} className="" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full text-center text-custom-main2 text-lg border border-dashed border-custom-main2 rounded-lg p-10">
          Belum ada wishlist
        </div>
      )}
    </>
  );
}

export default WishList;

