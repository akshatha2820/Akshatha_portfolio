import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Layout, 
  Database, 
  Wrench, 
  Cpu, 
  CloudRain, 
  Orbit, 
  Layers 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playClickSound, playNavSound, playHoverSound } from '../utils/audioSystem';
import './Skills.css';

const CATEGORY_ICON_MAP = {
  Terminal: Terminal,
  Layout: Layout,
  Database: Database,
  Wrench: Wrench,
  Cpu: Cpu,
  CloudRain: CloudRain
};

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [showOrbitView, setShowOrbitView] = useState(false);

  const filterTabs = ['ALL', ...SKILL_CATEGORIES.map((c) => c.name)];

  const displayedCategories = selectedFilter === 'ALL'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.name === selectedFilter);

  return (
    <section id="skills" className="section" aria-label="My Technology Universe">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>TECHNOLOGY ORBITS</span>
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Technology Universe</span>
          </h2>
          <p className="section-subtitle">
            Curated technical proficiencies grounded in programming fundamentals, full-stack ecosystems, database systems, and active cloud engineering certifications.
          </p>
        </div>

        {/* Controls: Filter Pills & Supplementary Orbit View Toggle */}
        <div className="skills-controls">
          <div className="skills-filter-pills" role="tablist" aria-label="Skill categories">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`filter-btn ${selectedFilter === tab ? 'active' : ''}`}
                onClick={() => {
                  playClickSound();
                  setSelectedFilter(tab);
                }}
              >
                {tab === 'ALL' ? 'All Domains' : tab}
              </button>
            ))}
          </div>

          <a
            href="#solar-orbit"
            className="orbit-toggle-btn active"
            onClick={(e) => {
              e.preventDefault();
              playNavSound();
              document.querySelector('#solar-orbit')?.scrollIntoView({ behavior: 'smooth' });
            }}
            title="Explore Enlarged Interactive 3D Solar System"
          >
            <Orbit size={16} />
            <span>Enlarged 3D Solar System</span>
          </a>
        </div>

        {/* Supplementary Interactive Cosmic Orbit Visualizer */}
        <AnimatePresence>
          {showOrbitView && (
            <motion.div 
              className="orbit-universe-stage"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Central Glowing Core: Computer Science Core */}
              <div className="orbit-sun-core">
                CORE CS
              </div>

              {/* Orbit 1: Foundational Languages */}
              <div className="tech-orbit-ring tech-orbit-1">
                <div className="orbit-planet-node">Java</div>
                <div className="orbit-planet-node" style={{ top: '100%', left: '50%' }}>Python</div>
                <div className="orbit-planet-node" style={{ top: '50%', left: '0%' }}>PHP</div>
              </div>

              {/* Orbit 2: Full-Stack & Mobile */}
              <div className="tech-orbit-ring tech-orbit-2">
                <div className="orbit-planet-node cyan">React</div>
                <div className="orbit-planet-node cyan" style={{ top: '100%', left: '50%' }}>Android Studio</div>
                <div className="orbit-planet-node cyan" style={{ top: '50%', left: '100%' }}>MySQL</div>
                <div className="orbit-planet-node cyan" style={{ top: '50%', left: '0%' }}>Firebase</div>
              </div>

              {/* Orbit 3: Cloud & Specialized */}
              <div className="tech-orbit-ring tech-orbit-3">
                <div className="orbit-planet-node gold">NPTEL Cloud</div>
                <div className="orbit-planet-node gold" style={{ top: '100%', left: '50%' }}>NLP</div>
                <div className="orbit-planet-node gold" style={{ top: '50%', left: '100%' }}>Git & GitHub</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Readable Skills Grid */}
        <div className="skills-main-content">
          {displayedCategories.map((category, catIdx) => {
            const IconComponent = CATEGORY_ICON_MAP[category.icon] || Layers;

            return (
              <motion.div 
                key={category.name}
                className="skills-category-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              >
                <div className="category-header">
                  <div className="category-icon-box">
                    <IconComponent size={18} />
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                </div>

                <div className="skills-grid">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-card-top">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level-badge">{skill.level}</span>
                      </div>
                      <p className="skill-desc">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
