import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate static / twinkling stars
    const starCount = Math.floor((width * height) / 8000); // Responsive star count
    const stars = [];

    const starColors = [
      '#FFFFFF',
      '#F5EFE6',
      '#E2E8F0',
      '#38BDF8',
      '#FF7A00',
      '#FCD34D'
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        vy: (Math.random() * 0.08 + 0.02) // Gentle drift
      });
    }

    // Shooting star system
    let shootingStar = null;
    let nextShootingStarTime = Date.now() + Math.random() * 5000 + 4000;

    const spawnShootingStar = () => {
      const startX = Math.random() * (width * 0.7) + width * 0.1;
      const startY = Math.random() * (height * 0.3);
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 12 + 16;

      shootingStar = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 80 + 70,
        life: 1.0,
        decay: 0.025
      };
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.y += star.vy;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }

        const alpha = prefersReducedMotion
          ? star.baseAlpha
          : Math.max(0.1, Math.min(1, star.baseAlpha + Math.sin(star.twinklePhase) * 0.35));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Handle shooting stars
      if (!prefersReducedMotion) {
        if (!shootingStar && now > nextShootingStarTime) {
          spawnShootingStar();
          nextShootingStarTime = now + Math.random() * 9000 + 6000;
        }

        if (shootingStar) {
          shootingStar.x += shootingStar.dx;
          shootingStar.y += shootingStar.dy;
          shootingStar.life -= shootingStar.decay;

          if (shootingStar.life > 0) {
            const tailX = shootingStar.x - shootingStar.dx * 3.5;
            const tailY = shootingStar.y - shootingStar.dy * 3.5;

            const gradient = ctx.createLinearGradient(
              tailX,
              tailY,
              shootingStar.x,
              shootingStar.y
            );
            gradient.addColorStop(0, 'rgba(255, 122, 0, 0)');
            gradient.addColorStop(0.5, `rgba(255, 200, 120, ${shootingStar.life * 0.4})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.life})`);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(shootingStar.x, shootingStar.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.8;
            ctx.lineCap = 'round';
            ctx.globalAlpha = shootingStar.life;
            ctx.stroke();
          } else {
            shootingStar = null;
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* Deep Space Gradients & Nebulae */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 122, 0, 0.07) 0%, transparent 60%), radial-gradient(ellipse at 15% 75%, rgba(56, 189, 248, 0.05) 0%, transparent 55%), #0B1020'
        }}
      />
      
      {/* Star Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
