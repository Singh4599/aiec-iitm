import { useEffect, useRef } from 'react';

const SplashCursor = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let isMouseDown = false;

    // Optimized particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Optimized animation loop with throttling
    const animate = (currentTime) => {
      if (currentTime - lastTimeRef.current < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw(ctx);

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Add new particles on mouse move
      if (isMouseDown && particles.length < 50) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Setup
    handleResize();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'none',
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          pointerEvents: 'auto'
        }}
      />
    </div>
  );
};

export default SplashCursor;
