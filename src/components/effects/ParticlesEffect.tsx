import { FC, useEffect, useRef } from 'react';
import './animations.css';

interface ParticlesEffectProps {
  color?: string;
  count?: number;
}

export const ParticlesEffect: FC<ParticlesEffectProps> = ({ 
  color = '#00BFA5',
  count = 500 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.backgroundColor = color;
      particle.style.width = Math.random() * 6 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 120 - 10 + '%';
      particle.style.top = Math.random() * 120 - 10 + '%';
      particle.style.opacity = (Math.random() * 0.4 + 0.3).toString();
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = Math.random() * 10 + 10 + 's';
      particle.style.setProperty('--particle-speed', '0.2');
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, [color, count]);

  return <div ref={containerRef} className="particles-container" style={{ position: 'fixed' }} />;
}; 