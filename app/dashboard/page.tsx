"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserData } from "@/models/UserData";
import { auth } from "@/lib/firebase/config";
import { getUserData } from "@/lib/userController";
import Dashboard from "@/components/dasboard/Dashboard";
import { monitorAuthState } from "@/lib/authController";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  const handleUserFound = (userData: UserData) => {
    setUser(userData);
  };
  const handleUserNotFound = () => {
    setUser(null);
    router.push("/register");
  };
  useEffect(() => {
    const unsubscribe = monitorAuthState(handleUserFound, handleUserNotFound);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center w-full h-[490px]">
        <div className="loading flex justify-center items-center"></div>
      </div>
    );
  }

  return <Dashboard user={user} />;
};

export default Page;


