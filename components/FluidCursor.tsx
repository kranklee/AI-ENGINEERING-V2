'use client';
import { useEffect } from 'react';
import useFluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    // Skip on touch-only devices — WebGL fluid isn't useful without mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;
    useFluidCursor();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
