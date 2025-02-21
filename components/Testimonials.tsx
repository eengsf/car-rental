
"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const promosi = [
  {
    name: 'Charles Suyono',

    value: 4.8,
    img: '/testimoni1.png',
    test: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam, quaerat earum commodi dicta incidunt? Ducimus eaque maxime minima alias eius modi hic rerum eos nulla, neque repellat, error vel.',
  },
  {
    name: 'Jessica Putri Inem',

    value: 4.7,
    img: '/testimoni2.png',
    test: 'Ducimus eaque maxime minima alias eius modi hic rerum eos nulla, neque repellat, error vel. Recusandae, atque? Optio,  elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea  delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam, quaerat earum commodi dicta incidunt? ',
  },
  {
    name: 'Putra Alex Purwoto',

    value: 4.9,
    img: '/testimoni3.png',
    test: 'Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam Lorem ipsum dolor sit amet consectetur adipisicing elit.  elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea  quaerat earum commodi dicta incidunt? , error vel.',
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? promosi.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === promosi.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div id='testimonials' className="bg-custom-thin w-full scroll-mt-4">
      <div className="container mx-auto flex flex-col items-center md:justify-between justify-evenly gap-5 lg:px-10 px-5 py-8 md:py-20 h-fit ">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-custom-main2 font-bold">TESTIMONIALS</h2>
          <p className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
            What people say about us?
          </p>
        </div>
        <div className="flex items-center justify-center md:flex-row flex-col relative">
          <button onClick={prevTestimonial} className='absolute left-0 top-1/2 -translate-y-1/2'><FaChevronLeft size={24} /></button>
          <button onClick={nextTestimonial} className='absolute right-0 top-1/2 -translate-y-1/2'><FaChevronRight size={24} /></button>
          <div className="md:w-[35%] w-[50%] flex items-center justify-center bg-custom-light rounded-xl shadow-xl">
            <Image
              src={promosi[currentIndex].img}
              alt={promosi[currentIndex].name}
              width={500}
              height={500}
              priority
              className=" h-full "
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-10 p-10">
            <p className="leading-7 text-center">{promosi[currentIndex].test}</p>
            <div className="flex flex-col gap-1 items-center">
              <h2 className="lg:text-3xl text-2xl font-semibold text-custom-dark">
                {promosi[currentIndex].name}
              </h2>
              <div className="flex gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={20} className={i < Math.round(promosi[currentIndex].value) ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
              <span className="ml-2">{promosi[currentIndex].value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
