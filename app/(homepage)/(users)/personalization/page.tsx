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
    <div className='container mx-auto flex flex-col px-14 py-10 items-center justify-center gap-8'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        {session ? (
          <h1 className='text-4xl font-bold text-emerald-600'>{session.user?.name}</h1>
        ): (
          <h1 className='text-4xl font-bold text-emerald-600'>Welcome, Guest!</h1>
        )}
        <h2 className='text-xl'>Its a beautiful day to try something new!</h2>
      </div>

      <div className='grid grid-cols-2 gap-8 mt-6'>
        {/* Gambar Pertama */}
        <div className='bg-white shadow-2xl rounded-3xl px-8 py-6 w-full max-w-2xl relative mb-4'>
          <div className='flex flex-row items-center gap-6'>
            {/* Kiri: Teks */}
            <div className='flex flex-col flex-1'>
              <h2 className='bg-emerald-600 text-white w-fit px-8 py-2 rounded-lg mb-8'>Breakfast</h2>
              <h1 className='font-semibold text-2xl'>French Green Salad</h1>
              <p className='text-gray-600'>Salad packed with fresh vegetables and fresh fruits.</p>
              <p className='text-emerald-600 font-semibold mt-4'>125 kcal</p>
            </div>

            {/* Kanan: Gambar dengan offset ke atas */}
            <div className='relative -mt-20'>
              <Image src={salad} alt="salad" width={200} height={200} />
            </div>
          </div>
        </div>

        {/* Gambar Kedua */}
        <div className='bg-white shadow-2xl rounded-3xl px-8 py-6 w-full max-w-2xl relative mb-4'>
          <div className='flex flex-row items-center gap-6'>
            {/* Kiri: Teks */}
            <div className='flex flex-col flex-1'>
              <h2 className='bg-emerald-600 text-white w-fit px-8 py-2 rounded-lg mb-8'>Lunch</h2>
              <h1 className='font-semibold text-2xl'>Green Veggies</h1>
              <p className='text-gray-600'>Veggies packed with nutrients and flavors.</p>
              <p className='text-emerald-600 font-semibold mt-4'>115 kcal</p>
            </div>

            {/* Kanan: Gambar dengan offset ke atas */}
            <div className='relative -mt-20'>
              <Image src={veggies} alt="salad" width={200} height={200} />
            </div>
          </div>
        </div>

        {/* Gambar Ketiga */}
        <div className='bg-white shadow-2xl rounded-3xl px-8 py-6 w-full max-w-2xl relative mb-4'>
          <div className='flex flex-row items-center gap-6'>
            {/* Kiri: Teks */}
            <div className='flex flex-col flex-1'>
              <h2 className='bg-emerald-600 text-white w-fit px-8 py-2 rounded-lg mb-8'>Lunch</h2>
              <h1 className='font-semibold text-2xl'>Grilled Chicken</h1>
              <p className='text-gray-600'>Grilled chicken with a side of vegetables.</p>
              <p className='text-emerald-600 font-semibold mt-4'>359 kcal</p>
            </div>

            {/* Kanan: Gambar dengan offset ke atas */}
            <div className='relative -mt-20'>
              <Image src={grilled} alt="salad" width={200} height={200} />
            </div>
          </div>
        </div>

        {/* Gambar Keempat */}
        <div className='bg-white shadow-2xl rounded-3xl px-8 py-6 w-full max-w-2xl relative mb-4'>
          <div className='flex flex-row items-center gap-6'>
            {/* Kiri: Teks */}
            <div className='flex flex-col flex-1'>
              <h2 className='bg-emerald-600 text-white w-fit px-8 py-2 rounded-lg mb-8'>Dinner</h2>
              <h1 className='font-semibold text-2xl'>Salmon and Veggies</h1>
              <p className='text-gray-600'>Salmon with a side of vegetables.</p>
              <p className='text-emerald-600 font-semibold mt-4'>224 kcal</p>
            </div>

            {/* Kanan: Gambar dengan offset ke atas */}
            <div className='relative -mt-20'>
              <Image src={salmon} alt="salad" width={200} height={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

