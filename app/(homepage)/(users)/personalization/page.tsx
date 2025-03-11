"use client";

import React from 'react'
import Image from 'next/image'
import salad from '@/public/french-green-salad.png'
import veggies from '@/public/veggies.png'
import grilled from '@/public/grilled.png'
import salmon from '@/public/salmon.png'
import { useSession } from 'next-auth/react'

export default function PersonalizationPage() {
  const { data: session } = useSession();
  
  return (
    <div className='container mx-auto flex flex-col px-6 sm:px-10 py-10 items-center justify-center gap-8'>
      <div className='flex flex-col gap-3 items-center justify-center text-center'>
        {session ? (
          <h1 className='text-3xl sm:text-4xl font-bold text-emerald-600'>{session?.user?.name}</h1>
        ) : (
          <h1 className='text-3xl sm:text-4xl font-bold text-emerald-600'>Welcome, Guest!</h1>
        )}
        <h2 className='text-lg sm:text-xl'>Its a beautiful day to try something new!</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl'>
        {[
          { title: "Breakfast", name: "French Green Salad", desc: "Salad packed with fresh vegetables and fresh fruits.", kcal: "125 kcal", img: salad },
          { title: "Lunch", name: "Green Veggies", desc: "Veggies packed with nutrients and flavors.", kcal: "115 kcal", img: veggies },
          { title: "Lunch", name: "Grilled Chicken", desc: "Grilled chicken with a side of vegetables.", kcal: "359 kcal", img: grilled },
          { title: "Dinner", name: "Salmon and Veggies", desc: "Salmon with a side of vegetables.", kcal: "224 kcal", img: salmon },
        ].map((item, index) => (
          <div key={index} className='bg-white shadow-2xl rounded-3xl px-6 sm:px-8 py-6 w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto relative'>
            <div className='flex flex-col sm:flex-row items-center gap-6'>
              <div className='flex flex-col flex-1 text-center sm:text-left'>
                <h2 className='bg-emerald-600 text-white w-fit mx-auto sm:mx-0 px-6 py-2 rounded-lg mb-6 text-sm sm:text-base'>{item.title}</h2>
                <h1 className='font-semibold text-xl sm:text-2xl'>{item.name}</h1>
                <p className='text-gray-600 text-sm sm:text-base'>{item.desc}</p>
                <p className='text-emerald-600 font-semibold mt-2'>{item.kcal}</p>
              </div>
              <div className='relative sm:mt-0'>
                <Image src={item.img} alt={item.name} width={200} height={200} className='w-32 sm:w-40 h-auto' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}