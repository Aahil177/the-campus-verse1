import { useEffect, useState } from 'react';

const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="spotlight opacity-50"
      style={{
        '--x': `${mousePosition.x}%`,
        '--y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    />
  );
};

export default CursorSpotlight;