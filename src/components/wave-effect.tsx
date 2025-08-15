'use client';

import { useEffect, useRef } from 'react';

export default function WaveEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y = Math.sin((x * 0.01) + time) * 20 + Math.sin((x * 0.02) + time * 1.5) * 10 + canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      time += 0.02;
      animationId = requestAnimationFrame(drawWave);
    };

    resizeCanvas();
    drawWave();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-10"
      style={{ height: '200px' }}
    />
  );
}