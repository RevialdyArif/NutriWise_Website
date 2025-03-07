import React from 'react'
import Image from 'next/image'
import target from '@/public/target.png'
import photos from '@/public/photos.png'
import one from '@/public/one.png'
import two from '@/public/two.png'
import personalize from '@/public/personalize.png'
import three from '@/public/three.png'
import monitor from '@/public/monitor.png'

export default function Goals() {
    return (
        <div className='container flex flex-col px-8'>
            <div className='flex flex-col justify-center items-center'>
                <Image src={target} alt="target" width={150} />
                <h2 className='text-5xl font-bold mt-2'>Achieve Your Health Goals in 3 Easy Steps</h2>
            </div>

            <div className='mt-20 px-32'>
                <div className='flex flex-row gap-10'>
                    <Image src={photos} alt="photos" width={800} />
                    <div className='flex flex-col'>
                        <Image src={one} alt="one" width={20} className='mt-14'/>
                        <h3 className='text-5xl font-bold mt-4'>Scan Your Food</h3>
                        <p className='text-lg'>Use the barcode scanner to instantly see nutritional details on sugars, fats, preservatives, and more in your food and drinks.</p>
                    </div>
                </div>

                <div className='flex flex-row gap-10'>
                    <div className='flex flex-col items-end text-right'>
                        <Image src={two} alt="two" width={40} className='mt-14' />
                        <h3 className='text-5xl font-bold mt-4'>Personalize Your Goals</h3>
                        <p className='text-lg'>Set daily nutrient targets and track your intake to align with your health needs and wellness objectives.</p>
                    </div>
                    <Image src={personalize} alt="personalize" width={800} />
                </div>

                <div className='flex flex-row gap-10'>
                    <Image src={monitor} alt="monitor" width={800} />
                    <div className='flex flex-col'>
                        <Image src={three} alt="three" width={40} className='mt-14' />
                        <h3 className='text-5xl font-bold mt-4 mb-4'>Monitor Your Progress</h3>
                        <p className='text-lg'>Review detailed health assessments and personalized insights to stay on track toward a healthier lifestyle.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
