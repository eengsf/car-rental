/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

export const getCars = async (lastVisible: any) => {
  try {
    let q;
    if (lastVisible) {
      q = query(
        collection(db, "cars"),
        orderBy("createdAt", "desc"), 
        startAfter(lastVisible), 
        limit(5) 
      );
    } else {
      q = query(
        collection(db, "cars"),
        orderBy("createdAt", "desc"),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(q);
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      cars,
      lastVisible: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { cars: [], lastVisible: null };
  }
};
