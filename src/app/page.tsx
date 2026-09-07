import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Services } from "@/components/Services";
import { Practice } from "@/components/Practice";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        <Hero />
        <Proof />
        <Practice />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
