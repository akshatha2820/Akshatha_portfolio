import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileDown, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Eye 
} from 'lucide-react';
import { RESUME_PATH, PERSONAL_INFO } from '../data/portfolioData';
import { playModalCloseSound, playClickSound } from '../utils/audioSystem';
import './CvViewerModal.css';

export default function CvViewerModal({ isOpen, onClose }) {
  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="cv-modal-overlay" 
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum Vitae Viewer"
      >
        <motion.div 
          className="cv-modal-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="cv-modal-header">
            <div className="cv-modal-title-col">
              <div className="cv-modal-title">
                <FileText size={18} color="var(--accent-orange)" />
                <span>Akshatha — Official Curriculum Vitae</span>
              </div>
              <span className="cv-modal-subtitle">
                Poornaprajna Inst. of Management • MCA 9.02 CGPA • Cloud Certified
              </span>
            </div>

            <div className="cv-modal-actions">
              {/* Open in New Tab for full browser native PDF controls */}
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="cv-action-btn"
                title="Open CV in a new browser tab"
              >
                <ExternalLink size={15} />
                <span>Open Fullscreen</span>
              </a>

              {/* Download Option */}
              <a
                href={RESUME_PATH}
                download="Akshatha_Resume.pdf"
                onClick={() => playClickSound()}
                className="cv-action-btn"
                title="Download PDF to device"
              >
                <FileDown size={15} />
                <span>Download PDF</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                className="cv-close-btn"
                onClick={handleClose}
                aria-label="Close CV Viewer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Helper Notice for smaller screens */}
          <div className="cv-mobile-notice">
            <span>Viewing on a mobile device?</span>
            <a 
              href={RESUME_PATH} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cv-mobile-open-link"
            >
              <span>Tap to Open Fullscreen PDF</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* PDF Viewer Body */}
          <div className="cv-modal-body">
            <iframe
              src={`${RESUME_PATH}#toolbar=1&navpanes=0`}
              title="Akshatha's Curriculum Vitae"
              className="cv-pdf-frame"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
