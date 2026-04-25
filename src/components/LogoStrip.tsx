import Image from "next/image";

export function LogoStrip() {
  return (
    <section
      aria-label="Experience includes"
      className="border-y border-paper-line bg-paper-soft/40"
    >
      <div className="container-dn py-10 md:py-12">
        <p className="caption text-ink/40">Experience includes</p>
        <div className="mt-6 md:mt-8">
          <Image
            src="/logo-strip.png"
            alt="Verizon, GE, DCD, Park Seed, HealthLinks Magazine, USP"
            width={2896}
            height={543}
            className="h-auto w-full opacity-70"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
