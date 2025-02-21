import { UserData } from '@/models/UserData';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db, storage } from './firebase/config';

//promise ini karena kita  menunggu dulu (apakah user ada atau tidak) hingga document selesai diambil, sebelum mengembalikan hasilnya
export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userDocRef = doc(db, 'users', uid);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.error('User data not found in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data from Firestore:', error);
    return null;
  }
};


//<<Partial>> mengubah semua properti dalam tipe UserData menjadi opsional (optional)
//jadi jika hanya mengubah nama saja atau yg lainya saja jadi gpp
export const updateUserData = async (
  uid: string,
  updatedData: Partial<UserData>
) => {
  const userDocRef = doc(db, 'users', uid);
  try {
    await updateDoc(userDocRef, updatedData);
    console.log('User data updated successfully in Firestore.');
  } catch (error) {
    console.error('Error updating user data in Firestore:', error);
    throw new Error('Failed to update user data');
  }
};

export const deleteUserData = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);
  try {
    await deleteDoc(userDocRef);
    console.log('User data deleted successfully from Firestore.');
  } catch (error) {
    console.error('Error deleting user data from Firestore:', error);
  }
};

export const uploadImage = async (file: File, uid: string): Promise<string> => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error('User does not exist.');
  }

  const userData = userDocSnap.data() as UserData;
  const oldImageUrl = userData.profilePhotoUrl;

  if (oldImageUrl) {
    try {
      const oldImageRef = ref(storage, oldImageUrl);
      await deleteObject(oldImageRef);
      console.log('Old profile image deleted successfully.');
    } catch (error) {
      console.error('Error deleting old profile image:', error);
    }
  }

  const storageRef = ref(storage, `images/${uid}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error uploading file:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
