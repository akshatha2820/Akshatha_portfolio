import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Orbit, Compass, ArrowRight } from 'lucide-react';
import SolarSystem3D from './SolarSystem3D';
import './CosmicOrbitSection.css';

export default function CosmicOrbitSection() {
  return (
    <section id="solar-orbit" className="section cosmic-orbit-section" aria-label="Cosmic Orbit — Interactive Portfolio Universe">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>CELESTIAL MAP // DEVVERSE ORBIT</span>
          </div>
          <h2 className="section-title">
            Cosmic Orbit — <span className="gradient-text">Interactive Portfolio Universe</span>
          </h2>
          <p className="section-subtitle">
            Explore my developer journey mapped across 3D celestial stations. Each orbital node represents an integral part of my portfolio — from Home and academic credentials to core programming skills, enterprise projects, and direct transmission channels. Click any station to inspect its dossier or jump directly to that section.
          </p>
        </div>

        {/* Enlarged 3D Solar System Stage */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <SolarSystem3D />
        </motion.div>

        {/* Exploration Instructions */}
        <div className="orbit-guide-strip">
          <div className="orbit-guide-item">
            <Compass size={16} color="var(--accent-orange)" />
            <span><strong>Click & Drag:</strong> Rotate 3D cosmic angle</span>
          </div>
          <div className="orbit-guide-item">
            <Orbit size={16} color="var(--accent-cyan)" />
            <span><strong>Scroll / Pinch:</strong> Zoom in & out</span>
          </div>
          <div className="orbit-guide-item">
            <Sparkles size={16} color="var(--accent-gold)" />
            <span><strong>Click any Station:</strong> Focus 3D camera & inspect developer dossier</span>
          </div>
        </div>
      </div>
    </section>
  );
}
