/* eslint-disable @typescript-eslint/no-explicit-any */

import { deleteCookie, setCookie } from 'cookies-next';
import { auth, googleProvider } from './config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during Email login:', error);
    throw error;
  }
};


export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    const token = await result.user.getIdToken();
    setCookie("authToken", token, { maxAge: 60 * 60 * 24 }); 

    const user = result.user;
    if (user) {
      console.log("User berhasil login:", user);
      return user;
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode," and ", errorMessage);
    
  }
};



export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try{
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during Email registration:', error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    deleteCookie("authToken");
    console.log("User berhasil logout.");
    alert("Anda telah berhasil logout.");
  } catch (error: any) {
    console.error("Error saat logout:", error);
    alert("Terjadi kesalahan saat logout. Silakan coba lagi nanti.");
  }
};
