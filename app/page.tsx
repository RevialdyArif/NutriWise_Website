import { auth } from "@/auth";
import About from "@/sections/About";
import Discover from "@/sections/Discover";
import Footer from "@/sections/Footer";
import Goals from "@/sections/Goals";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session) redirect("/sign-in")
  
  return (
    <div className="container">
      <section className="sticky top-0 z-10">
        <Header />
      </section>

      <section>
        <Hero />
      </section>

      <section className="mt-30">
        <About />
      </section>

      <section className="mt-44">
        <Goals />
      </section>

      <section className="mt-32">
        <Discover />
      </section>

      <section className="mt-30">
        <Footer />
      </section>
    </div>
  )
}
