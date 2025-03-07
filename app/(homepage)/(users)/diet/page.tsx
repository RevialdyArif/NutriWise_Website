import React from 'react'
import Image from 'next/image'
import ketogenicDiet from '@/public/ketogenic-diet.png'
export default function DietPage() {
    return (
        <main className='container mx-auto flex flex-row px-14 py-10 items-center justify-center'>
            {/* Card utama untuk Ketogenic Diet */}
            <div className='bg-white shadow-2xl rounded-3xl p-12 w-full max-w-3xl'>
                <div className='flex items-center justify-between gap-x-20'>
                    <div className='flex flex-col flex-1'>
                        <h2 className='text-2xl text-black font-semibold'>Your Active Plan</h2>
                        <h1 className='text-5xl text-emerald-600 font-bold'>Ketogenic Diet</h1>
                        <hr className="h-1 my-6 bg-gray-700 border-1 dark:bg-gray-700"></hr>

                        {/* Row untuk Calories Intake dan Water Intake */}
                        <div className='flex justify-between gap-16'>
                            <div className='w-1/2'>
                                <p className='text-xl'><span className='font-bold text-3xl'>900</span> kcal</p>
                                <p className='text-lg text-gray-600'>Calories Intake</p>
                                <div className="h-4 w-full bg-gray-300 rounded-full mt-2">
                                    <div className="h-full bg-emerald-500 rounded-full w-4/5"></div>
                                </div>
                            </div>

                            <div className='w-1/2'>
                                <p className='text-xl'><span className='font-bold text-3xl'>1,5</span> L</p>
                                <p className='text-lg text-gray-600'>Water Intake</p>
                                <div className="h-4 w-full bg-gray-300 rounded-full mt-2">
                                    <div className="h-full bg-blue-500 rounded-full w-2/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image src={ketogenicDiet} alt='Ketogenic Diet' className='w-64 h-64 rounded-2xl' />
                </div>
            </div>


            {/* Card progress nutrisi */}
            <div className='ml-12'>
                {/* Protein */}
                <div className='bg-white shadow-xl rounded-xl px-8 py-6 w-96 mb-4'>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-medium">Protein</p>
                        <p className="text-sm text-gray-600">46/128g</p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: "36%" }}></div>
                    </div>
                </div>

                {/* Carbs */}
                <div className='bg-white shadow-xl rounded-xl px-8 py-6 w-96 mb-4'>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-lg font-medium">Carbs</p>
                        <p className="text-sm text-gray-600">34/203g</p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-blue-500 h-4 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                </div>

                {/* Fat */}
                <div className='bg-white shadow-xl rounded-xl px-8 py-6 w-96 mb-4'>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-lg font-medium">Fat</p>
                        <p className="text-sm text-gray-600">58/74g</p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                </div>
            </div>
        </main>
    )
}