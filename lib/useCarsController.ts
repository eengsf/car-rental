/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect, useState } from 'react';
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';
import { ProductCar } from '@/models/ProductCar';
import { db } from './firebase/config';

export const useCarsController = () => {
  const [cars, setCars] = useState<ProductCar[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const carCollection = collection(db, 'cars');
      const q = query(carCollection, limit(5));

      const snapshot = await getDocs(q);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const newCars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductCar[];

      setCars(newCars);

      if (snapshot.docs.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreCars = async () => {
    if (!lastVisible || !hasMore) return;

    setLoading(true);
    try {
      const carCollection = collection(db, 'cars');
      const q = query(carCollection, startAfter(lastVisible), limit(5));

      const snapshot = await getDocs(q);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const moreCars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductCar[];

      setCars((prevCars) => [...prevCars, ...moreCars]);

      if (snapshot.docs.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more cars:', error);
    } finally {
      setLoading(false);
    }
  };

  

  return {
    cars,
    loading,
    fetchMoreCars,
   
  };
};