"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const slides = [
  ["overview.png", "Agents in combat"],
  ["steering-debug.png", "Steering debug view"],
  ["battle-map.png", "Full battle map"],
  ["combat.png", "Autonomous combat"],
  ["arena.png", "Agents and enemy base"],
] as const;

export default function IadjGallery({ language }: { language: "en" | "es" }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 4800);
    return () => window.clearInterval(timer);
  }, []);
  const [src, alt] = slides[active];
  const previous = () => setActive((value) => (value - 1 + slides.length) % slides.length);
  const next = () => setActive((value) => (value + 1) % slides.length);
  return (
    <div className="iadj-gallery" aria-label={language === "es" ? "Capturas del videojuego IADJ" : "IADJ game screenshots"}>
      <div className="iadj-gallery-main" style={{ "--iadj-image": `url(/projects/iadj/${src})` } as CSSProperties}>
        <Image src={`/projects/iadj/${src}`} alt={language === "es" ? ({ "overview.png": "Agentes en combate", "steering-debug.png": "Vista de depuración de steering", "battle-map.png": "Mapa completo de batalla", "combat.png": "Combate autónomo", "arena.png": "Agentes y base enemiga" } as Record<string, string>)[src] : alt} width={520} height={260} priority={active === 0} />
        <div className="iadj-gallery-controls">
          <button type="button" onClick={previous} aria-label={language === "es" ? "Captura anterior" : "Previous screenshot"}><ChevronLeft size={16} /></button>
          <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <button type="button" onClick={next} aria-label={language === "es" ? "Siguiente captura" : "Next screenshot"}><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="iadj-gallery-dots" role="tablist" aria-label={language === "es" ? "Capturas" : "Screenshots"}>
        {slides.map(([slide, label], index) => <button key={slide} type="button" role="tab" aria-selected={active === index} aria-label={label} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} />)}
      </div>
    </div>
  );
}
