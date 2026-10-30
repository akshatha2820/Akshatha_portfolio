import React, { useState, useEffect } from 'react';
import { Menu, X, Eye, Compass, Volume2, VolumeX } from 'lucide-react';
import { RESUME_PATH } from '../data/portfolioData';
import { isSoundEnabled, toggleSound, playNavSound, playClickSound } from '../utils/audioSystem';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Orbit 3D', href: '#solar-orbit' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCv }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section based on scroll offset
      const sections = ['hero', 'about', 'projects', 'skills', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playNavSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundActive(nextState);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="nav-logo"
          onClick={(e) => {
            playClickSound();
            handleNavClick(e, '#hero');
          }}
          aria-label="DEVVERSE — Back to Galaxy Entrance"
        >
          <div className="logo-saturn-icon">
            <div className="logo-sphere" />
            <div className="logo-ring" />
          </div>
          <span className="logo-text">DEVVERSE</span>
          <span className="logo-universe-badge">PORTFOLIO</span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links-desktop">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li 
                  key={item.href} 
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Sound FX Toggle Button */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className={`btn btn-secondary nav-sound-toggle-btn ${soundActive ? 'sound-active' : 'sound-muted'}`}
            title={soundActive ? 'Audio Feedback Active (Click to Mute)' : 'Audio Feedback Muted (Click to Enable)'}
            aria-label={soundActive ? 'Mute Interface Sound Effects' : 'Enable Interface Sound Effects'}
          >
            {soundActive ? <Volume2 size={16} color="var(--accent-orange)" /> : <VolumeX size={16} color="var(--text-muted)" />}
            <span className="nav-sound-label">{soundActive ? 'Audio ON' : 'Audio OFF'}</span>
            {soundActive && <span className="sound-pulse-dot" />}
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenCv();
            }}
            className="btn btn-outline-orange nav-resume-btn"
            title="View Akshatha's Curriculum Vitae"
          >
            <Eye size={16} />
            <span>View CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <ul className="mobile-links">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href} className={isActive ? 'active' : ''}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <span>{item.label}</span>
                    <Compass size={16} opacity={0.6} />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              onClick={handleSoundToggle}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {soundActive ? <Volume2 size={18} color="var(--accent-orange)" /> : <VolumeX size={18} color="var(--text-muted)" />}
              <span>{soundActive ? 'Sound Effects: Enabled' : 'Sound Effects: Muted'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Eye size={18} />
              <span>View Curriculum Vitae (CV)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
