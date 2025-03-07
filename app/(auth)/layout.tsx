import { auth } from '@/auth'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: ReactNode}) => {
  const session = await auth()

  if (session) redirect("/")
  return (
    <main>
      <section>
        {children}
      </section>
    </main>
  )
}

export default layout