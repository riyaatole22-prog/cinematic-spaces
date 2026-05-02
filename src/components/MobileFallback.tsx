import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG, GALLERY } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export function MobileFallback() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <section className="relative h-[100svh] flex items-end overflow-hidden">
        <img src={IMG.exteriorNight} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 px-6 pb-16">
          <div className="text-[10px] tracking-luxury text-muted-foreground uppercase mb-3">
            Gan Gajrai Studio
          </div>
          <h1 className="font-display text-5xl silver-text">Crafted Beyond Ordinary</h1>
        </div>
      </section>

      <section className="px-6 py-20 space-y-8">
        {GALLERY.map((g, i) => (
          <figure key={i} data-fade className="space-y-3">
            <img src={g.src} alt={g.title} className="w-full rounded-sm" loading="lazy" />
            <figcaption>
              <div className="font-display text-xl text-foreground">{g.title}</div>
              <div className="text-xs text-muted-foreground tracking-wider-luxury uppercase mt-1">
                {g.caption}
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
