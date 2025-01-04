import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized grid properties
    const GRID_SPACING = 50; // Increased spacing
    const WAVE_SPEED = 0.0003; // Slower animation
    const AMPLITUDE = 0.5; // Reduced movement

    const drawGrid = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += WAVE_SPEED;

      const columns = Math.floor(canvas.width / GRID_SPACING);
      const rows = Math.floor(canvas.height / GRID_SPACING);

      // Draw points only
      for (let i = 0; i <= columns; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * GRID_SPACING;
          const y = j * GRID_SPACING;
          
          const distanceToCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          
          const opacity = Math.max(0.1, 1 - (distanceToCenter / (canvas.width * 0.5)));
          const waveOffset = Math.sin(distanceToCenter * 0.01 + time) * AMPLITUDE;
          
          const finalX = x + waveOffset;
          const finalY = y + waveOffset;

          // Draw point
          if (opacity > 0.1) {
            ctx.fillStyle = `rgba(97, 175, 239, ${opacity * 0.2})`;
            ctx.fillRect(finalX - 1, finalY - 1, 2, 2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
};

export default GridBackground;
