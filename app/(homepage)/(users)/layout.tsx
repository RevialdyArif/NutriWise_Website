import DietPage from '@/app/(homepage)/(users)/diet/page'
import PersonalizationPage from '@/app/(homepage)/(users)/personalization/page';
import AnalyticsPage from './analytics/page';

export default async function layout() {
    return (
        <main>
            <div><DietPage /></div>
            <div><PersonalizationPage /></div>
            <div><AnalyticsPage /></div>
        </main>
    )
}
