import { auth } from '@/auth'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if(!session){
    console.log('No Session Found. Redirecting to Sign In Page...  ')
    redirect("/sign-in")
  }
  
  return (
    <main>
      <div className="sticky top-0 z-10"><Header /></div>
      <div>{children}</div>
    </main>
  )
}

export default layout