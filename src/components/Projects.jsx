import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2,
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import { PROJECTS, LINKEDIN_URL } from '../data/portfolioData';
import { playModalOpenSound, playModalCloseSound, playClickSound } from '../utils/audioSystem';
import CaseStudyModal from './CaseStudyModal';
import './Projects.css';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section id="projects" className="section" aria-label="Project Galaxy">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-badge">
            <Sparkles size={14} />
            <span>PROJECT GALAXY</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="section-subtitle">
            Deep dive into end-to-end full-stack architectures and real-time mobile platforms built to solve complex operational challenges with algorithmic rigor.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="projects-container">
          {PROJECTS.map((project, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <motion.article 
                key={project.id}
                className={`project-card ${isReverse ? 'project-card-reverse' : ''}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                {/* Clean Project Visual Column */}
                <div className="project-preview-col">
                  {project.illustrationType === 'microfinance' ? (
                    <div className="project-visual-card microfinance-visual">
                      <div className="visual-icon-ring">
                        <span className="visual-main-icon">💰</span>
                      </div>
                      <h4 className="visual-card-title">Microfinance Platform</h4>
                      <div className="visual-feature-pills">
                        <span className="visual-pill">📍 Geo-Routing (Haversine)</span>
                        <span className="visual-pill">🛡️ Risk Scoring Engine</span>
                        <span className="visual-pill">💳 Razorpay Gateway</span>
                        <span className="visual-pill">📋 EMI Calculator</span>
                        <span className="visual-pill">👥 Multi-Tier Approval</span>
                        <span className="visual-pill">🗺️ OpenStreetMap API</span>
                      </div>
                      <div className="visual-stack-label">PHP · MySQL · JavaScript · Bootstrap</div>
                    </div>
                  ) : (
                    <div className="project-visual-card forkroute-visual">
                      <div className="visual-icon-ring">
                        <span className="visual-main-icon">📱</span>
                      </div>
                      <h4 className="visual-card-title">ForkRoute App</h4>
                      <div className="visual-feature-pills">
                        <span className="visual-pill">🍽️ Live Kitchen Sync</span>
                        <span className="visual-pill">🔥 Firebase Realtime DB</span>
                        <span className="visual-pill">💳 Razorpay Payments</span>
                        <span className="visual-pill">📊 Manager Analytics</span>
                        <span className="visual-pill">🪑 Table-Side Ordering</span>
                        <span className="visual-pill">🔐 Role-Based Access</span>
                      </div>
                      <div className="visual-stack-label">Android · Java · Firebase · Razorpay</div>
                    </div>
                  )}
                </div>

                {/* Project Info Column */}
                <div className="project-info-col">
                  <div className="project-meta-row">
                    <span className="meta-badge meta-badge-orange">
                      {project.timeline}
                    </span>
                    <span className="meta-badge">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>

                  <p className="project-summary">{project.summary}</p>

                  {/* Highlights Bullet List */}
                  <ul className="project-highlights-list">
                    {project.keyFeatures.slice(0, 3).map((feature, i) => (
                      <li key={i} className="project-highlight-bullet">
                        <CheckCircle2 size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="project-tech-stack">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: View Details & LinkedIn */}
                  <div className="project-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        playModalOpenSound();
                        setActiveModalProject(project);
                      }}
                      title="Inspect full project details & architecture"
                    >
                      <FileText size={18} />
                      <span>View Details</span>
                    </button>

                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      className="btn btn-secondary"
                      title="View project details on Akshatha's LinkedIn profile"
                    >
                      <LinkedInIcon size={18} />
                      <span>View on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => {
          playModalCloseSound();
          setActiveModalProject(null);
        }}
      />
    </section>
  );
}
