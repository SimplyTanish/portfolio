import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Identity } from "@/components/identity";
import { Operations } from "@/components/operations";
import { Arsenal } from "@/components/arsenal";
import { Orbit } from "@/components/orbit";
import { Archive } from "@/components/archive";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Identity />
      <Operations />
      <Arsenal />
      <Orbit />
      <Archive />
      <Contact />
      <Footer />
    </main>
  );
}