import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic still-image hero — replaces the WebGL hero.
 * - Two layered images crossfade (day -> evening) on scroll
 * - Slow Ken Burns zoom for life
 * - Subtle cursor parallax
 * - Layered typography with staggered reveal
 * - Scroll-driven fade & lift for a smooth handoff
 */
export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-eyebrow]", { opacity: 0, y: 20, duration: 1.0, delay: 0.1 })
        .from("[data-title-line]", { opacity: 0, yPercent: 110, duration: 1.4, stagger: 0.12 }, "-=0.6")
        .from("[data-meta]", { opacity: 0, y: 16, duration: 1.0 }, "-=0.7")
        .from("[data-cue]", { opacity: 0, y: -10, duration: 1.0 }, "-=0.5");

      // Slow Ken Burns
      gsap.to([dayRef.current, nightRef.current], {
        scale: 1.12,
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Scroll: crossfade day -> night, lift content, fade overlay out
      gsap.to(nightRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(layersRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // Cursor parallax
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(layersRef.current, { x: x * -14, y: y * -10, duration: 0.9, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden bg-background">
      {/* Image layers */}
      <div ref={layersRef} className="absolute inset-0 will-change-transform">
        <div
          ref={dayRef}
          className="absolute inset-0 bg-center bg-cover will-change-transform"
          style={{ backgroundImage: `url(${IMG.exteriorDay})` }}
        />
        <div
          ref={nightRef}
          className="absolute inset-0 bg-center bg-cover opacity-0 will-change-transform"
          style={{ backgroundImage: `url(${IMG.exteriorNight})` }}
        />
      </div>

      {/* Cinematic gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.7)_100%)]" />

      {/* Letterbox bars */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[6vh] bg-background/95" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[6vh] bg-background/95" />

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6"
      >
        <div data-eyebrow className="text-[10px] md:text-xs tracking-luxury text-foreground/75 uppercase mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-foreground/40" />
          Gan Gajrai Studio
          <span className="h-px w-10 bg-foreground/40" />
        </div>

        <h1 className="font-display text-5xl md:text-8xl lg:text-9xl silver-text leading-[0.95] max-w-5xl text-balance">
          <span className="block overflow-hidden"><span data-title-line className="block">Crafted</span></span>
          <span className="block overflow-hidden"><span data-title-line className="block italic font-light text-foreground/90">Beyond</span></span>
          <span className="block overflow-hidden"><span data-title-line className="block">Ordinary</span></span>
        </h1>

        <div data-meta className="mt-10 text-xs md:text-sm tracking-wider-luxury text-foreground/70 uppercase flex items-center gap-4">
          <span>Architecture</span>
          <span className="text-foreground/30">·</span>
          <span>Interiors</span>
          <span className="text-foreground/30">·</span>
          <span>Design</span>
        </div>
      </div>

      {/* Corner marks */}
      <div className="pointer-events-none absolute top-[8vh] left-6 md:left-12 text-[9px] tracking-luxury text-foreground/55 uppercase">
        N · 18.52°
      </div>
      <div className="pointer-events-none absolute top-[8vh] right-6 md:right-12 text-[9px] tracking-luxury text-foreground/55 uppercase text-right">
        Est. MMXIX
      </div>
      <div className="pointer-events-none absolute bottom-[8vh] left-6 md:left-12 text-[9px] tracking-luxury text-foreground/55 uppercase">
        Reel — 01 / 05
      </div>

      {/* Scroll cue */}
      <div
        data-cue
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="text-[9px] tracking-luxury text-foreground/70 uppercase">Begin the walkthrough</div>
        <div className="h-12 w-px bg-gradient-to-b from-foreground/70 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
