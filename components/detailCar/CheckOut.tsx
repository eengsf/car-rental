'use client';

import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCar } from '@/models/ProductCar';
import { auth } from '@/lib/firebase/config';
import { saveOrder } from '@/lib/useOrderController';
import { Rental } from '@/models/Rental';

function CheckOut({ cars }: { cars: ProductCar }) {
  const router = useRouter();
  const userAuth = auth.currentUser?.uid;
  const [days, setDays] = useState(1);
  const [withDriver, setWithDriver] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [minStartTime, setMinStartTime] = useState<string>('');
  const [now, setNow] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentTime = new Date();
    setNow(currentTime);
    setMinStartTime(formatDateTimeLocal(currentTime));
  }, []);

  const calculateEndTime = (start: string, days: number) => {
    const startDate = new Date(start);
    startDate.setDate(startDate.getDate() + days);
    return formatDateTimeLocal(startDate);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newStartTime = e.target.value;
    const selectedStartDate = new Date(newStartTime);

    if (
      selectedStartDate.getDate() === now.getDate() &&
      selectedStartDate.getHours() < now.getHours()
    ) {
      selectedStartDate.setDate(selectedStartDate.getDate() + 1);
      newStartTime = formatDateTimeLocal(selectedStartDate);
    }

    setStartTime(newStartTime);
    setEndTime(calculateEndTime(newStartTime, days));
  };

  const handleDaysChange = (type: string) => {
    if (type === 'plus') {
      const newDays = days + 1;
      setDays(newDays);
      if (startTime) {
        setEndTime(calculateEndTime(startTime, newDays));
      }
    } else if (type === 'minus' && days > 1) {
      const newDays = days - 1;
      setDays(newDays);
      if (startTime) {
        setEndTime(calculateEndTime(startTime, newDays));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!startTime || !endTime) {
      alert('Please select start and end time');
      return;
    }
    
    if (!userAuth) {
      alert('Please login first');
      router.push('/login');
      return;
    }
  
    setLoading(true);
  
    const rentalData = {
      days,
      totalPrice: withDriver ? cars.price * days * 1.5 : cars.price * days,
      startTime,
      endTime,
      withDriver,
      carId: cars.id,
      userId: userAuth,
    } as Partial<Rental>;
  
    try {
      const response = await saveOrder(rentalData as Rental);
      if (response?.success) {
        alert('Successfully ordered a car!');
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  
    // Reset form fields
    setDays(1);
    setStartTime('');
    setEndTime('');
    setWithDriver(false);
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full md:max-w-52 md:order-2 order-1"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-custom-dark">Price start from</p>
          <div className="flex justify-between items-center">
            <p className="text-custom-dark text-xl font-semibold">
              ${cars.price}
            </p>
            <div className="flex gap-1.5 items-center">
              <span
                onClick={() => handleDaysChange('minus')}
                className="cursor-pointer"
              >
                <IoIosArrowBack size={18} />
              </span>
              <p className="text-sm">{days} days</p>
              <span
                onClick={() => handleDaysChange('plus')}
                className="cursor-pointer"
              >
                <IoIosArrowForward size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:max-w-52">
          <div className="flex flex-col gap-1">
            <label htmlFor="start-time">Start Time</label>
            <input
              id="start-time"
              type="datetime-local"
              value={startTime}
              onChange={handleStartTimeChange}
              min={minStartTime}
              className='text-sm text-custom-medium'
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="end-time">End Time</label>
            <input
              id="end-time"
              type="datetime-local"
              value={endTime}
              disabled
              className='text-sm text-custom-medium'
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        onClick={() => setWithDriver(false)}
        className={`flex gap-3 items-center justify-between cursor-pointer bg-custom-semiStrong hover:bg-custom-medium py-2.5 px-5 rounded-lg ${
          loading ? 'opacity-50' : ''
        }`}
        disabled={loading}
      >
        <div className="text-start">
          <p className="text-xs text-custom-light">Rent Now</p>
          <p className="text-sm text-custom-light font-semibold">Self Drive</p>
        </div>
        <p className={`${loading ? 'text-xs' : 'text-base'} text-custom-light`}>
          {loading ? 'Processing...' : `$${cars.price * days}`}{' '}
        </p>
      </button>
      {cars.withDriver && (
        <button
          type="submit"
          onClick={() => setWithDriver(true)}
          className={`flex gap-3 items-center justify-between cursor-pointer ${
            loading ? 'opacity-50' : ''
          } bg-custom-semiStrong hover:bg-custom-medium py-2.5 px-5 rounded-lg`}
          disabled={loading}
        >
          <div className="text-start">
            <p className="text-xs text-custom-light">Rent Now</p>
            <p className="text-sm text-custom-light font-semibold">
              With Driver
            </p>
          </div>
          <p
            className={`${loading ? 'text-xs' : 'text-base'} text-custom-light`}
          >
            {loading ? 'Processing...' : `$${cars.price * 1.5 * days}`}{' '}
          </p>
        </button>
      )}
    </form>
  );
}

export default CheckOut;
