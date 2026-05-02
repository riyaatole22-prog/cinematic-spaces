import { useEffect, useState } from "react";
import { IMG } from "@/lib/images";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setExiting(true);
        setTimeout(onDone, 800);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-8 animate-float-up">
        <div className="relative h-40 w-40 md:h-52 md:w-52">
          <img
            src={IMG.logo}
            alt="GG Studios — Gan Gajrai Studio"
            className="h-full w-full object-contain"
            style={{ filter: "drop-shadow(0 0 40px oklch(0.82 0.015 90 / 0.15))" }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="text-[10px] tracking-luxury text-muted-foreground uppercase">
            Gan Gajrai Studio
          </div>
          <div className="text-xs tracking-wider-luxury text-foreground/80 uppercase">
            Crafted Beyond Ordinary
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="h-px w-48 bg-border overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] tracking-wider-luxury text-muted-foreground tabular-nums">
            {String(progress).padStart(3, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
