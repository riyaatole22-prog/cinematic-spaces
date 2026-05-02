import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { IMG } from "@/lib/images";

/**
 * Scroll-driven cinematic scene.
 * Reads window scroll and drives a smoothed progress (0..1) used to:
 *  - dolly the camera forward through a series of image planes
 *  - shift lighting from cool day -> warm evening
 *  - reveal corridor arches at the end
 */

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? window.scrollY / max : 0;
    };
    const loop = () => {
      current += (target - current) * 0.08;
      setP(current);
      raf = requestAnimationFrame(loop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

function ImagePlane({
  url,
  position,
  rotation = [0, 0, 0],
  scale = [4, 2.4, 1],
  opacity = 1,
}: {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  opacity?: number;
}) {
  const tex = useLoader(THREE.TextureLoader, url);
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    // subtle parallax tilt from cursor
    ref.current.rotation.x = rotation[0] + pointer.y * 0.02;
    ref.current.rotation.y = rotation[1] + pointer.x * 0.02;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshStandardMaterial
        map={tex}
        transparent
        opacity={opacity}
        roughness={0.9}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Rig({ progress }: { progress: number }) {
  useFrame(({ camera, clock }) => {
    // Camera dollies forward through the scene as we scroll
    const z = THREE.MathUtils.lerp(8, -42, progress);
    const y = THREE.MathUtils.lerp(0.2, 0.6, progress);
    const breathe = Math.sin(clock.elapsedTime * 0.4) * 0.08;
    camera.position.set(0, y + breathe, z);
    camera.lookAt(0, y * 0.8, z - 4);
  });
  return null;
}

function Lights({ progress }: { progress: number }) {
  const warm = useRef<THREE.PointLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    // Day -> warm evening transition
    const warmIntensity = THREE.MathUtils.lerp(0.4, 2.4, progress);
    const keyIntensity = THREE.MathUtils.lerp(1.1, 0.35, progress);
    if (warm.current) warm.current.intensity = warmIntensity;
    if (key.current) key.current.intensity = keyIntensity;
  });
  return (
    <>
      <ambientLight intensity={0.55} color="#f5e8d6" />
      <directionalLight ref={key} position={[6, 8, 10]} intensity={1.1} color="#e8eef7" />
      <pointLight ref={warm} position={[0, 2, -10]} intensity={0.4} color="#ff9a4d" distance={40} decay={1.6} />
      <pointLight position={[-6, 1, -22]} intensity={1.2} color="#ffb070" distance={20} decay={2} />
      <pointLight position={[6, 1, -22]} intensity={1.2} color="#ffb070" distance={20} decay={2} />
    </>
  );
}

function Scene({ progress }: { progress: number }) {
  // Z-positions that match scroll sections
  const planes = useMemo(
    () => [
      // Hero — exterior cafe at z=0
      { url: IMG.exteriorDay, pos: [0, 0.4, 0] as [number, number, number], scale: [7, 4, 1] as [number, number, number] },
      // crossfade exterior night above
      { url: IMG.exteriorNight, pos: [0, 0.4, -0.05] as [number, number, number], scale: [7, 4, 1] as [number, number, number], fadeIn: [0.05, 0.18] as [number, number] },

      // Section 1 — interior reveal
      { url: IMG.interiorPerspective, pos: [0, 0.5, -10] as [number, number, number], scale: [8, 4.6, 1] as [number, number, number] },

      // Section 2 — alternating gallery
      { url: IMG.interiorDay, pos: [-3.6, 0.3, -16] as [number, number, number], scale: [4.2, 2.6, 1] as [number, number, number], rot: [0, 0.25, 0] as [number, number, number] },
      { url: IMG.archesDay, pos: [3.6, 0.6, -19] as [number, number, number], scale: [4.2, 2.6, 1] as [number, number, number], rot: [0, -0.25, 0] as [number, number, number] },
      { url: IMG.interiorArchEvening, pos: [-3.6, 0.4, -23] as [number, number, number], scale: [4.2, 2.6, 1] as [number, number, number], rot: [0, 0.25, 0] as [number, number, number] },
      { url: IMG.archesEvening, pos: [3.6, 0.5, -26] as [number, number, number], scale: [4.2, 2.6, 1] as [number, number, number], rot: [0, -0.25, 0] as [number, number, number] },

      // Section 3 — lighting moment (ceiling)
      { url: IMG.ceilingDay, pos: [0, 1.2, -31] as [number, number, number], scale: [6, 3.6, 1] as [number, number, number] },
      { url: IMG.ceilingWarm, pos: [0, 1.2, -31.05] as [number, number, number], scale: [6, 3.6, 1] as [number, number, number], fadeIn: [0.55, 0.72] as [number, number] },

      // Section 5 — corridor symmetry (centered)
      { url: IMG.corridorArches, pos: [0, 0.4, -38] as [number, number, number], scale: [7, 4.2, 1] as [number, number, number] },
    ],
    []
  );

  return (
    <>
      <Lights progress={progress} />
      <Rig progress={progress} />
      <fog attach="fog" args={["#1a1410", 8, 60]} />

      {planes.map((p, i) => {
        let opacity = 1;
        if (p.fadeIn) {
          const [a, b] = p.fadeIn;
          opacity = THREE.MathUtils.smoothstep(progress, a, b);
        }
        return (
          <ImagePlane
            key={i}
            url={p.url}
            position={p.pos}
            scale={p.scale}
            rotation={p.rot ?? [0, 0, 0]}
            opacity={opacity}
          />
        );
      })}
    </>
  );
}

export function CinematicScene() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.2, 8], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene progress={progress} />
      </Canvas>
      {/* vignette + grain overlays */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
    </div>
  );
}
