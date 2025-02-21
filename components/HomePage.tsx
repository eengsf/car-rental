import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function HomePage() {
  return (
    <div className="w-full">
      <div className="container mx-auto md:h-[85vh] h-full flex flex-col md:flex-row items-center md:justify-between justify-evenly lg:px-10 px-5 py-8 md:py-20 ">
        <div className="text-center md:text-left md:w-1/2 space-y-6 ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Car Rental – Search, Compare & Save
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ad
            fugiat suscipit at earum minus harum provident corporis. Inventore
            non sunt cumque animi ab tempora adipisci minima, officia incidunt
            magni.
          </p>
          <div>
            <Link
              href="/"
              className="inline-block px-8 py-3 text-white text-lg font-semibold rounded-xl bg-custom-semiStrong hover:bg-custom-medium transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/main.png"
            alt="Main Website Image"
            width={500}
            height={500}
            priority
            className="w-full max-w-2xl md:max-w-lg lg:max-w-xl xl:max-w-3xl "
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
