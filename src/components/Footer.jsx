import React from 'react';
import { ArrowUp, Mail, FileDown } from 'lucide-react';
import { LINKEDIN_URL, RESUME_PATH, EMAIL_ADDRESS } from '../data/portfolioData';
import './Footer.css';

export default function Footer({ onOpenCv }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={scrollToTop}>
              <div className="logo-saturn-icon">
                <div className="logo-sphere" />
                <div className="logo-ring" />
              </div>
              <span className="logo-text">DEVVERSE</span>
            </div>
            <p className="footer-desc">
              A bespoke cosmic developer portfolio showcasing full-stack web platforms, native Android applications, and cloud engineering fundamentals by Akshatha.
            </p>
          </div>

          {/* Quick Sections */}
          <div className="footer-links-col">
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links-list">
              <li><a href="#hero">Galaxy Entrance</a></li>
              <li><a href="#about">About My Universe</a></li>
              <li><a href="#projects">Project Galaxy</a></li>
              <li><a href="#skills">Technology Orbits</a></li>
              <li><a href="#journey">Chronicles & Journey</a></li>
              <li><a href="#contact">Contact Station</a></li>
            </ul>
          </div>

          {/* Channels & Documents */}
          <div className="footer-links-col">
            <div className="footer-col-title">Channels & Dossier</div>
            <ul className="footer-links-list">
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL_ADDRESS}`}>
                  Direct Email
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenCv} 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  View Curriculum Vitae (CV)
                </button>
              </li>
              <li>
                <a href={RESUME_PATH} download="Akshatha_Resume.pdf">
                  Download Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Akshatha. DEVVERSE — All rights reserved.
          </div>

          <button 
            type="button" 
            className="back-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Return to top of page"
          >
            <span>Ascend to Orbit</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
