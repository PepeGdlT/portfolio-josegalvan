'use client';

import { useEffect } from 'react';
import * as anime from 'animejs';

/*
 ScrollAnimator
 ----------------
 Activa animaciones on-scroll para cualquier elemento que tenga el atributo:
   data-animate="fade-up|fade-down|fade-left|fade-right|fade-scale|blur-in"
 Atributos opcionales:
   data-animate-delay="150" (ms)
   data-animate-duration="900" (ms)
   data-animate-stagger="80" (ms por elemento dentro del contenedor)
   data-animate-once="true" (no repetir al volver a entrar)

 Ejemplo rápido:
   <div data-animate="fade-up" data-animate-stagger="60">
     <h3 data-animate>Item 1</h3>
     <h3 data-animate>Item 2</h3>
   </div>

 El componente se monta una sola vez (colocarlo en layout o en la página raíz).
*/
export default function ScrollAnimator() {
  useEffect(() => {
    const elements: HTMLElement[] = Array.from(document.querySelectorAll('[data-animate]')) as HTMLElement[];

    // Pre-estilos (estado inicial) para evitar flash sin animación
    elements.forEach(el => {
      if (el.dataset.animated === 'true') return;
      const type = el.dataset.animate || 'fade-up';
      el.style.opacity = '0';
      el.style.willChange = 'transform, opacity, filter';
      switch (type) {
        case 'fade-down':
          el.style.transform = 'translateY(-24px)';
          break;
        case 'fade-left':
          el.style.transform = 'translateX(-32px)';
          break;
        case 'fade-right':
          el.style.transform = 'translateX(32px)';
          break;
        case 'fade-scale':
          el.style.transform = 'scale(.92)';
          break;
        case 'fade-lux':
          el.style.transform = 'translateY(32px) scale(.95)';
          el.style.filter = 'blur(12px)';
          el.style.opacity = '0';
          el.style.clipPath = 'inset(0 0 0 0 round 12px)';
          break;
        case 'blur-in':
          el.style.filter = 'blur(8px)';
          el.style.transform = 'translateY(16px)';
          break;
        case 'fade-up':
        default:
          el.style.transform = 'translateY(24px)';
          break;
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.dataset.animating === 'true') return;

        const type = el.dataset.animate || 'fade-up';
        const duration = parseInt(el.dataset.animateDuration || '900', 10);
        const delay = parseInt(el.dataset.animateDelay || '0', 10);
        const once = el.dataset.animateOnce === 'true';

        const common: any = {
          targets: el,
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration,
          delay,
          complete: () => {
            el.dataset.animated = 'true';
            el.dataset.animating = 'false';
            if (!once) {
              // Permite re-animar al salir y volver si no es once
              observer.unobserve(el);
              setTimeout(() => observer.observe(el), 50);
            }
          }
        };

        let specific: any = {};
        switch (type) {
          case 'fade-down':
            specific = { translateY: [-24, 0] };
            break;
          case 'fade-left':
            specific = { translateX: [-32, 0] };
            break;
          case 'fade-right':
            specific = { translateX: [32, 0] };
            break;
          case 'fade-scale':
            specific = { scale: [0.92, 1] };
            break;
          case 'fade-lux':
            specific = { translateY: [32, 0], scale: [0.95, 1], filter: ['blur(12px)', 'blur(0px)'], opacity: [0,1], duration: duration + 300, easing: 'cubicBezier(.16,.84,.44,1)' };
            break;
          case 'blur-in':
            specific = { translateY: [16, 0], filter: ['blur(8px)', 'blur(0px)'], duration: duration + 200 };
            break;
          case 'fade-up':
          default:
            specific = { translateY: [24, 0] };
            break;
        }

        el.dataset.animating = 'true';
        (anime as any)({ ...common, ...specific });
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15,
    });

    // Gestión de stagger: si un contenedor tiene data-animate-stagger, distribuir a hijos directos
    const containersWithStagger = new Set<HTMLElement>();
    elements.forEach(el => {
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      const staggerVal = parent.dataset.animateStagger;
      if (staggerVal && !containersWithStagger.has(parent)) {
        containersWithStagger.add(parent);
        const children = Array.from(parent.querySelectorAll(':scope > [data-animate]')) as HTMLElement[];
        const step = parseInt(staggerVal, 10) || 80;
        children.forEach((child, idx) => {
          if (!child.dataset.animateDelay) child.dataset.animateDelay = String(idx * step);
        });
      }
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
