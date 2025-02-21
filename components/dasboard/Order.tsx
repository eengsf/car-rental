'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Rental } from '@/models/Rental';
import { ProductCar } from '@/models/ProductCar';
import { getCarsForRentals, getRentals } from '@/lib/useOrderController';

function Order() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [cars, setCars] = useState<ProductCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedRentals = await getRentals();

        const carIds = fetchedRentals.map((rental) => rental.carId);
        const fetchedCars = await getCarsForRentals(carIds);

        setCars(fetchedCars);
        setRentals(fetchedRentals);
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
      <div className="flex flex-col w-full gap-2 border rounded-lg animate-pulse">
        <div className="flex gap-2 pt-2 px-2">
          <div className="w-20 h-20 flex justify-center items-center rounded-md">
            <div className="w-full h-full rounded-md bg-gray-200"></div>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-1">
              <div className="h-3 w-full rounded bg-gray-200"></div>
              <div className="w-1/6 h-3 rounded bg-gray-200"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-24 rounded bg-gray-200"></div>
              <div className="flex justify-between text-sm">
                <div className="h-3 w-24 rounded bg-gray-200"></div>
                <div className="h-3 w-1/3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 flex justify-end text-sm font-semibold">
          <div className="h-3 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {rentals.length > 0 ? (
        <div className="border flex flex-col w-full">
          {rentals.map((item: Rental, index) => {
            const car = cars.find((car) => car.id === item.carId);
            const drive = item.withDriver ? 'With Driver' : 'Self Drive';
            const startTime = item.startTime.toString().replace('T', '/');
            const endTime = item.endTime.toString().replace('T', '/');

            return (
              <div
                key={index}
                className="flex flex-col w-full bg-custom-light gap-2 divide-y"
              >
                <div className="flex gap-2 pt-2 px-2">
                  <div className="w-20 h-20 border flex justify-center items-center p-2 rounded-md">
                    <Image
                      src={`${car?.imageurl}`}
                      alt="order"
                      width={500}
                      height={500}
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">{car?.name}</h2>
                      <p className="text-xs text-custom-main2">
                        {car?.yearProduction}
                      </p>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-3 justify-between text-sm">
                      <p className="text-custom-main2">
                        {drive} ({item.days} days)
                      </p>
                      <p className="">
                        {startTime} - {endTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-end text-sm font-semibold">
                  <p>Total Price: ${item.totalPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full text-center text-custom-main2 text-lg border border-dashed border-custom-main2 rounded-lg p-10">
          Belum ada order history
        </div>
      )}
    </>
  );
}

export default Order;
