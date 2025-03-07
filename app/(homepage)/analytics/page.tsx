import React from 'react'
import AnalyticsChart from '@/chart'

export default function AnalyticsPage() {
  return (
    <div className='container mx-auto flex flex-col px-14 py-10 items-center justify-center gap-8'>
        <div>
            <AnalyticsChart />
        </div>
    </div>
  )
}
