import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Wrench, 
  Lightbulb, 
  AlertCircle 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div 
        className="modal-overlay" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <motion.div 
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <div className="eyebrow-badge" style={{ marginBottom: 8 }}>
                <Sparkles size={12} />
                <span>CASE STUDY ARCHIVE // {project.timeline}</span>
              </div>
              <h2 id="case-study-title" style={{ fontSize: '1.45rem', color: '#FFFFFF' }}>
                {project.title}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-orange-light)', marginTop: 4 }}>
                {project.subtitle}
              </p>
            </div>

            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close Case Study Modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Overview & Problem Addressed */}
            <div>
              <h3 className="modal-section-title">
                <AlertCircle size={18} color="var(--accent-orange)" />
                <span>Problem Statement & Context</span>
              </h3>
              <p className="modal-text">
                {project.problemAddressed}
              </p>
            </div>

            {/* Proposed Solution */}
            <div>
              <h3 className="modal-section-title">
                <Lightbulb size={18} color="var(--accent-gold)" />
                <span>Engineered Solution & Architecture</span>
              </h3>
              <p className="modal-text">
                {project.solution}
              </p>
            </div>

            {/* Key Implemented Features */}
            <div>
              <h3 className="modal-section-title">
                <Layers size={18} color="var(--accent-cyan)" />
                <span>Core Implemented Features</span>
              </h3>
              <ul className="modal-features-list">
                {project.keyFeatures.map((feat, index) => (
                  <li key={index} className="modal-feature-item">
                    <CheckCircle2 size={18} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Highlights */}
            <div>
              <h3 className="modal-section-title">
                <Wrench size={18} color="var(--accent-orange)" />
                <span>Technical Highlights & Algorithmic Notes</span>
              </h3>
              <ul className="modal-features-list">
                {project.technicalHighlights.map((techH, index) => (
                  <li key={index} className="modal-feature-item">
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>•</span>
                    <span>{techH}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div>
              <h3 className="modal-section-title" style={{ marginBottom: 12 }}>
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="modal-tech-pills">
                {project.technologies.map((tech) => (
                  <span key={tech} className="modal-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Project details & documentation available on LinkedIn
            </span>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                Close
              </button>

              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.88rem' }}
              >
                <LinkedInIcon size={16} />
                <span>View on LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
