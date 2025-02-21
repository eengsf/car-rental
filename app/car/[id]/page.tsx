/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import DetailCar from '@/components/detailCar/DetailCar';
import { useParams } from 'next/navigation';

import { ProductCar } from '@/models/ProductCar';

function Page() {
  const params = useParams();
  const [carData, setCarData] = useState<ProductCar | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCarData() {
      try {
        const carId =
          typeof params?.id === 'string' ? params.id : params?.id?.[0];
        if (!carId) {
          setError('Invalid Car ID');
          return;
        }

        const carDoc = doc(db, 'cars', carId);
        const carSnapshot = await getDoc(carDoc);

        if (!carSnapshot.exists()) {
          setError('Car not found');
          return;
        }

        const { createdAt, ...filteredCarData } = carSnapshot.data();
        setCarData(filteredCarData as ProductCar);
      } catch (err) {
        console.error('Error fetching car data:', err);
        setError('Failed to load car data');
      }
    }

    fetchCarData();
  }, [params]);

  if (error) return <div>{error}</div>;
  if (!carData)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-custom-semiThin border-t-custom-medium rounded-full animate-spin"></div>
      </div>
      
    );

  return <DetailCar cars={carData} />;
}

export default Page;
