import { useCallback } from 'react';
import Particles from 'react-particles-js';

interface ParticlesBackgroundProps {
  color: string;
  count: number;
}

export const ParticlesBackground = ({ color, count }: ParticlesBackgroundProps) => {
  const particlesInit = useCallback(async (engine: any) => {
    await engine.load();
  }, []);

  return (
    <Particles
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      params={{
        particles: {
          number: {
            value: count,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: color,
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: color,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
        },
        retina_detect: true,
      }}
    />
  );
}; 