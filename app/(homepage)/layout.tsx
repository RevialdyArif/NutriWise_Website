import Header from '@/sections/Header'
import DietPage from './diet/page'
import PersonalizationPage from './personalization/page'
import AnalyticsPage from './analytics/page';

export default function layout() {
  return (
    <section>
      <div><Header /></div>
      <div><DietPage /></div>
      <div><PersonalizationPage/></div>
      <div><AnalyticsPage /></div>
    </section>
  )
}
