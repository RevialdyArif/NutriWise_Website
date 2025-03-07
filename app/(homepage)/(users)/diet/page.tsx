import React from 'react';
import Image from 'next/image';
import ketogenicDiet from '@/public/ketogenic-diet.png';

export default function DietPage() {
    return (
        <main className='container mx-auto flex flex-col sm:flex-row px-6 sm:px-14 md:py-10 py-2 items-center justify-center gap-8'>
            {/* Card utama untuk Ketogenic Diet */}
            <div className='bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-3xl'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-x-10'>
                    <div className='flex flex-col flex-1 text-center sm:text-left'>
                        <h2 className='text-2xl text-black font-semibold'>Your Active Plan</h2>
                        <h1 className='text-4xl sm:text-5xl text-emerald-600 font-bold'>Ketogenic Diet</h1>
                        <hr className='h-1 my-4 sm:my-6 bg-gray-700 border-0'></hr>

                        {/* Calories Intake dan Water Intake */}
                        <div className='grid grid-cols-2 gap-10'>
                            <div className='text-center'>
                                <p className='text-xl'><span className='font-bold text-3xl'>900</span> kcal</p>
                                <p className='text-md md:text-lg text-gray-600'>Calories Intake</p>
                                <div className='h-2 md:h-4 w-full bg-gray-300 rounded-full mt-2'>
                                    <div className='h-full bg-emerald-500 rounded-full w-4/5'></div>
                                </div>
                            </div>

                            <div className='text-center'>
                                <p className='text-xl'><span className='font-bold text-3xl'>1.5</span> L</p>
                                <p className='text-md md:text-lg text-gray-600'>Water Intake</p>
                                <div className='h-2 md:h-4 w-full bg-gray-300 rounded-full mt-2'>
                                    <div className='h-full bg-blue-500 rounded-full w-2/5'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image src={ketogenicDiet} alt='Ketogenic Diet' className='w-40 sm:w-64 h-auto mt-6 sm:mt-0' />
                </div>
            </div>

            {/* Card progress nutrisi */}
            <div className='w-full max-w-lg'>
                {/* Protein */}
                <div className='bg-white shadow-xl rounded-xl px-6 sm:px-8 py-6 w-full mb-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg font-medium'>Protein</p>
                        <p className='text-sm text-gray-600'>46/128g</p>
                    </div>
                    <div className='w-full bg-gray-300 rounded-full h-4'>
                        <div className='bg-green-500 h-4 rounded-full' style={{ width: '36%' }}></div>
                    </div>
                </div>

                {/* Carbs */}
                <div className='bg-white shadow-xl rounded-xl px-6 sm:px-8 py-6 w-full mb-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg font-medium'>Carbs</p>
                        <p className='text-sm text-gray-600'>34/203g</p>
                    </div>
                    <div className='w-full bg-gray-300 rounded-full h-4'>
                        <div className='bg-blue-500 h-4 rounded-full' style={{ width: '20%' }}></div>
                    </div>
                </div>

                {/* Fat */}
                <div className='bg-white shadow-xl rounded-xl px-6 sm:px-8 py-6 w-full mb-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg font-medium'>Fat</p>
                        <p className='text-sm text-gray-600'>58/74g</p>
                    </div>
                    <div className='w-full bg-gray-300 rounded-full h-4'>
                        <div className='bg-yellow-500 h-4 rounded-full' style={{ width: '70%' }}></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
