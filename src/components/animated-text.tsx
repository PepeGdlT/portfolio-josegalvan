'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function AnimatedTextInner({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    // Generar delays aleatorios solo una vez en el cliente
    setDelays(Array.from({ length: text.length }, () => 50 + Math.random() * 50));
  }, [text]);

  useEffect(() => {
    if (delays.length === 0) return;
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delays[currentIndex]);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delays]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse inline-block w-1 h-6 bg-blue-500 ml-1 align-middle"></span>
      )}
    </span>
  );
}

const AnimatedText = dynamic(() => Promise.resolve(AnimatedTextInner), { ssr: false });
export default AnimatedText;
