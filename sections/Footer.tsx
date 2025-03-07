import { Button } from '@/components/ui/ui/button'
import rocket from '@/public/rocket.png'
import Image from 'next/image'
import Link from 'next/link'

export default function footer() {
  return (
    <footer>
      <div className='bg-emerald-600 items-center flex flex-col py-5'>
        <Image src={rocket} alt="rocket" width={80} />
        <h2 className='text-2xl font-bold text-white mt-3'>Start Journey With NutriWise</h2>
        <p className='text-white mt-2'>Scan, track, and personalize your nutrition to reach your goals with ease.</p>
        <Button className='text-black bg-white hover:bg-gray-200 font-semibold mt-6 px-20 py-7 rounded-lg text-xl'>
          <Link href="/started">Get Started!</Link>
        </Button>
      </div>
    </footer>
  )
}
