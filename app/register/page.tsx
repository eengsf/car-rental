'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// import { registerWithEmail } from '@/lib/firebase/auth';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import { registerWithEmail } from '@/lib/firebase/auth';

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await registerWithEmail(
        form.name,
        form.email,
        form.password
      );
      if (user) {
        console.log('Registration successful: ', user);
        alert('Registration successful');
      }
      router.push('/login');
    } catch (error) {
      console.error('Registration failed: ', error);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-custom-thin via-custom-medium to-custom-strong">
      <div className="w-full sm:max-w-96 sm:h-fit h-full flex flex-col gap-5 bg-custom-light sm:borde border-none sm:rounded-xl rounded-none sm:p-7 p-5 mx-auto shadow-md shadow-black">
        <div className="flex flex-col items-center gap-5">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-custom-semiStrong">
              Create an account
            </h2>
            <p className="text-xs">Please enter your details to register</p>
          </div>
        </div>
        <form action="" onSubmit={handleRegister}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor='name' className="font-semibold text-sm">Your Name</label>
              <input
                id="name"
                autoComplete="off"
                type="text"
                placeholder="Enter your first name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="text-xs p-3 border border-custom-thin rounded-lg focus:outline-none focus:border-custom-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor='email' className="font-semibold text-sm">Email</label>
              <input
                id="email"
                autoComplete="off"
                type="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="text-xs p-3 border border-custom-thin rounded-lg focus:outline-none focus:border-custom-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor='password' className="font-semibold text-sm">Password</label>
              <div className="relative">
                <input
                  id="password"
                  autoComplete="off"
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full text-xs p-3 border border-custom-thin rounded-lg focus:outline-none focus:border-custom-medium"
                />
                <span onClick={handleShowPassword} className='cursor-pointer'>
                  {showPassword ? (
                    <IoMdEye size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-medium" />
                  ) : (
                    <IoMdEyeOff size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-medium" />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-gradient-to-r from-custom-medium to-custom-thin h-10 rounded-lg active:scale-[99%]"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <p className="text-xs text-center">
          Have an account?{' '}
          <Link
            href={'/login'}
            className="text-custom-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
