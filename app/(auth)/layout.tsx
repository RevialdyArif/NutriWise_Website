"use client";

import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';

const Layout = ({ children }: { children: ReactNode}) => {
  const { data: session, status } = useSession();

  if (status === "loading") return console.log("Loading Session...");
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