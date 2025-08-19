'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className = "", ...rest }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10; // inclinación vertical
    const ry = ((x / rect.width) - 0.5) * 10;  // inclinación horizontal
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${isHovered ? 1.05 : 1})`;
  };
  const handleLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <Card
      {...rest}
      className={`relative overflow-hidden transition-transform duration-300 will-change-transform ${className}`}
      onMouseEnter={(e) => { setIsHovered(true); e.currentTarget.style.transition = 'transform 150ms ease'; }}
      onMouseLeave={(e) => { setIsHovered(false); handleLeave(e); }}
      onMouseMove={handleMove}
    >
      {/* Efecto de brillo */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Efecto de borde animado */}
      <div className={`pointer-events-none absolute inset-0 border-2 border-transparent transition-all duration-300 ${
        isHovered ? 'border-blue-500/50 animate-pulse' : ''
      }`} />
      <CardContent className="relative z-10 p-6">
        {children}
      </CardContent>
    </Card>
  );
}