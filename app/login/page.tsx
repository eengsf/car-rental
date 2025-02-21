'use client';

import { loginWithEmail, loginWithGoogle } from '@/lib/firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';

function Page() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') {
      alert('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail(form.email, form.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try{
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-custom-thin via-custom-medium to-custom-strong">
      <div className="w-full sm:max-w-96 sm:h-fit h-full flex flex-col gap-5 bg-custom-light sm:border border-none sm:rounded-xl rounded-none sm:p-7 p-5 mx-auto shadow-md shadow-black">
        <div className="flex flex-col items-center gap-5">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-custom-semiStrong">
              Welcome back
            </h2>
            <p className="text-xs">Please enter your details to login</p>
          </div>
        </div>

        <form action="" onSubmit={handleLogin}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                required
                value={form.email}
                disabled={loading}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="text-xs p-3 border border-custom-thin rounded-lg focus:outline-none focus:border-custom-medium"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder="Enter your password"
                  autoComplete="off"
                  required
                  value={form.password}
                  disabled={loading}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full text-xs p-3 border border-custom-thin rounded-lg focus:outline-none focus:border-custom-medium"
                />
                <span onClick={handleShowPassword} className="cursor-pointer">
                  {showPassword ? (
                    <IoMdEye
                      size={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-medium"
                    />
                  ) : (
                    <IoMdEyeOff
                      size={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-medium"
                    />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <input
                    id="remember"
                    type="checkbox"
                    className="cursor-pointer"
                  />
                  <label htmlFor="remember" className="font-semibold text-xs">
                    Remember me
                  </label>
                </div>
                <p className="text-xs hover:text-custom-medium cursor-pointer">
                  Forgot Password?
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-gradient-to-r from-custom-medium to-custom-thin h-10 rounded-lg active:scale-[99%]"
            >
              {loading ? 'Loading...' : 'Login'}{' '}
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <span className="flex-grow border-t border-custom-medium"></span>
          <span className="text-sm text-custom-main2 mx-4">or</span>
          <span className="flex-grow border-t border-custom-medium"></span>
        </div>

        <div className="flex flex-col gap-1.5">
          <button className="flex gap-1 items-center justify-center border border-custom-medium h-10 rounded-lg text-sm active:scale-[99%]">
            <FaApple size={20} />
            Continue with Apple
          </button>
          <button
            className={`flex gap-1 items-center justify-center border border-custom-medium h-10 rounded-lg text-sm active:scale-[99%]`}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Image src="/google.png" alt="google" width={25} height={25} />
            {loading ? 'Logging in with Google...' : 'Continue with Google'}
          </button>
        </div>

        <p className="text-xs text-center">
          Don&apos;t have an account?{' '}
          <Link
            href={'/register'}
            className="text-custom-medium hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
