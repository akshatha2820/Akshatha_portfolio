import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  Cloud, 
  GraduationCap, 
  Award, 
  Briefcase 
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  ABOUT_HIGHLIGHTS 
} from '../data/portfolioData';
import './About.css';

const ICON_MAP = {
  Code2: Code2,
  Cpu: Cpu,
  Cloud: Cloud
};

export default function About() {
  return (
    <section id="about" className="section" aria-label="About My Universe">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>DISCOVERY LOG</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">My Universe</span>
          </h2>
          <p className="section-subtitle">
            A fusion of rigorous academic foundations, full-stack application development, and an ongoing journey into cloud computing and intelligent systems.
          </p>
        </div>

        {/* Editorial Top Grid */}
        <div className="about-grid-top">
          {/* Detailed Summary Narrative */}
          <motion.div 
            className="cosmic-card about-summary-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-badge-row">
              <span className="meta-badge meta-badge-orange">
                <Briefcase size={14} />
                <span>{PERSONAL_INFO.currentStatus}</span>
              </span>
            </div>

            <p className="about-p">
              I am an MCA student at <strong>Poornaprajna Institute of Management</strong> with a CGPA of <strong>9.02/10</strong>, driven by a deep curiosity for how scalable software and distributed cloud infrastructure intersect to solve real-world problems.
            </p>

            <p className="about-p">
              My engineering approach centers on practical implementation: from modeling automated microfinance loan assessments with geospatial branch routing to building real-time Android restaurant ecosystems backed by Firebase. I believe the strongest code is born from solid fundamentals in <strong>Data Structures, Algorithms, OOP, and Relational Database design</strong>.
            </p>

            <p className="about-p">
              Having earned the <strong>NPTEL Cloud Computing Certification (2026)</strong> and being honored as a <strong>Rajya Puraskar Awardee</strong> by The Bharat Scouts & Guides, I bring structured discipline, collaborative leadership, and a steadfast dedication to continuous learning.
            </p>
          </motion.div>

          {/* Academic & Milestones Highlights Card */}
          <motion.div 
            className="cosmic-card about-metrics-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Profile Avatar Badge */}
            <div className="about-profile-badge-item">
              <div className="about-avatar-wrapper">
                <img 
                  src="/profile.jpg" 
                  alt="Akshatha — MCA Student" 
                  className="about-avatar-img"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="about-profile-name">{PERSONAL_INFO.fullName}</div>
                <div className="about-profile-subtitle">Software Developer & Cloud Engineer</div>
                <div className="about-profile-loc">Byndoor, Karnataka, India</div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon-box">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="metric-value">9.02 CGPA</div>
                <div className="metric-label">Master of Computer Applications (MCA) — Poornaprajna Inst.</div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon-box" style={{ background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38BDF8' }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="metric-value">8.95 CGPA</div>
                <div className="metric-label">Bachelor of Computer Applications (BCA) — Bhandarkars' College</div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon-box" style={{ background: 'rgba(251, 191, 36, 0.12)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#FBBF24' }}>
                <Award size={22} />
              </div>
              <div>
                <div className="metric-value">Rajya Puraskar</div>
                <div className="metric-label">Governor's Award for Leadership & Community Service</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Core Highlight Cards */}
        <div className="about-pillars-grid">
          {ABOUT_HIGHLIGHTS.map((pillar, idx) => {
            const IconComponent = ICON_MAP[pillar.icon] || Code2;
            return (
              <motion.div
                key={pillar.id}
                className="cosmic-card pillar-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <div className="pillar-header">
                  <div className="pillar-icon-wrap">
                    <IconComponent size={24} />
                  </div>
                  <span className="pillar-badge">{pillar.badge}</span>
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc || pillar.description}</p>

                <div className="pillar-tags">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="pillar-tag">{tag}</span>
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
