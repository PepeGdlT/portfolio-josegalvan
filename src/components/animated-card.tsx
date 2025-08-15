'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de brillo */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Efecto de borde animado */}
      <div className={`absolute inset-0 border-2 border-transparent transition-all duration-300 ${
        isHovered ? 'border-blue-500/50 animate-pulse' : ''
      }`} />
      
      <CardContent className="relative z-10 p-6">
        {children}
      </CardContent>
    </Card>
  );
}