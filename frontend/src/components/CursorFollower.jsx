import React, { useEffect, useRef, useState } from 'react';
import './CursorFollower.css';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Follower position (for smooth trailing)
  const follower = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // Animation loop for smooth trailing follower
    const render = () => {
      // Lerp (Linear interpolation) for smooth following
      follower.current.x += (mouse.current.x - follower.current.x) * 0.2;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div 
      ref={cursorRef} 
      className={`cursor-follower-dot ${isVisible ? 'visible' : ''}`} 
    />
  );
};

export default CursorFollower;
