'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const speed = 0.18; // suavizado

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
    };

    const animate = () => {
      x += (tx - x) * speed;
      y += (ty - y) * speed;
      cursor.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
      requestAnimationFrame(animate);
    };

    const addHover = () => cursor.classList.add('scale-150','mix-blend-difference');
    const removeHover = () => cursor.classList.remove('scale-150','mix-blend-difference');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    animate();

    return () => {
      document.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-cyan-400/60 backdrop-blur-sm bg-cyan-400/10 transition-transform duration-300 ease-out will-change-transform hidden md:block" />
      <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-cyan-300 will-change-transform hidden md:block" />
    </>
  );
}

