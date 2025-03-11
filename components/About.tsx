import React from 'react'
import Image from 'next/image'
import barcode from '@/public/barcode.png'
import health from '@/public/health.png'
import run from '@/public/run.png'

export default function About() {
    return (
        <div className="container flex flex-col items-center px-4 md:px-10">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
                Build a Healthier Lifestyle
            </h1>
            <p className="text-md md:text-xl text-center mt-4">
                With NutriWise, easily track your nutrition, set personalized wellness goals, and scan food labels for instant nutrient insights.
            </p>

            <div className="mt-20 w-full">
                <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center">
                    {/* Card 1 */}
                    <div className="flex flex-col text-center items-center justify-center">
                        <Image src={barcode} alt="icons" width={200} height={200} className="w-32 md:w-48" />
                        <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8">Barcode Scanner</h2>
                        <p className="text-black mt-2 text-sm md:text-base">
                            Instantly access detailed nutritional information by scanning barcodes on food and beverages.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col text-center items-center justify-center">
                        <Image src={health} alt="icons" width={200} height={200} className="w-32 md:w-48" />
                        <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-14">Health Assessment</h2>
                        <p className="text-black mt-2 text-sm md:text-base">
                            View calorie counts and key nutritional details, helping you make informed dietary decisions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col text-center items-center justify-center">
                        <Image src={run} alt="icons" width={200} height={200} className="w-32 md:w-48" />
                        <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8">Health Personalization</h2>
                        <p className="text-black mt-2 text-sm md:text-base">
                            Track daily intake and customize nutrition goals based on your unique health needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
