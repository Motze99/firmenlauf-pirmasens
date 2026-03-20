import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import Anmeldung from "@/components/Anmeldung";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TeamSection />
        <Anmeldung />
      </main>
      <Footer />
    </>
  );
}
