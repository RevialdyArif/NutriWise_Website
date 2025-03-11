
import About from "@/components/About";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Goals from "@/components/Goals";
import Hero from "@/components/Hero";

export default async function Home() {
  
  return (
    <div className="container">
      <section className="-mt-20 md:mt-20">
        <Hero />
      </section>

      <section className="md:mt-24 mt-0">
        <About />
      </section>

      <section className="mt-12 md:mt-24">
        <Goals />
      </section>

      <section className="mt-16 md:mt-24">
        <Discover />
      </section>

      <section className="mt-20 md:mt-20">
        <Footer />
      </section>
    </div>
  )
}
