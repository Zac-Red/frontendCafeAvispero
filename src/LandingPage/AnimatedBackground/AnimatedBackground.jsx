import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Crear partículas (granos de café)
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      container.appendChild(particle);
    }

    // Animar partículas
    gsap.set('.particle', {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: () => Math.random(),
      scale: () => Math.random() * 0.6 + 0.2,
    });

    gsap.to('.particle', {
      y: '-=50',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: () => Math.random() * 2 + 2,
    });
  }, []);

  return <div ref={containerRef} className="background-container"></div>;
};

export default AnimatedBackground;
