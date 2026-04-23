import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatSection } from "@/components/WhatSection";
import { WhoSolve } from "@/components/WhoSolve";
import { Services } from "@/components/Services";
import { Differentiator } from "@/components/Differentiator";
import { ExperienceLogos } from "@/components/ExperienceLogos";
import { Proof } from "@/components/Proof";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        <Hero />
        <WhatSection />
        <WhoSolve />
        <Services />
        <Differentiator />
        <ExperienceLogos />
        <Proof />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
