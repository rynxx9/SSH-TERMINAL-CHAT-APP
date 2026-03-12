import React, { useRef, useEffect } from 'react';

const Antigravity = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#5a0fe6",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = ringRadius * 10 + (Math.random() - 0.5) * particleVariance * 50;
        particles.current.push({
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
          baseX: canvas.width / 2 + Math.cos(angle) * radius,
          baseY: canvas.height / 2 + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          size: particleSize + Math.random() * particleVariance,
          angle: angle,
          distance: radius
        });
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const t = time * 0.001 * waveSpeed;
      const pulse = Math.sin(time * 0.001 * pulseSpeed) * 0.1 + 1;

      particles.current.forEach((p, i) => {
        // Wave movement
        const waveX = Math.sin(t + p.angle * 5) * waveAmplitude * 10;
        const waveY = Math.cos(t + p.angle * 5) * waveAmplitude * 10;
        
        const targetX = p.baseX + waveX;
        const targetY = p.baseY + waveY;

        // Interaction
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceLimit = magnetRadius * 20;
          
          if (dist < forceLimit) {
            const force = (forceLimit - dist) / forceLimit;
            p.vx += (dx / dist) * force * fieldStrength * 0.5;
            p.vy += (dy / dist) * force * fieldStrength * 0.5;
          }
        }

        // Apply forces & Lerping
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += (targetX - p.x) * lerpSpeed + p.vx;
        p.y += (targetY - p.y) * lerpSpeed + p.vy;

        // Draw
        ctx.fillStyle = color;
        ctx.beginPath();
        if (particleShape === "capsule") {
          const length = p.size * 3;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle + t * rotationSpeed);
          ctx.roundRect(-p.size/2, -length/2, p.size, length, p.size);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animationFrameId = requestAnimationFrame(animate);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const onMouseLeave = () => { mouse.current.active = false; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, particleVariance, rotationSpeed, pulseSpeed, particleShape, fieldStrength]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};

export default Antigravity;
