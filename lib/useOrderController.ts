import {
  collection,
  query,
  getDocs,
  where,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { Rental } from '@/models/Rental';
import { auth, db } from './firebase/config';
import { ProductCar } from '@/models/ProductCar';

export const getRentals = async (): Promise<Rental[]> => {
  const user = auth.currentUser;
  try {
    const rentalsCollection = collection(db, 'rental');
    const q = query(rentalsCollection, where('userId', '==', user?.uid));

    const rentalsSnapshot = await getDocs(q);
    const rentalsData = rentalsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Rental[];
    return rentalsData;
  } catch (error) {
    console.error('Error fetching rentals:', error);
    throw error;
  }
};

export const getCarsForRentals = async (
  carIds: string[]
): Promise<ProductCar[]> => {
  try {
    if (carIds.length === 0) return [];
    const carsCollection = collection(db, 'cars');
    const q = query(carsCollection, where('id', 'in', carIds));

    const carsSnapshot = await getDocs(q);
    const carsData = carsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductCar[];
    return carsData;
  } catch (error) {
    console.error('Error fetching cars for rentals:', error);
    throw error;
  }
};
export const saveOrder = async (rental: Rental) => {
  try {
    const { days, startTime, endTime, withDriver, carId, userId, totalPrice } = rental;

    if (!days || !startTime || !endTime || carId === undefined || userId === undefined || totalPrice === undefined) {
      throw new Error('Missing required fields');
    }

    const dbRef = doc(collection(db, 'rental'));
    const docRef = {
      id: dbRef.id,
      days,
      startTime,
      endTime,
      withDriver,
      carId,
      userId,
      totalPrice,
      createdAt: Timestamp.fromDate(new Date()),
    };
    
    await setDoc(dbRef, docRef);
    return { success: true, id: dbRef.id };
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

