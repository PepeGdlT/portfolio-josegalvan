'use client';
import { ReactNode, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 40, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
  };

  const reset = () => {
    const el = ref.current; if (!el) return; el.style.transform = 'translate(0,0)';
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}

