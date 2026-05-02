import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicScene } from "@/components/CinematicScene";
import { Loader } from "@/components/Loader";
import { MobileFallback } from "@/components/MobileFallback";
import { IMG, GALLERY } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

function NarrativeSection({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-anim]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const alignCls =
    align === "right" ? "ml-auto text-right" : align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <section ref={ref} className="relative z-10 h-[100svh] flex items-center px-8 md:px-16">
      <div className={`max-w-xl ${alignCls}`}>
        <div data-anim className="text-[10px] tracking-luxury text-accent uppercase mb-5">
          {eyebrow}
        </div>
        <h2 data-anim className="font-display text-4xl md:text-6xl silver-text leading-[1.05] mb-6">
          {title}
        </h2>
        <p data-anim className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-md">
          {body}
        </p>
      </div>
    </section>
  );
}

function HeroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from("[data-h1]", { opacity: 0, y: 40, duration: 1.4, ease: "power3.out" })
        .from("[data-h2]", { opacity: 0, y: 20, duration: 1.0, ease: "power2.out" }, "-=0.8")
        .from("[data-h3]", { opacity: 0, duration: 1.0 }, "-=0.6")
        .from("[data-scroll-cue]", { opacity: 0, y: -10, duration: 1.0 }, "-=0.4");

      // Fade overlay out as user scrolls past hero
      gsap.to(ref.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 h-[100svh] flex flex-col items-center justify-center text-center px-6"
    >
      <div data-h2 className="text-[10px] md:text-xs tracking-luxury text-foreground/70 uppercase mb-6">
        Gan Gajrai Studio
      </div>
      <h1
        data-h1
        className="font-display text-5xl md:text-8xl lg:text-9xl silver-text leading-[0.95] max-w-5xl text-balance"
      >
        Crafted Beyond Ordinary
      </h1>
      <div data-h3 className="mt-8 text-xs md:text-sm tracking-wider-luxury text-foreground/60 uppercase">
        Architecture &nbsp;·&nbsp; Interiors &nbsp;·&nbsp; Design
      </div>

      <div
        data-scroll-cue
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="text-[9px] tracking-luxury text-muted-foreground uppercase">Scroll</div>
        <div className="h-12 w-px bg-gradient-to-b from-foreground/60 to-transparent" />
      </div>
    </section>
  );
}

function BrandingSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-b]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const swatches = [
    { name: "Silver", color: "var(--silver)" },
    { name: "Jet Black", color: "oklch(0.1 0 0)" },
    { name: "Charcoal", color: "var(--charcoal)" },
    { name: "Taupe", color: "var(--taupe)" },
    { name: "Ivory", color: "var(--ivory)" },
  ];

  return (
    <section ref={ref} className="relative bg-background py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div data-b className="text-[10px] tracking-luxury text-accent uppercase mb-4">
          Brand Identity
        </div>
        <h2 data-b className="font-display text-4xl md:text-6xl silver-text mb-16">
          The Studio
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div data-b className="flex items-center justify-center bg-charcoal/30 border border-border rounded-sm p-12 aspect-square">
            <img src={IMG.logo} alt="GG Studios logo" className="max-h-64 w-auto object-contain" />
          </div>
          <div data-b className="space-y-6">
            <div className="text-[10px] tracking-luxury text-muted-foreground uppercase">Our Brand Story</div>
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
              GG Studios is an architecture and interior design studio driven by passion, precision and purpose.
            </p>
            <p className="text-sm text-foreground/65 leading-relaxed max-w-md">
              We create timeless spaces that reflect identity, inspire living and elevate every experience —
              from intimate cafés to civic landmarks.
            </p>
            <div className="flex gap-8 pt-4 text-[10px] tracking-luxury text-muted-foreground uppercase">
              <span>Vision</span>
              <span className="text-border">|</span>
              <span>Creativity</span>
              <span className="text-border">|</span>
              <span>Precision</span>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div data-b className="mb-16">
          <div className="text-[10px] tracking-luxury text-muted-foreground uppercase mb-6">Palette</div>
          <div className="grid grid-cols-5 gap-3 md:gap-6">
            {swatches.map((s) => (
              <div key={s.name} className="space-y-3">
                <div
                  className="aspect-[3/4] rounded-sm border border-border"
                  style={{ background: s.color }}
                />
                <div className="text-[9px] tracking-luxury text-muted-foreground uppercase">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div data-b className="grid md:grid-cols-2 gap-12 border-t border-border pt-16">
          <div>
            <div className="font-display text-7xl text-foreground mb-3">Aa</div>
            <div className="text-[10px] tracking-luxury text-muted-foreground uppercase">
              Cinzel · Playfair Display
            </div>
            <div className="text-[10px] tracking-wider-luxury text-foreground/50 uppercase mt-1">Headings</div>
          </div>
          <div>
            <div className="font-body text-7xl text-foreground mb-3 font-light">Aa</div>
            <div className="text-[10px] tracking-luxury text-muted-foreground uppercase">
              Montserrat · Avenir
            </div>
            <div className="text-[10px] tracking-wider-luxury text-foreground/50 uppercase mt-1">Body Text</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-card]"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-background py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-[10px] tracking-luxury text-accent uppercase mb-4">Selected Work</div>
        <h2 className="font-display text-4xl md:text-6xl silver-text mb-16 max-w-2xl">
          A Procession of Spaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              data-card
              className={`group relative overflow-hidden rounded-sm border border-border ${
                i % 3 === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="overflow-hidden aspect-[16/10]">
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="text-[9px] tracking-luxury text-accent uppercase mb-2">
                  0{i + 1} — Project
                </div>
                <div className="font-display text-2xl md:text-3xl text-foreground">{g.title}</div>
                <div className="text-xs text-foreground/65 mt-1 tracking-wide">{g.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-background border-t border-border px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <img src={IMG.logo} alt="" className="h-16 w-auto object-contain mb-4" />
          <div className="text-xs tracking-wider-luxury text-foreground/70 uppercase">
            Crafted Beyond Ordinary
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] tracking-luxury text-muted-foreground uppercase mb-3">Studio</div>
          <div className="text-sm text-foreground/80">Pune, Maharashtra · India</div>
          <div className="text-sm text-foreground/80">hello@ggstudios.in</div>
          <div className="text-sm text-foreground/80">+91 85000 50000</div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] tracking-luxury text-muted-foreground uppercase mb-3">Practice</div>
          <div className="text-sm text-foreground/80">Architecture</div>
          <div className="text-sm text-foreground/80">Interiors</div>
          <div className="text-sm text-foreground/80">Landscape</div>
          <div className="text-sm text-foreground/80">Consultancy</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-border mt-12 pt-6 text-[10px] tracking-luxury text-muted-foreground uppercase flex flex-col md:flex-row md:justify-between gap-2">
        <span>© Gan Gajrai Studio</span>
        <span>Vision · Creativity · Precision</span>
      </div>
    </footer>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
      <div className="flex items-center gap-3 text-foreground">
        <span className="font-display text-xl tracking-wide">GG</span>
        <span className="hidden md:inline text-[9px] tracking-luxury uppercase text-foreground/70">
          Studios
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[10px] tracking-luxury text-foreground/80 uppercase">
        <a href="#work">Work</a>
        <a href="#studio">Studio</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="text-[10px] tracking-luxury text-foreground/60 uppercase hidden md:block">
        Crafted Beyond Ordinary
      </div>
    </nav>
  );
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  // Refresh ScrollTrigger after loader exits and any image dimensions settle
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  if (isMobile) {
    return (
      <main className="relative bg-background min-h-screen">
        <Nav />
        <MobileFallback />
        <div id="studio">
          <BrandingSection />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative">
      <Nav />

      {/* Fixed 3D scene behind everything */}
      <CinematicScene />

      {/* Scroll narrative — each section is one viewport */}
      <HeroOverlay />

      <NarrativeSection
        eyebrow="01 — Threshold"
        title="Step through the glass."
        body="A quiet moment at the entrance. Light pours through black mullions onto warm terracotta walls — the city falls away."
      />

      <NarrativeSection
        eyebrow="02 — Procession"
        title="A walk between arches."
        body="Floating planes, alternating left and right, draw you deeper into the space. Daylight gives way to a softer warmth."
        align="right"
      />

      <NarrativeSection
        eyebrow="03 — Lighting"
        title="From morning to evening."
        body="Coffered ceilings glow with woven pendants. The temperature shifts — cool whites to amber — without a single cut."
      />

      <NarrativeSection
        eyebrow="04 — Detail"
        title="Crafted at every scale."
        body="Wrought iron sconces, ribbed wood paneling, hung greenery. The smallest gestures build the atmosphere."
        align="right"
      />

      <NarrativeSection
        eyebrow="05 — Symmetry"
        title="A corridor of arches."
        body="Repeated forms create depth. The eye is led, the body follows. This is the discipline of architecture."
        align="center"
      />

      {/* Reveal solid background past the 3D walkthrough */}
      <div id="work" className="relative z-10 bg-background">
        <GalleryStrip />
      </div>

      <div id="studio" className="relative z-10">
        <BrandingSection />
      </div>

      <div id="contact" className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
