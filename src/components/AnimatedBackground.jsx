import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let ripples = [];
    let mouse = { x: null, y: null, radius: 150 };
    let hue = 200;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 100;
        this.opacity = 0.5;
        this.hue = hue;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      update() {
        this.radius += 3;
        this.opacity -= 0.01;
        return this.opacity > 0;
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.originalSize = this.size;
        this.originalOpacity = this.opacity;
        this.angle = Math.random() * 360;
        this.isActivated = false;
        this.activationTime = 0;
        this.scrollOffset = 0;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y + this.scrollOffset);
        ctx.rotate(this.angle * Math.PI / 180);
        
        if (this.isActivated) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.3)`;
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-this.size * 2, 0);
          ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${this.opacity * 0.3})`;
          ctx.lineWidth = this.size / 2;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${this.opacity})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(97, 175, 239, ${this.opacity})`;
          ctx.fill();
        }
        
        ctx.restore();
      }

      update() {
        // Apply scroll velocity effect
        if (Math.abs(scrollVelocity) > 0.5) {
          this.angle += scrollVelocity * 0.1;
          this.size = this.originalSize + Math.abs(scrollVelocity) * 0.2;
          this.opacity = Math.min(0.8, this.originalOpacity + Math.abs(scrollVelocity) * 0.05);
          
          // Add some horizontal movement based on scroll
          this.x += Math.sin(this.angle) * scrollVelocity * 0.2;
          
          // Create trail effect during fast scrolling
          if (Math.abs(scrollVelocity) > 2) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - scrollVelocity, this.y);
            ctx.strokeStyle = `rgba(97, 175, 239, ${this.opacity * 0.3})`;
            ctx.lineWidth = this.size * 0.5;
            ctx.stroke();
          }
        } else {
          // Return to original state
          this.size = this.originalSize + (this.size - this.originalSize) * 0.9;
          this.opacity = this.originalOpacity + (this.opacity - this.originalOpacity) * 0.9;
          this.angle *= 0.95;
        }

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.isActivated = true;
            this.activationTime += 0.1;
            
            let angle = this.activationTime * 0.2;
            let spiralX = Math.cos(angle) * distance * 0.2;
            let spiralY = Math.sin(angle) * distance * 0.2;
            
            this.x -= directionX * 2 + spiralX;
            this.y -= directionY * 2 + spiralY;
            
            this.size = this.originalSize + Math.sin(this.activationTime * 0.3) * 3 + 3;
            this.angle += 5;
            this.opacity = this.originalOpacity + Math.sin(this.activationTime * 0.5) * 0.3 + 0.3;
          } else {
            this.isActivated = false;
            this.activationTime = Math.max(0, this.activationTime - 0.1);
            
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx/20;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy/20;
            }
          }
        }

        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;

        if (mouse.x == null || mouse.y == null) {
          this.x = this.baseX;
          this.y = this.baseY;
          this.isActivated = false;
          this.activationTime = 0;
        }

        return true;
      }
    }

    const init = () => {
      particles = [];
      ripples = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 20000, 80);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.15;
            const color = particles[i].isActivated || particles[j].isActivated 
              ? `hsla(${hue}, 100%, 50%, ${opacity})`
              : `rgba(97, 175, 239, ${opacity})`;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.1;
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hue = (hue + 0.5) % 360;
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connect();
      
      // Gradually reduce scroll velocity
      scrollVelocity *= 0.95;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    setCanvasSize();
    init();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
};

export default AnimatedBackground;
