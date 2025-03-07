
import About from "@/sections/About";
import Discover from "@/sections/Discover";
import Footer from "@/sections/Footer";
import Goals from "@/sections/Goals";
import Hero from "@/sections/Hero";

export default async function Home() {
  
  return (
    <div className="container">
      <section className="-mt-20 md:mt-0">
        <Hero />
      </section>

      <section className="md:mt-24 mt-0">
        <About />
      </section>

      <section className="mt-12 md:mt-0">
        <Goals />
      </section>

      <section className="mt-16 md:mt-0">
        <Discover />
      </section>

      <section className="mt-20 md:mt-0">
        <Footer />
      </section>
    </div>
  )
}
