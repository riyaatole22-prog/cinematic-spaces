import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RESIDENCE_PROJECT } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export function ResidenceProject() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-r]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );

      // Subtle parallax on cover
      gsap.to("[data-r-cover]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const [first, second, third, fourth, fifth, sixth] = RESIDENCE_PROJECT.images.slice(1);

  return (
    <section
      ref={ref}
      className="relative bg-background py-32 px-6 md:px-16 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 items-end">
          <div className="md:col-span-7">
            <div data-r className="text-[10px] tracking-luxury text-accent uppercase mb-4">
              Project 02 — Residential
            </div>
            <h2
              data-r
              className="font-display text-5xl md:text-7xl silver-text leading-[1.0]"
            >
              {RESIDENCE_PROJECT.title}
            </h2>
          </div>
          <div data-r className="md:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-[10px] tracking-luxury uppercase">
              <div>
                <div className="text-muted-foreground mb-1">Location</div>
                <div className="text-foreground/85">{RESIDENCE_PROJECT.location}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Year</div>
                <div className="text-foreground/85">{RESIDENCE_PROJECT.year}</div>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {RESIDENCE_PROJECT.summary}
            </p>
          </div>
        </div>

        {/* Hero cover */}
        <figure
          data-r
          className="relative overflow-hidden border border-border aspect-[16/9] mb-6"
        >
          <img
            data-r-cover
            src={RESIDENCE_PROJECT.cover}
            alt={RESIDENCE_PROJECT.title}
            className="absolute inset-0 h-full w-full object-cover scale-110"
          />
          <figcaption className="absolute bottom-5 left-5 text-[10px] tracking-luxury text-foreground uppercase bg-background/70 px-3 py-1.5">
            01 — {RESIDENCE_PROJECT.images[0].title}
          </figcaption>
        </figure>

        {/* Editorial mosaic */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Row 1: wide + tall */}
          <figure data-r className="col-span-12 md:col-span-8 relative overflow-hidden border border-border aspect-[16/10]">
            <img src={first.src} alt={first.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              02 — {first.title}
            </figcaption>
          </figure>
          <figure data-r className="col-span-12 md:col-span-4 relative overflow-hidden border border-border aspect-[3/4] md:aspect-auto">
            <img src={second.src} alt={second.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              03 — {second.title}
            </figcaption>
          </figure>

          {/* Row 2: 3 squares */}
          <figure data-r className="col-span-12 md:col-span-4 relative overflow-hidden border border-border aspect-[4/5]">
            <img src={third.src} alt={third.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              04 — {third.title}
            </figcaption>
          </figure>
          <figure data-r className="col-span-12 md:col-span-4 relative overflow-hidden border border-border aspect-[4/5]">
            <img src={fourth.src} alt={fourth.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              05 — {fourth.title}
            </figcaption>
          </figure>
          <figure data-r className="col-span-12 md:col-span-4 relative overflow-hidden border border-border aspect-[4/5]">
            <img src={fifth.src} alt={fifth.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              06 — {fifth.title}
            </figcaption>
          </figure>

          {/* Row 3: full bleed quote + tall image */}
          <div data-r className="col-span-12 md:col-span-7 flex items-center bg-charcoal/40 border border-border p-10 md:p-14">
            <div>
              <div className="text-[10px] tracking-luxury text-accent uppercase mb-4">Design Note</div>
              <p className="font-display text-2xl md:text-3xl text-foreground leading-snug italic">
                "Living screens of green dissolve the line between architecture and landscape — the home breathes with the garden."
              </p>
              <div className="text-[10px] tracking-luxury text-muted-foreground uppercase mt-6">
                — Studio Notes
              </div>
            </div>
          </div>
          <figure data-r className="col-span-12 md:col-span-5 relative overflow-hidden border border-border aspect-[4/5] md:aspect-auto">
            <img src={sixth.src} alt={sixth.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
            <figcaption className="absolute bottom-4 left-4 text-[9px] tracking-luxury text-foreground uppercase bg-background/70 px-2 py-1">
              07 — {sixth.title}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
