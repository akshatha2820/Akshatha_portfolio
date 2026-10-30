import React, { useState } from 'react';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CosmicOrbitSection from './components/CosmicOrbitSection';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CvViewerModal from './components/CvViewerModal';
import { playModalOpenSound, playModalCloseSound } from './utils/audioSystem';
import './App.css';

export default function App() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  const handleOpenCv = () => {
    playModalOpenSound();
    setIsCvOpen(true);
  };

  const handleCloseCv = () => {
    playModalCloseSound();
    setIsCvOpen(false);
  };

  return (
    <div className="app-universe">
      {/* Dynamic Animated Cosmic Starfield & Space Atmosphere */}
      <Starfield />

      {/* Atmospheric Ambient Glows */}
      <div className="cosmic-nebula-glow nebula-orange" aria-hidden="true" />
      <div className="cosmic-nebula-glow nebula-cyan" aria-hidden="true" />
      <div className="cosmic-nebula-glow nebula-violet" aria-hidden="true" />

      {/* Sticky Cosmic Navigation with Sound FX Toggle */}
      <Navbar onOpenCv={handleOpenCv} />

      {/* Main Content Universe */}
      <main>
        <Hero onOpenCv={handleOpenCv} />
        <About />
        {/* Enlarged Interactive 3D Solar System Orrery */}
        <CosmicOrbitSection />
        <Projects />
        <Skills />
        <Journey />
        <Contact onOpenCv={handleOpenCv} />
      </main>

      {/* Cosmic Footer */}
      <Footer onOpenCv={handleOpenCv} />

      {/* Fullscreen Interactive Curriculum Vitae Viewer Modal */}
      <CvViewerModal 
        isOpen={isCvOpen} 
        onClose={handleCloseCv} 
      />
    </div>
  );
}
