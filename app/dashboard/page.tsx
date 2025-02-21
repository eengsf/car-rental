"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "@/models/UserData";
import Dashboard from "@/components/dasboard/Dashboard";
import { monitorAuthState } from "@/lib/authController";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  const handleUserNotFound = useCallback(() => {
    setUser(null);
    router.push("/register");
  }, [router]); 
  
  const handleUserFound = useCallback((userData: UserData) => {
    setUser(userData);
  }, []);
  
  useEffect(() => {
    const unsubscribe = monitorAuthState(handleUserFound, handleUserNotFound);
    return () => unsubscribe();
  }, [handleUserFound, handleUserNotFound]); 

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


