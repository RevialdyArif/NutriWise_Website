import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/ui/button";
import Image from 'next/image'
import woman from '@/public/woman.png'

export default function Hero() {
  return (
    <div className='container flex flex-col '>
      <div className='px-10 py-20'>
        <h1 className='text-8xl font-bold'>Eat smarter. <br />Live better.</h1>
        <p className='mt-4 text-lg'>Track your nutrition, set personal goals, and scan nutrients.</p>
        <Link href="/started">
          <Button className='bg-emerald-600 hover:bg-emerald-700 font-semibold mt-6 px-20 py-7 rounded-lg text-xl'>
            Get Started
          </Button>
        </Link>
        <Image src={woman} alt='womaneating' width={800} height={500} className='absolute top-28 right-10' />
      </div>
    </div>
  )
}
