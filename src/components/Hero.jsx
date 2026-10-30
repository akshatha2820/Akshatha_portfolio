import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Mail, 
  GraduationCap, 
  Award, 
  Cloud,
  Orbit 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import SaturnPlanet from './SaturnPlanet';
import { 
  PERSONAL_INFO, 
  LINKEDIN_URL, 
  EMAIL_ADDRESS 
} from '../data/portfolioData';
import { playClickSound, playNavSound } from '../utils/audioSystem';
import './Hero.css';

export default function Hero({ onOpenCv }) {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    playNavSound();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Galaxy Entrance">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Personal Intro & Profile Avatar */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Cosmic Avatar Profile Badge */}
            <div className="hero-profile-avatar-row">
              <div className="hero-avatar-frame">
                <img 
                  src="/profile.jpg" 
                  alt="Akshatha — MCA Student & Software Developer" 
                  className="hero-avatar-img"
                  loading="eager"
                />
              </div>

              <div className="hero-avatar-meta">
                <div className="eyebrow-badge hero-eyebrow" style={{ marginBottom: 4 }}>
                  <Sparkles size={14} className="text-orange" />
                  <span>{PERSONAL_INFO.eyebrow}</span>
                </div>
                <div className="hero-status-pill">
                  <span className="status-dot-pulse" />
                  <span>Available for Opportunities</span>
                </div>
              </div>
            </div>

            {/* Main Name */}
            <h1 className="hero-name">
              <span className="hero-name-gradient">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Headline */}
            <div className="hero-headline">
              <span>{PERSONAL_INFO.title}</span>
            </div>

            {/* Compelling Short Introduction */}
            <p className="hero-intro">
              {PERSONAL_INFO.shortIntro}
            </p>

            {/* Cosmic Verified Meta Badges */}
            <div className="hero-meta-badges">
              <div className="meta-badge meta-badge-orange">
                <GraduationCap size={14} />
                <span>MCA 9.02 CGPA | BCA 8.95 CGPA</span>
              </div>
              <div className="meta-badge">
                <Cloud size={14} color="#38BDF8" />
                <span>NPTEL Cloud Certified (2026)</span>
              </div>
              <div className="meta-badge">
                <Award size={14} color="#FBBF24" />
                <span>Rajya Puraskar Awardee</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="hero-cta-group">
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="btn btn-primary"
              >
                <span>Explore My Projects</span>
                <ArrowRight size={18} />
              </a>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenCv();
                }}
                className="btn btn-secondary hero-view-cv-btn"
                title="View Akshatha's Curriculum Vitae"
              >
                <Eye size={18} />
                <span>View CV</span>
              </button>

              <a
                href="#solar-orbit"
                onClick={(e) => handleScrollTo(e, 'solar-orbit')}
                className="btn btn-outline-orange"
                title="Experience Interactive 3D Solar System"
              >
                <Orbit size={18} />
                <span>3D Solar System</span>
              </a>
            </div>

            {/* Quick Verified Social Strips */}
            <div className="hero-social-strip">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="hero-social-link"
                title="Connect on LinkedIn"
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                onClick={() => playClickSound()}
                className="hero-social-link"
                title="Send an email"
              >
                <Mail size={16} />
                <span>{EMAIL_ADDRESS}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Signature Rotating Saturn Planet */}
          <motion.div 
            className="hero-planet-col"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <SaturnPlanet />
          </motion.div>
        </div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <a 
        href="#about" 
        onClick={(e) => handleScrollTo(e, 'about')}
        className="hero-scroll-indicator" 
        aria-label="Scroll to About My Universe"
      >
        <div className="scroll-mouse-icon">
          <div className="scroll-mouse-wheel" />
        </div>
        <span>EXPLORE UNIVERSE</span>
      </a>
    </section>
  );
}
