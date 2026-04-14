import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let raf: number;
    const follow = () => {
      setTrailing(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [pos, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        className="fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="fixed w-8 h-8 rounded-full border border-primary/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-none"
        style={{
          left: trailing.x,
          top: trailing.y,
          boxShadow: '0 0 20px hsl(43 50% 54% / 0.3)',
        }}
      />
    </>
  );
};

export default CustomCursor;
