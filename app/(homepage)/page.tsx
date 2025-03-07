
import About from "@/sections/About";
import Discover from "@/sections/Discover";
import Footer from "@/sections/Footer";
import Goals from "@/sections/Goals";
import Hero from "@/sections/Hero";

export default async function Home() {
  
  return (
    <div className="container">
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
