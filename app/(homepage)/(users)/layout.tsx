"use client";

import DietPage from '@/app/(homepage)/(users)/diet/page'
import PersonalizationPage from '@/app/(homepage)/(users)/personalization/page';
import AnalyticsPage from './analytics/page';
import AddFoodForm from '@/components/AddFoodForm';
import { useState } from 'react';


export default function Layout() {
    const [refresh, setRefresh] = useState(false);
    return (
        <main>
            <div><DietPage /></div>
            <div><PersonalizationPage /></div>
            <div><AnalyticsPage /></div>

            <AddFoodForm
                key={refresh.toString()}
                onFoodAdded={() => setRefresh((prev) => !prev)}
            />
        </main>
    )
}