import React, { useState, useEffect } from 'react';
import './SaturnPlanet.css';

export default function SaturnPlanet() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="saturn-universe-container"
      style={{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
      }}
      aria-label="Interactive 3D Saturn planetary system with independently rotating orbital rings"
    >
      {/* Radiant Atmospheric Corona Glow */}
      <div className="saturn-corona-aura" />

      {/* Orbit 1: Titan Moon */}
      <div className="orbit-track orbit-track-1">
        <div className="moon-satellite moon-titan" title="Titan Satellite" />
      </div>

      {/* Orbit 2: Enceladus Moon */}
      <div className="orbit-track orbit-track-2">
        <div className="moon-satellite moon-enceladus" title="Enceladus Satellite" />
      </div>

      <div className="saturn-system">
        {/* Back portion of the rings (drawn behind planet) */}
        <div className="rings-back" aria-hidden="true">
          <div className="ring-disc-secondary" />
          <div className="ring-disc-primary" />
          <div className="ring-disc-inner" />
        </div>

        {/* The Central Saturn Planet Body */}
        <div className="saturn-globe-wrapper">
          <div className="saturn-globe">
            {/* Continuously Rotating Atmospheric Bands */}
            <div className="saturn-surface-bands" />
            
            {/* Cast shadow of the ring system across Saturn's hemisphere */}
            <div className="saturn-ring-shadow" />
            
            {/* 3D Volumetric Lighting, Terminator Occlusion & Atmospheric Rim Light */}
            <div className="saturn-light-overlay" />
          </div>
        </div>

        {/* Front portion of the rings (drawn in front of planet for true 3D depth) */}
        <div className="rings-front" aria-hidden="true">
          <div className="ring-disc-secondary" />
          <div className="ring-disc-primary" />
          <div className="ring-disc-inner" />
        </div>
      </div>

      {/* Cosmic Telemetry Tag */}
      <div className="planet-tag">
        <span className="planet-tag-dot" />
        <span>SECTOR: SATURN-06 // CORE ACTIVE</span>
      </div>
    </div>
  );
}
