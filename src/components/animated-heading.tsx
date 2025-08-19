'use client';
import { JSX, useEffect, useRef } from 'react';

interface AnimatedHeadingProps {
  as?: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
  delay?: number;
  variant?: 'letters-up' | 'letters-wipe' | 'gradient-slide';
}

/*
  animatedHeading
  - aquí divido el texto en letras y las animo una por una.
  variantes:
    letters-up: cada letra sube con fade y un poco de rotación.
    letters-wipe: uso una máscara horizontal que revela y hace fade.
    gradient-slide: deslizo un gradiente por las letras.
*/
export default function AnimatedHeading({
  as = 'h2',
  text,
  className = '',
  delay = 0,
  variant = 'letters-up'
}: AnimatedHeadingProps) {
  const WrapperTag: any = as;
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll('.ah-letter');
    if (!letters.length) return;

    // estado inicial según la variante que elijas
    letters.forEach(l => {
      const h = l as HTMLElement;
      h.style.opacity = '0';
      if (variant === 'letters-up') {
        h.style.transform = 'translateY(1.4em) rotateX(-90deg)';
        h.style.transformOrigin = 'bottom center';
      } else if (variant === 'letters-wipe') {
        h.style.transform = 'translateY(0.6em)';
      } else if (variant === 'gradient-slide') {
        h.style.transform = 'translateY(0.8em)';
      }
    });

    let cancelled = false;
    let started = false;
    let observer: IntersectionObserver | null = null;

    const runAnimation = async () => {
      if (started || cancelled) return;
      try {
        const mod: any = await import('animejs');
        const animeFn: any = mod.default || mod.anime || mod;
        if (typeof animeFn !== 'function' || cancelled) {
          // si animejs no está, hago el fallback inmediato
          letters.forEach(l => { const h = l as HTMLElement; h.style.opacity = '1'; h.style.transform = 'none'; });
          return;
        }
        started = true;
        const baseDelay = delay;
        const per = 35;
        const done = () => { if (!cancelled) el.dataset.animated = 'true'; };

        // añado transición css para que el fallback sea suave
        letters.forEach(l => { const h = l as HTMLElement; h.style.transition = 'opacity .6s ease, transform .6s ease'; });

        switch (variant) {
          case 'letters-wipe': {
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            if (!el.querySelector('.ah-mask')) {
              const mask = document.createElement('span');
              mask.className = 'ah-mask';
              Object.assign(mask.style, {
                position: 'absolute', inset: '0', background: 'linear-gradient(90deg,#0ea5e9,#6366f1)', transform: 'translateX(-101%)', zIndex: '1'
              });
              el.appendChild(mask);
              animeFn({ targets: mask, translateX: ['-101%', '101%'], easing: 'easeInOutQuad', duration: 900, delay });
            }
            animeFn({
              targets: letters,
              opacity: [0, 1],
              translateY: ['0.6em', '0em'],
              easing: 'easeOutQuad',
              duration: 600,
              delay: (_: any, i: number) => baseDelay + 200 + i * per,
              complete: done
            });
            break;
          }
          case 'gradient-slide': {
            el.style.backgroundImage = 'linear-gradient(90deg,#22d3ee,#6366f1,#22d3ee)';
            el.style.backgroundSize = '200% 100%';
            (el.style as any).webkitBackgroundClip = 'text';
            el.style.color = 'transparent';
            animeFn({ targets: el, backgroundPositionX: ['0%', '100%'], duration: 2500, easing: 'linear', delay });
            animeFn({
              targets: letters,
              opacity: [0, 1],
              translateY: ['0.8em', '0em'],
              easing: 'cubicBezier(.16,.84,.44,1)',
              duration: 700,
              delay: (_: any, i: number) => baseDelay + i * 40,
              complete: done
            });
            break;
          }
          case 'letters-up':
          default: {
            animeFn({
              targets: letters,
              translateY: ['1.4em', '0em'],
              rotateX: [-90, 0],
              opacity: [0, 1],
              easing: 'cubicBezier(.16,.84,.44,1)',
              duration: 650,
              delay: (_: any, i: number) => baseDelay + i * per,
              complete: done
            });
            break;
          }
        }
      } catch {
        letters.forEach(l => { const h = l as HTMLElement; h.style.opacity = '1'; h.style.transform = 'none'; });
      }
    };

    const isInViewport = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    if (isInViewport()) {
      // disparo la animación si ya está visible al montar
      runAnimation();
    } else {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runAnimation();
            if (observer) observer.disconnect();
          }
        });
      }, { root: null, threshold: 0.05 });
      observer.observe(el);
    }

    // si pasan 1200ms y no se animó, fuerzo la visibilidad
    const safety = setTimeout(() => {
      if (!started && !cancelled) {
        letters.forEach(l => { const h = l as HTMLElement; h.style.opacity = '1'; h.style.transform = 'none'; });
      }
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(safety);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      observer && observer.disconnect();
    };
  }, [text, delay, variant]);

  const split = () => (
    text.split(' ').map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap mr-2">
        {Array.from(word).map((ch, ci) => (
          <span key={ci} className="ah-letter inline-block will-change-transform opacity-0">{ch}</span>
        ))}
      </span>
    ))
  );

  return (
    <WrapperTag ref={ref} className={className + ' ah-heading relative'}>
      {split()}
    </WrapperTag>
  );
}
