
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase/config';
import { WishListData } from '@/models/WishListData';

export const getWishListForUser = async () => {
  const userAuth = auth.currentUser?.uid;
  if (!userAuth) {
    throw new Error('User ID tidak ditemukan. Silakan login terlebih dahulu.');
  }

  try {
    const wishLishsCollection = collection(db, 'wishlists');
    const q = query(wishLishsCollection, where('userId', '==', userAuth));
    const wishLishsSnapshot = await getDocs(q);
    const wishLishsData = wishLishsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as WishListData[];
    return wishLishsData;
  } catch (error) {
    console.error('Error fetching wishlist for user:', error);
    throw error;
  }
};

export const getCarsForWishList = async () => {
  try {
    const wishList = await getWishListForUser();

    const carIds = wishList.map((wish) => wish.carId);

    const carPromises = carIds.map(async (carId) => {
      const carDocRef = doc(db, 'cars', carId);
      const carSnapshot = await getDoc(carDocRef);
      if (carSnapshot.exists()) {
        return { id: carSnapshot.id, ...carSnapshot.data() };
      }
      return null;
    });

    // Tunggu semua data mobil selesai diambil
    const cars = await Promise.all(carPromises);

    // Kembalikan hanya mobil yang ditemukan (tidak null)
    return cars.filter((car) => car !== null);
  } catch (error) {
    console.error('Error fetching cars for wishlist:', error);
    throw error;
  }
};


export const isCarInWishlist = async (carId: string): Promise<boolean> => {
  const userAuth = auth.currentUser?.uid;
  if (!userAuth) return false;

  const q = query(collection(db, "wishlists"), where("userId", "==", userAuth), where("carId", "==", carId));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
};

export const addToWishlist = async (carId: string) => {
  const userAuth = auth.currentUser?.uid;
  if (!userAuth) {
    throw new Error("Silakan login terlebih dahulu");
  }

  await addDoc(collection(db, "wishlists"), { userId: userAuth, carId });
};

export const removeFromWishlist = async (carId: string) => {
  const userAuth = auth.currentUser?.uid;
  if (!userAuth) {
    throw new Error("Silakan login terlebih dahulu");
  }

  const q = query(collection(db, "wishlists"), where("userId", "==", userAuth), where("carId", "==", carId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "wishlists", docSnap.id));
  });
};
