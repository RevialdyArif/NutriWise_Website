import React from 'react'
import foods from "@/public/foods.png"
import Image from 'next/image'
import check from "@/public/check.png"

export default function Discover() {
    return (
        <div className='container flex flex-col px-8'>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-5xl font-bold'>Discover Your Nutrition</h2>
                <p className='text-xl mt-4'>NutriWise helps you go beyond calorie counting, encouraging you to understand and improve your overall nutrition for a healthier life.</p>
            </div>

            <div className='mt-10 px-32'>
                <div className='flex flex-row gap-6'>
                    <Image src={foods} alt="photos" width={900} />

                    <div className='flex flex-col gap-16'>
                        {/* Item 1 */}
                        <div className='flex flex-row items-start gap-4'>
                            <Image src={check} alt="check" width={50} />
                            <div>
                                <h3 className='text-2xl font-bold'>Empower Your Health Journey</h3>
                                <p className='text-lg'>Unlock the power of NutriWise to easily understand your foods nutritional value and make healthier choices every day.</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className='flex flex-row items-start gap-4'>
                            <Image src={check} alt="check" width={50} />
                            <div>
                                <h3 className='text-2xl font-bold'>Trusted Nutrition Data</h3>
                                <p className='text-lg'>Count on accurate nutrition insights. NutriWise verifies each food entry, so you know youre tracking precise information.</p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className='flex flex-row items-start gap-4'>
                            <Image src={check} alt="check" width={50} />
                            <div>
                                <h3 className='text-2xl font-bold'>Your Nutrition, Your Privacy</h3>
                                <p className='text-lg'>With NutriWise, your health data is safe, private, and never shared, giving you peace of mind as you work towards your wellness goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
