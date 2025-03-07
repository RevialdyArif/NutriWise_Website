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
        <div className="container flex flex-col px-4 md:px-8">
            {/* Header Section */}
            <div className="flex flex-col justify-center items-center text-center">
                <Image src={target} alt="target" width={100} height={100} className="w-20 md:w-36" />
                <h2 className="text-2xl md:text-5xl font-bold mt-2">Achieve Your Health Goals in 3 Easy Steps</h2>
            </div>

            {/* Content Section */}
            <div className="mt-10 md:mt-20 md:px-32 space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <Image src={photos} alt="photos" width={800} height={500} className="w-full md:w-[800px] h-auto" />
                    <div className="flex flex-col text-center md:text-left">
                        <Image src={one} alt="one" width={20} height={20} className="w-8 md:w-10 mx-auto md:mx-0 mt-6 md:mt-14" />
                        <h3 className="text-2xl md:text-5xl font-bold mt-4">Scan Your Food</h3>
                        <p className="text-base md:text-lg mt-2">
                            Use the barcode scanner to instantly see nutritional details on sugars, fats, preservatives, and more in your food and drinks.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <Image src={two} alt="two" width={40} height={40} className="w-8 md:w-10 mt-6 md:mt-14" />
                        <h3 className="text-2xl md:text-5xl font-bold mt-4">Personalize Your Goals</h3>
                        <p className="text-base md:text-lg mt-2">
                            Set daily nutrient targets and track your intake to align with your health needs and wellness objectives.
                        </p>
                    </div>
                    <Image src={personalize} alt="personalize" width={800} height={500} className="w-full md:w-[800px] h-auto" />
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <Image src={monitor} alt="monitor" width={800} height={500} className="w-full md:w-[800px] h-auto" />
                    <div className="flex flex-col text-center md:text-left">
                        <Image src={three} alt="three" width={40} height={40} className="w-8 md:w-10 mx-auto md:mx-0 mt-6 md:mt-14" />
                        <h3 className="text-2xl md:text-5xl font-bold mt-4">Monitor Your Progress</h3>
                        <p className="text-base md:text-lg mt-2">
                            Review detailed health assessments and personalized insights to stay on track toward a healthier lifestyle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}