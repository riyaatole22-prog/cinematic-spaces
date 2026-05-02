import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial split hero — completely new aesthetic.
 * - Left: oversized typographic statement, marquee, meta grid
 * - Right: vertical 3-image strip that scrolls slower (parallax)
 * - Bottom ticker with project credits
 * No gradients-over-photo, no letterbox bars — pure editorial.
 */
export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-eyebrow]", { opacity: 0, y: 20, duration: 0.9 })
        .from("[data-word]", { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.1 }, "-=0.5")
        .from("[data-meta-row]", { opacity: 0, y: 14, duration: 0.8, stagger: 0.06 }, "-=0.6")
        .from("[data-strip-img]", { opacity: 0, scale: 1.05, duration: 1.2, stagger: 0.12 }, "-=1.0")
        .from("[data-ticker]", { opacity: 0, duration: 0.8 }, "-=0.4");

      // Parallax: strip moves up faster than text on scroll
      gsap.to(stripRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-text-col]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(el, {
        opacity: 0.0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "70% top", end: "bottom top", scrub: true },
      });

      // Marquee
      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    "Architecture",
    "Interiors",
    "Hospitality",
    "Residential",
    "Furniture",
    "Landscape",
    "Consultancy",
  ];

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] w-full bg-background overflow-hidden border-b border-border"
    >
      {/* Top meta bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-28 md:pt-32 pb-6 text-[10px] tracking-luxury text-foreground/55 uppercase">
        <span>Vol. 01 — The Studio Edition</span>
        <span className="hidden md:inline">Pune · Maharashtra · India</span>
        <span>MMXXVI</span>
      </div>

      {/* Main split */}
      <div className="relative grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-12">
        {/* LEFT — typography */}
        <div data-text-col className="col-span-12 md:col-span-7 pt-4 md:pt-10">
          <div data-eyebrow className="flex items-center gap-3 text-[10px] tracking-luxury text-accent uppercase mb-8">
            <span className="h-px w-8 bg-accent" />
            Gan Gajrai Studio — Est. MMXIX
          </div>

          <h1 className="font-display silver-text leading-[0.88] text-[18vw] md:text-[12vw] lg:text-[10rem] tracking-tight">
            <span className="block overflow-hidden">
              <span data-word className="block">Crafted</span>
            </span>
            <span className="block overflow-hidden -mt-2 md:-mt-4">
              <span data-word className="block italic font-light text-foreground/85">beyond</span>
            </span>
            <span className="block overflow-hidden -mt-2 md:-mt-4">
              <span data-word className="block">ordinary.</span>
            </span>
          </h1>

          {/* Meta grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 max-w-2xl">
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Founded</div>
              <div className="font-display text-2xl text-foreground">2019</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Projects</div>
              <div className="font-display text-2xl text-foreground">120+</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Disciplines</div>
              <div className="font-display text-2xl text-foreground">04</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Cities</div>
              <div className="font-display text-2xl text-foreground">07</div>
            </div>
          </div>
        </div>

        {/* RIGHT — image strip */}
        <div className="col-span-12 md:col-span-5 relative">
          <div ref={stripRef} className="grid grid-rows-3 gap-4 md:gap-5 h-[80vh] md:h-[78vh] mt-4 md:mt-0">
            <figure data-strip-img className="relative overflow-hidden border border-border">
              <img
                src={IMG.exteriorNight}
                alt="Façade at dusk"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
                01 — Façade
              </figcaption>
            </figure>
            <figure data-strip-img className="relative overflow-hidden border border-border">
              <img
                src={IMG.interiorArchEvening}
                alt="Interior arches"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
                02 — Interior
              </figcaption>
            </figure>
            <figure data-strip-img className="relative overflow-hidden border border-border">
              <img
                src={IMG.residenceExterior}
                alt="Residence"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
                03 — Residence
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        data-ticker
        className="relative z-10 mt-10 md:mt-16 border-t border-border py-5 overflow-hidden"
      >
        <div data-marquee-track className="flex gap-12 whitespace-nowrap will-change-transform">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl text-foreground/80 italic"
            >
              {m} <span className="not-italic text-accent mx-6">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
