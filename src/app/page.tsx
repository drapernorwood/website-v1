import { Header } from "@/components/Header";
import { SurfaceExperience } from "@/components/SurfaceExperience";
import { Footer } from "@/components/Footer";
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        <SurfaceExperience />
      </main>
      <Footer />
    </>
  );
}
