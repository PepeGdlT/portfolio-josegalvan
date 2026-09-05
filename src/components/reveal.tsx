"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("motion-visible", entry.isIntersecting);
        if (!entry.isIntersecting || entry.target.hasAttribute("data-revealed")) continue;
        entry.target.setAttribute("data-revealed", "true");
        animations.push(entry.target.animate(
          [{ opacity: 0, transform: "translateY(38px) scale(.98)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
          { duration: 850, easing: "cubic-bezier(.16,1,.3,1)" },
        ));
      }
    }, { threshold: 0, rootMargin: "0px 0px -35px 0px" });
    const targets = element.querySelectorAll(".section-heading, article, .research-intro, .contact-links");
    if (targets.length) targets.forEach(target => observer.observe(target));
    else observer.observe(element);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
