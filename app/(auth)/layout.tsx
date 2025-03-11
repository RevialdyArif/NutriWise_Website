import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

const Layout = async ({ children }: { children: ReactNode}) => {
  const session = await auth()
  
  if (session) {
    redirect("/");
  }

  return (
    <main>
      <section>
        {children}
      </section>
    </main>
  )
}

export default Layout