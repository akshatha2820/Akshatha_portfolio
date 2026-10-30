import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Compass, 
  RotateCcw, 
  Play, 
  Pause, 
  X, 
  Sparkles, 
  Eye, 
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SOLAR_BODIES } from '../data/solarSystemData';
import { 
  playPlanetSelectSound, 
  playClickSound, 
  playHoverSound 
} from '../utils/audioSystem';
import './SolarSystem3D.css';

/**
 * Procedural Texture Generator for High-Fidelity Celestial Stations
 */
function createPlanetTexture(type, baseColor, detailColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (type === 'sun') {
    const grad = ctx.createRadialGradient(256, 128, 10, 256, 128, 256);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.2, '#FFE17D');
    grad.addColorStop(0.6, '#FF8A00');
    grad.addColorStop(1, '#CC4400');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === 'jupiter' || type === 'saturn') {
    // Gas giant cloud bands
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 8) {
      const alpha = Math.sin(y * 0.15) * 0.25 + 0.25;
      ctx.fillStyle = y % 16 === 0 ? detailColor : 'rgba(0,0,0,0.18)';
      ctx.globalAlpha = alpha;
      ctx.fillRect(0, y, 512, 6);
    }
    // Great red spot for Jupiter
    if (type === 'jupiter') {
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#CC3311';
      ctx.beginPath();
      ctx.ellipse(320, 160, 40, 24, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'earth') {
    ctx.fillStyle = '#1E4BA8'; // Deep blue oceans
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#2E7D32'; // Continents
    // Procedural landmasses
    for (let i = 0; i < 40; i++) {
      const x = ((i * 73) % 460) + 20;
      const y = ((i * 47) % 180) + 38;
      ctx.beginPath();
      ctx.ellipse(x, y, 35, 20, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Rocky or ice planets
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = detailColor;
    for (let i = 0; i < 60; i++) {
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 12 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Ring Texture Generator for Saturn
 */
function createSaturnRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(235, 185, 110, 0.4)');
  grad.addColorStop(0.48, 'rgba(215, 160, 90, 0.7)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0)'); // Cassini division
  grad.addColorStop(0.62, 'rgba(255, 210, 140, 0.65)');
  grad.addColorStop(0.85, 'rgba(195, 140, 75, 0.4)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 32);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function SolarSystem3D({ onSelectPlanet }) {
  const mountRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const sceneObjectsRef = useRef({
    planets: [],
    camera: null,
    controls: null,
    targetCameraPos: new THREE.Vector3(0, 52, 95),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    isFocusing: false
  });

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 3000);
    camera.position.set(0, 52, 95);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 220;
    controls.minDistance = 6;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't go completely below orbital plane

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x8090c0, 1.1);
    scene.add(ambientLight);

    // Warm directional fill so planet colors stay vivid everywhere
    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.9);
    fillLight.position.set(-80, 60, 40);
    scene.add(fillLight);

    const sunLight = new THREE.PointLight(0xffcc66, 6.5, 600);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 5. Starfield Background in 3D
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(180, 550);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      starPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = radius * Math.cos(phi);
      starPos[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.25,
      transparent: true,
      opacity: 0.85
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 6. Build Celestial Nodes, Sun & Orbit Tracks
    const planetEntries = [];

    SOLAR_BODIES.forEach((body) => {
      let planetMesh;
      let pivotGroup = new THREE.Group();
      scene.add(pivotGroup);

      if (body.nodeType === 'sun') {
        // Sun Sphere with Emissive Material
        const sunGeo = new THREE.SphereGeometry(body.size, 48, 48);
        const sunTex = createPlanetTexture('sun', body.color, body.accentColor);
        const sunMat = new THREE.MeshBasicMaterial({
          map: sunTex,
          color: 0xffffff
        });
        planetMesh = new THREE.Mesh(sunGeo, sunMat);
        planetMesh.position.set(0, 0, 0);

        // Sun Glow Corona Outer Layer
        const coronaGeo = new THREE.SphereGeometry(body.size * 1.18, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: 0xff7a00,
          transparent: true,
          opacity: 0.28,
          side: THREE.BackSide
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        planetMesh.add(coronaMesh);

        scene.add(planetMesh);
      } else {
        // Planet Sphere with Standard Material (Reacts to Sun light)
        const planetGeo = new THREE.SphereGeometry(body.size, 36, 36);
        let textureType = 'rocky';
        if (body.nodeType === 'earth') textureType = 'earth';
        else if (body.nodeType === 'jupiter') textureType = 'jupiter';
        else if (body.nodeType === 'saturn') textureType = 'saturn';

        const planetTex = createPlanetTexture(textureType, body.color, body.accentColor);
        // Rich planet color map per node type
        const planetColorMap = {
          mercury: { color: 0xB5A090, emissive: 0x5A4A40, roughness: 0.88, metalness: 0.08 },
          venus:   { color: 0xF0C060, emissive: 0x8B5E10, roughness: 0.70, metalness: 0.10 },
          earth:   { color: 0x2B66E2, emissive: 0x0A2A6A, roughness: 0.65, metalness: 0.12 },
          mars:    { color: 0xD44A28, emissive: 0x7A1A08, roughness: 0.82, metalness: 0.08 },
          jupiter: { color: 0xC68E56, emissive: 0x6A3A14, roughness: 0.62, metalness: 0.18 },
          saturn:  { color: 0xE0B56A, emissive: 0x7A5010, roughness: 0.68, metalness: 0.15 },
          uranus:  { color: 0x76D7EA, emissive: 0x104A5E, roughness: 0.58, metalness: 0.20 },
          neptune: { color: 0x284EE8, emissive: 0x081A8A, roughness: 0.60, metalness: 0.22 },
        };
        const pc = planetColorMap[body.nodeType] || { color: 0xaaaaaa, emissive: 0x333333, roughness: 0.8, metalness: 0.1 };
        const planetMat = new THREE.MeshStandardMaterial({
          map: planetTex,
          color: pc.color,
          emissive: pc.emissive,
          emissiveIntensity: 0.35,
          roughness: pc.roughness,
          metalness: pc.metalness
        });

        planetMesh = new THREE.Mesh(planetGeo, planetMat);
        planetMesh.position.set(body.orbitRadius, 0, 0);
        pivotGroup.add(planetMesh);

        // Saturn Rings
        if (body.hasRings) {
          const ringGeo = new THREE.RingGeometry(body.ringInnerRadius, body.ringOuterRadius, 64);
          const ringTex = createSaturnRingTexture();
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2 + 0.35; // Natural Saturn tilt
          planetMesh.add(ringMesh);
        }

        // Earth Atmosphere Layer & Moon
        if (body.hasAtmosphere) {
          const atmoGeo = new THREE.SphereGeometry(body.size * 1.05, 32, 32);
          const atmoMat = new THREE.MeshStandardMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.25,
            roughness: 1
          });
          const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
          planetMesh.add(atmoMesh);

          // Luna Moon
          const moonGeo = new THREE.SphereGeometry(0.35, 16, 16);
          const moonMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.9 });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.set(2.4, 0.4, 0);
          planetMesh.add(moonMesh);
        }

        // Draw Orbital Path Ring
        const orbitPoints = [];
        const segments = 128;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          orbitPoints.push(new THREE.Vector3(Math.cos(theta) * body.orbitRadius, 0, Math.sin(theta) * body.orbitRadius));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(body.accentColor),
          transparent: true,
          opacity: 0.22
        });
        const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
        scene.add(orbitLine);
      }

      // Generous invisible hit collider for effortless clicking and mobile taps
      const hitRadius = Math.max(body.size * (body.hasRings ? 2.5 : 1.6), 2.8);
      const hitGeo = new THREE.SphereGeometry(hitRadius, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitCollider = new THREE.Mesh(hitGeo, hitMat);
      planetMesh.add(hitCollider);

      // Tag all meshes in the subtree with bodyData
      planetMesh.traverse((child) => {
        child.userData = { bodyData: body };
      });

      planetEntries.push({
        data: body,
        mesh: planetMesh,
        pivot: pivotGroup,
        angle: Math.random() * Math.PI * 2
      });
    });

    sceneObjectsRef.current = {
      planets: planetEntries,
      camera,
      controls,
      targetCameraPos: new THREE.Vector3(0, 52, 95),
      targetLookAt: new THREE.Vector3(0, 0, 0),
      isFocusing: false
    };

    // 7. Raycasting for Planet Clicks & Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedBody = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = planetEntries.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      for (let i = 0; i < intersects.length; i++) {
        let obj = intersects[i].object;
        while (obj) {
          if (obj.userData && obj.userData.bodyData) {
            return obj.userData.bodyData;
          }
          obj = obj.parent;
        }
      }
      return null;
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const body = getIntersectedBody(e);

      if (body) {
        setHoveredPlanet(body);
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        renderer.domElement.style.cursor = 'pointer';
        playHoverSound();
      } else {
        setHoveredPlanet(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerClick = (e) => {
      const body = getIntersectedBody(e);
      if (body) {
        focusOnBody(body);
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handlePointerClick);

    // 8. Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Planet Revolutions and Rotations
      if (!isPausedRef.current) {
        planetEntries.forEach((entry) => {
          if (entry.data.orbitRadius > 0) {
            entry.angle += entry.data.orbitSpeed * 0.45;
            entry.mesh.position.x = Math.cos(entry.angle) * entry.data.orbitRadius;
            entry.mesh.position.z = Math.sin(entry.angle) * entry.data.orbitRadius;
          }
          entry.mesh.rotation.y += entry.data.rotationSpeed;
        });
      }

      // Smooth Camera Transitions
      if (sceneObjectsRef.current.isFocusing) {
        const { targetCameraPos, targetLookAt } = sceneObjectsRef.current;
        camera.position.lerp(targetCameraPos, 0.055);
        controls.target.lerp(targetLookAt, 0.055);

        if (camera.position.distanceTo(targetCameraPos) < 0.4) {
          sceneObjectsRef.current.isFocusing = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handlePointerClick);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const focusOnBody = (body) => {
    setSelectedPlanet(body);
    playPlanetSelectSound();
    if (onSelectPlanet) onSelectPlanet(body);

    const { planets, targetCameraPos, targetLookAt } = sceneObjectsRef.current;
    const entry = planets.find((p) => p.data.id === body.id);

    if (entry) {
      // Get world position of the planet
      const worldPos = new THREE.Vector3();
      entry.mesh.getWorldPosition(worldPos);

      targetLookAt.copy(worldPos);

      // Place camera at a close cinematic offset from planet
      const cameraDistance = Math.max(body.size * 3.6, 5.5);
      targetCameraPos.set(
        worldPos.x + cameraDistance * 0.7,
        worldPos.y + cameraDistance * 0.5,
        worldPos.z + cameraDistance * 0.9
      );

      sceneObjectsRef.current.isFocusing = true;
    }
  };

  const resetView = () => {
    setSelectedPlanet(null);
    playClickSound();
    const { targetCameraPos, targetLookAt } = sceneObjectsRef.current;
    targetLookAt.set(0, 0, 0);
    targetCameraPos.set(0, 52, 95);
    sceneObjectsRef.current.isFocusing = true;
  };

  const handleJumpToSection = (e, targetHref) => {
    e.preventDefault();
    playClickSound();
    const target = document.querySelector(targetHref);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="solar-stage-wrapper" aria-label="Interactive 3D Portfolio Universe">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="solar-canvas-container" />

      {/* Top HUD Controls */}
      <div className="solar-hud-top">
        <div className="solar-hud-left">
          <div className="solar-badge">
            <span className="solar-badge-dot" />
            <span>DEVVERSE CELESTIAL STATIONS // CLICK ANY NODE TO EXPLORE</span>
          </div>
        </div>

        <div className="solar-hud-controls">
          <button
            type="button"
            className="solar-ctrl-btn"
            onClick={resetView}
            title="Reset Camera to Orbit Overview"
          >
            <RotateCcw size={14} />
            <span>Reset View</span>
          </button>

          <button
            type="button"
            className={`solar-ctrl-btn ${isPaused ? 'active' : ''}`}
            onClick={() => {
              setIsPaused(!isPaused);
              playClickSound();
            }}
            title={isPaused ? 'Resume Planetary Orbits' : 'Pause Planetary Orbits'}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Hover Floating Tooltip */}
      {hoveredPlanet && (
        <div 
          className="solar-hover-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
          }}
        >
          <span>{hoveredPlanet.shortName || hoveredPlanet.name}</span>
          <span style={{ color: 'var(--accent-orange-light)', marginLeft: 6 }}>
            ({hoveredPlanet.sectionName})
          </span>
        </div>
      )}

      {/* Bottom Station Selection Bar */}
      <div className="solar-planets-bar">
        {SOLAR_BODIES.map((body) => {
          const isSelected = selectedPlanet?.id === body.id;
          return (
            <button
              key={body.id}
              type="button"
              className={`planet-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => focusOnBody(body)}
            >
              <span 
                className="chip-color-dot" 
                style={{ background: body.color, boxShadow: `0 0 6px ${body.color}` }} 
              />
              <span>{body.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Station Dossier HUD (Slide-in) */}
      {selectedPlanet && (
        <div className="planet-dossier-card" role="dialog" aria-label="Portfolio Station Information">
          <div className="dossier-header">
            <div>
              <div className="dossier-badge-pill">{selectedPlanet.badge}</div>
              <div className="dossier-title">{selectedPlanet.name}</div>
              <div className="dossier-class">{selectedPlanet.role}</div>
              <div className="dossier-sub">{selectedPlanet.subtitle}</div>
            </div>
            <button
              type="button"
              className="dossier-close-btn"
              onClick={resetView}
              aria-label="Close Station Dossier"
            >
              <X size={16} />
            </button>
          </div>

          <div className="dossier-stats-grid">
            {selectedPlanet.stats?.map((stat, idx) => (
              <div key={idx} className="dossier-stat-box">
                <div className="stat-box-label">{stat.label}</div>
                <div className="stat-box-val">{stat.value}</div>
              </div>
            ))}
          </div>

          <p className="dossier-desc">
            {selectedPlanet.description}
          </p>

          {selectedPlanet.highlights && (
            <div className="dossier-highlights">
              {selectedPlanet.highlights.map((h, i) => (
                <span key={i} className="dossier-highlight-chip">{h}</span>
              ))}
            </div>
          )}

          <div className="dossier-actions-row">
            <a
              href={selectedPlanet.navTarget}
              className="dossier-jump-btn"
              onClick={(e) => handleJumpToSection(e, selectedPlanet.navTarget)}
              title={`Navigate to ${selectedPlanet.sectionName}`}
            >
              <span>Explore {selectedPlanet.sectionName}</span>
              <ArrowRight size={14} />
            </a>

            <button
              type="button"
              className="dossier-reset-btn"
              onClick={resetView}
              title="Return to Orbit Overview"
            >
              <RotateCcw size={14} />
              <span>Overview</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
