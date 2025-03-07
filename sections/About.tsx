import React from 'react'
import Image from 'next/image'
import barcode from '@/public/barcode.png'
import health from '@/public/health.png'
import run from '@/public/run.png'

export default function About() {
    return (
        <div className='container flex-col flex items-center'>
            <h1 className='text-5xl font-bold text-center'>Build a Healthier Lifestyle</h1>
            <p className='text-xl text-center mt-4'>With NutriWise, easily track your nutrition, set personalized wellness goals, and scan food labels for instant nutrient insights</p>

            <div className='px-10'>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col mt-20 text-center items-center justify-center'>
                        <Image src={barcode} alt='icons' width={200} />
                        <h2 className='text-2xl font-bold mt-8'>Barcode Scanner</h2>
                        <p className='text-black mt-2'>Instantly access detailed nutritional information by scanning barcodes on food and beverages.</p>
                    </div>

                    <div className='flex flex-col mt-20 text-center items-center justify-center'>
                        <Image src={health} alt='icons' width={200} />
                        <h2 className='text-2xl font-bold mt-14'>Health Assesment</h2>
                        <p className='text-black mt-2'>View calorie counts and key nutritional details, helping you make informed dietary decisions.</p>
                    </div>

                    <div className='flex flex-col mt-20 text-center items-center justify-center'>
                        <Image src={run} alt='icons' width={200} />
                        <h2 className='text-2xl font-bold mt-8'>Health Personalization</h2>
                        <p className='text-black mt-2' >Track daily intake and customize nutrition goals based on your unique health needs.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
