import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial split hero — enhanced.
 * - Left: oversized typographic statement + studio meta + contact strip
 * - Right: vertical 3-image strip with parallax + floating badge
 * - Top: status bar with live cities marquee
 * - Bottom: discipline ticker
 */
export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-topbar]", { opacity: 0, y: -10, duration: 0.8 })
        .from("[data-eyebrow]", { opacity: 0, y: 20, duration: 0.9 }, "-=0.4")
        .from("[data-word]", { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.1 }, "-=0.5")
        .from("[data-tagline]", { opacity: 0, y: 14, duration: 0.8 }, "-=0.6")
        .from("[data-meta-row]", { opacity: 0, y: 14, duration: 0.7, stagger: 0.06 }, "-=0.5")
        .from("[data-contact]", { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .from("[data-strip-img]", { opacity: 0, scale: 1.05, duration: 1.2, stagger: 0.12 }, "-=1.4")
        .from("[data-badge]", { opacity: 0, scale: 0.85, duration: 0.8 }, "-=0.6")
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
        scrollTrigger: { trigger: el, start: "75% top", end: "bottom top", scrub: true },
      });

      // Marquee
      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // Slow rotating badge
      gsap.to("[data-badge-ring]", {
        rotate: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Cities mini-marquee
      gsap.to("[data-cities-track]", {
        xPercent: -50,
        duration: 25,
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

  const cities = ["Pune", "Solapur", "Ahilyanagar", "Mumbai"];

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] w-full bg-background overflow-hidden border-b border-border"
    >
      {/* Ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 20%, oklch(0.7 0.12 55 / 0.35), transparent 60%), radial-gradient(40% 30% at 85% 80%, oklch(0.82 0.015 90 / 0.18), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* Top status bar */}
      <div
        data-topbar
        className="relative z-10 flex items-center justify-between gap-6 px-6 md:px-12 pt-24 md:pt-28 pb-4 text-[10px] tracking-luxury text-foreground/55 uppercase border-b border-border/60"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          Open for commissions — MMXXVI
        </span>

        <div className="hidden md:block flex-1 max-w-md mx-6 overflow-hidden">
          <div data-cities-track className="flex gap-8 whitespace-nowrap">
            {[...cities, ...cities, ...cities].map((c, i) => (
              <span key={i} className="text-foreground/60">
                {c} <span className="text-accent ml-2">·</span>
              </span>
            ))}
          </div>
        </div>

        <span>Vol. 01 — The Studio Edition</span>
      </div>

      {/* Main split */}
      <div className="relative grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-12 pt-8 md:pt-12">
        {/* LEFT — typography */}
        <div data-text-col className="col-span-12 md:col-span-7 pt-2 md:pt-6">
          <div data-eyebrow className="flex items-center gap-3 text-[10px] tracking-luxury text-accent uppercase mb-8">
            <span className="h-px w-8 bg-accent" />
            Gan Gajrai Studio — Est. MMXXIII
          </div>

          <h1 className="font-display silver-text leading-[0.88] text-[18vw] md:text-[12vw] lg:text-[9.5rem] tracking-tight">
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

          <p
            data-tagline
            className="mt-8 max-w-xl text-sm md:text-base text-foreground/65 leading-relaxed"
          >
            An architecture &amp; interior design studio shaping timeless spaces across
            Maharashtra — from intimate cafés and private residences to civic landmarks.
          </p>

          {/* Meta grid */}
          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 max-w-2xl border-t border-border pt-8">
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Founded</div>
              <div className="font-display text-2xl md:text-3xl text-foreground">2023</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Projects</div>
              <div className="font-display text-2xl md:text-3xl text-foreground">10+</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Experience</div>
              <div className="font-display text-2xl md:text-3xl text-foreground">3 yrs</div>
            </div>
            <div data-meta-row>
              <div className="text-[9px] tracking-luxury text-muted-foreground uppercase mb-1">Cities</div>
              <div className="font-display text-2xl md:text-3xl text-foreground">04</div>
            </div>
          </div>

          {/* Contact strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 max-w-2xl">
            <a
              data-contact
              href="tel:+918080270231"
              className="group flex items-center gap-3"
            >
              <span className="text-[9px] tracking-luxury text-muted-foreground uppercase">Call</span>
              <span className="font-display text-base md:text-lg text-foreground border-b border-border group-hover:border-accent group-hover:text-accent transition-colors">
                +91 80802 70231
              </span>
            </a>
            <a
              data-contact
              href="mailto:gangajraistudios05@gmail.com"
              className="group flex items-center gap-3"
            >
              <span className="text-[9px] tracking-luxury text-muted-foreground uppercase">Write</span>
              <span className="font-display text-base md:text-lg text-foreground border-b border-border group-hover:border-accent group-hover:text-accent transition-colors lowercase">
                gangajraistudios05@gmail.com
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT — image strip */}
        <div className="col-span-12 md:col-span-5 relative">
          <div ref={stripRef} className="grid grid-rows-3 gap-4 md:gap-5 h-[80vh] md:h-[78vh] mt-4 md:mt-0">
            <figure data-strip-img className="relative overflow-hidden border border-border group">
              <img
                src={IMG.exteriorNight}
                alt="Façade at dusk"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 backdrop-blur-sm px-2 py-1">
                01 — Façade
              </figcaption>
            </figure>
            <figure data-strip-img className="relative overflow-hidden border border-border group">
              <img
                src={IMG.interiorArchEvening}
                alt="Interior arches"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 backdrop-blur-sm px-2 py-1">
                02 — Interior
              </figcaption>
            </figure>
            <figure data-strip-img className="relative overflow-hidden border border-border group">
              <img
                src={IMG.residenceExterior}
                alt="Residence"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 backdrop-blur-sm px-2 py-1">
                03 — Residence
              </figcaption>
            </figure>
          </div>

          {/* Rotating circular badge */}
          <div
            data-badge
            className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32"
          >
            <div className="absolute inset-0 rounded-full border border-border bg-background/70 backdrop-blur-sm" />
            <div className="absolute inset-1 rounded-full border border-accent/30" />
            <svg
              data-badge-ring
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <path
                  id="badgeCircle"
                  d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text className="fill-foreground/80" style={{ fontSize: 8, letterSpacing: 4 }}>
                <textPath href="#badgeCircle">
                  GAN GAJRAI STUDIO · CRAFTED BEYOND ORDINARY ·
                </textPath>
              </text>
            </svg>
            <div className="relative font-display text-accent text-2xl">✦</div>
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
