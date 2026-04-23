import Image from "next/image";

export function ExperienceLogos() {
  return (
    <section className="section">
      <div className="container-dn">
        <p className="caption text-center text-ink/40">Experience includes</p>
        <div className="mx-auto mt-10 max-w-4xl">
          <Image
            src="/logo-layout.png"
            alt="Experience includes: Verizon, GE, DCD, Park Seed, HealthLinks Magazine, and U.S. Pharmacopeia"
            width={1675}
            height={666}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
