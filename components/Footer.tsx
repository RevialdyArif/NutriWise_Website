import { Button } from '@/components/ui/button'
import rocket from '@/public/rocket.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="bg-emerald-600 flex flex-col items-center text-center py-5 md:py-10 px-4 md:px-0">
        <Image src={rocket} alt="rocket" width={60} height={60} className="w-16 md:w-20" />
        <h2 className="text-lg md:text-2xl font-bold text-white mt-3">
          Start Your Journey With NutriWise
        </h2>
        <p className="text-white mt-2 text-sm md:text-base">
          Scan, track, and personalize your nutrition to reach your goals with ease.
        </p>
        <Button className="text-black bg-white hover:bg-gray-200 font-semibold mt-6 px-10 py-4 md:px-20 md:py-7 rounded-lg text-lg md:text-xl">
          <Link href="/started">Get Started!</Link>
        </Button>
      </div>
    </footer>
  )
}
