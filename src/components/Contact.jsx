import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  FileDown, 
  ExternalLink,
  Eye 
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import { 
  LINKEDIN_URL, 
  EMAIL_ADDRESS, 
  PHONE_NUMBER, 
  LOCATION, 
  RESUME_PATH 
} from '../data/portfolioData';
import { playClickSound } from '../utils/audioSystem';
import './Contact.css';

export default function Contact({ onOpenCv }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section" aria-label="Contact Station">
      <div className="container">
        <motion.div 
          className="contact-station-card"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>TRANSMISSION HUB</span>
          </div>

          <h2 className="contact-station-title">
            Let’s Build Something <span className="gradient-text">Meaningful.</span>
          </h2>

          <p className="contact-station-desc">
            Open for software developer internships, cloud engineering roles, and collaborative technical projects. Let's discuss how my full-stack and algorithmic background can contribute to your engineering goals.
          </p>

          {/* Contact Details Grid */}
          <div className="contact-grid">
            {/* Email Card */}
            <div className="contact-card-item">
              <div className="contact-icon-circle">
                <Mail size={22} />
              </div>
              <div>
                <div className="contact-item-title">Direct Email</div>
                <div className="contact-item-value">{EMAIL_ADDRESS}</div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card-item"
              title="Visit Akshatha's LinkedIn profile"
            >
              <div className="contact-icon-circle" style={{ background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38BDF8' }}>
                <LinkedInIcon size={22} />
              </div>
              <div>
                <div className="contact-item-title">LinkedIn Profile</div>
                <div className="contact-item-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Akshatha Shridhar Hande</span>
                  <ExternalLink size={14} color="var(--accent-orange)" />
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <div className="contact-card-item">
              <div className="contact-icon-circle" style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10B981' }}>
                <Phone size={22} />
              </div>
              <div>
                <div className="contact-item-title">Telephone</div>
                <div className="contact-item-value">{PHONE_NUMBER}</div>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-card-item">
              <div className="contact-icon-circle" style={{ background: 'rgba(251, 191, 36, 0.12)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#FBBF24' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div className="contact-item-title">Location</div>
                <div className="contact-item-value">{LOCATION}</div>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="contact-cta-bar">
            <a 
              href={`mailto:${EMAIL_ADDRESS}?subject=Opportunity%20Inquiry%20from%20DEVVERSE`}
              className="btn btn-primary"
            >
              <Mail size={18} />
              <span>Send Email</span>
            </a>

            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCopyEmail}
              title="Copy email address to clipboard"
            >
              {copied ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenCv}
              className="btn btn-outline-orange"
              title="View Akshatha's Curriculum Vitae directly"
            >
              <Eye size={18} />
              <span>View CV</span>
            </button>

            <a 
              href={RESUME_PATH}
              download="Akshatha_Resume.pdf"
              className="btn btn-secondary"
              title="Download Akshatha's Résumé PDF"
            >
              <FileDown size={18} />
              <span>Download PDF</span>
            </a>
          </div>

          {copied && (
            <div className="copy-toast">
              <Check size={14} />
              <span>Email address copied successfully!</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
