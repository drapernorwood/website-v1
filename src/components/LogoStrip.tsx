import Image from "next/image";

export function LogoStrip() {
  return (
    <section
      aria-label="Selected clients and partners"
      className="border-t border-paper-line"
    >
      <div className="container-dn py-6 md:py-8">
        <Image
          src="/logo-strip.png"
          alt="Verizon, GE, DCD, Park Seed, HealthLinks Magazine, USP"
          width={2896}
          height={543}
          className="h-auto w-full opacity-65 mix-blend-darken"
          sizes="(min-width: 1280px) 1200px, 100vw"
        />
      </div>
    </section>
  );
}
