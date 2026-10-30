import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Cloud, 
  Languages as LanguagesIcon,
  CheckCircle2 
} from 'lucide-react';
import { JOURNEY_MILESTONES, LANGUAGES } from '../data/portfolioData';
import './Journey.css';

const MILESTONE_ICON_MAP = {
  education: GraduationCap,
  certification: Cloud,
  achievement: Award
};

export default function Journey() {
  return (
    <section id="journey" className="section" aria-label="My Journey">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>CHRONICLES & MILESTONES</span>
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Journey & Milestones</span>
          </h2>
          <p className="section-subtitle">
            A chronological trajectory marked by academic distinction, recognized leadership, and continuous technical certification.
          </p>
        </div>

        {/* Constellation Timeline */}
        <div className="journey-timeline-wrapper">
          {JOURNEY_MILESTONES.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const IconComponent = MILESTONE_ICON_MAP[item.type] || GraduationCap;

            return (
              <motion.div 
                key={item.id}
                className={`journey-milestone-item ${isLeft ? 'journey-item-left' : 'journey-item-right'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                {/* Center Orbital Node */}
                <div className="timeline-center-node" aria-hidden="true">
                  <div className="node-pulse-inner" />
                </div>

                {/* Period Column (Desktop) */}
                <div className="timeline-period-col">
                  <span className="timeline-period-text">{item.period}</span>
                </div>

                {/* Content Card */}
                <div className="cosmic-card timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-mobile-period">{item.period}</span>
                    <span className="meta-badge meta-badge-orange">
                      <IconComponent size={14} />
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-institution">{item.institution}</div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Spoken Languages Cosmic Bar */}
        <motion.div 
          className="journey-languages-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="languages-label">
            <LanguagesIcon size={20} color="var(--accent-orange)" />
            <span>Linguistic Communication:</span>
          </div>

          <div className="languages-pills">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="language-pill">
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{lang.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({lang.level})</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
