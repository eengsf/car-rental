// import { ProductCar } from '@/model/ProductCar';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { BsSnow2 } from 'react-icons/bs';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { ProductCar } from '@/models/ProductCar';
import CheckOut from './CheckOut';
import { IoMdHeart } from 'react-icons/io';
import { useEffect, useState } from 'react';
import {
  addToWishlist,
  getWishListForUser,
  removeFromWishlist,
} from '@/lib/useWishListController';
// import CheckOut from './CheckOut';

function DetailCarView({ cars }: { cars: ProductCar }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishListData = await getWishListForUser();
        const carIds = wishListData.map((wish) => wish.carId);
        setWishlist(carIds);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (carId: string) => {
    try {
      if (wishlist.includes(carId)) {
        await removeFromWishlist(carId);
        setWishlist((prev) => prev.filter((id) => id !== carId));
      } else {
        await addToWishlist(carId);
        setWishlist((prev) => [...prev, carId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };
  return (
    <div className="w-full ">
      <div className="container mx-auto flex lg:flex-row flex-col lg:pt-10 sm:pt-5 pb-10 p-0 ">
        <div className="flex lg:flex-row flex-col  lg:gap-5 gap-3 lg:p-10 p-5 w-full h-full shadow-md rounded-lg bg-custom-light">
          <div className="flex md:flex-row flex-col md:gap-5 gap-10 lg:w-[60%] w-full lg:order-1 order-2">
            <div className="flex flex-col flex-1 md:gap-5 gap-3 md:order-1 order-2">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-custom-dark">
                  {cars.yearProduction}
                  <button
                    onClick={() => toggleWishlist(cars.id)}
                    className='border border-custom-medium rounded-full p-1.5 hover:animate-pulse'
                  >
                    <IoMdHeart size={20} className={` transition-all ${
                      wishlist.includes(cars.id)
                        ? 'text-custom-medium'
                        : 'text-custom-semiThin'
                    }`} />
                  </button>
                </div>
                <h2 className="text-3xl font-semibold text-custom-dark">
                  {cars.name}
                </h2>
                <span className="flex gap-1 items-center">
                  <FaHeart size={24} className="text-custom-medium" />
                  <FaHeart size={24} className="text-custom-medium" />
                  <FaHeart size={24} className="text-custom-medium" />
                  <FaHeart size={24} className="text-custom-medium" />
                  <FaHeart size={24} className="text-custom-medium" />
                  <p className="ms-2 text-sm">4.8 (5 reviews)</p>
                </span>
              </div>
              <p className="text-custom-dark">{cars.description}</p>
              <div className="grid grid-cols-4 border border-custom-medium divide-x divide-custom-medium mt-5 rounded-md">
                <span className="flex gap-2 items-center justify-center p-2">
                  <FaUser
                    size={16}
                    className="xl:block lg:hidden xs:block hidden"
                  />{' '}
                  <p className="whitespace-nowrap">{cars.seat} Seat</p>
                </span>
                <span className="flex gap-2 items-center justify-center p-2">
                  <BsSnow2
                    size={16}
                    className="xl:block lg:hidden xs:block hidden"
                  />{' '}
                  <p className={`${cars.ac ? '' : 'line-through'}`}>Aircon</p>
                </span>
                <span className="flex gap-2 items-center justify-center p-2">
                  <TbManualGearboxFilled
                    size={16}
                    className="xl:block lg:hidden xs:block hidden"
                  />{' '}
                  {cars.transmission}
                </span>
                <span className="flex gap-2 items-center justify-center p-2">
                  <BsFillFuelPumpFill
                    size={16}
                    className="xl:block lg:hidden xs:block hidden"
                  />{' '}
                  {cars.typefuel}
                </span>
              </div>
            </div>
            <CheckOut cars={cars} />
          </div>
          <div className="lg:w-[40%] md:w-[50%] w-[70%] lg:order-2 order-1 mx-auto">
            <Image
              src={cars.imageurl || '/not-image.jpg'}
              alt="car"
              width={800}
              height={400}
              priority
              className="object-cover w-full h-2/3 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCarView;
