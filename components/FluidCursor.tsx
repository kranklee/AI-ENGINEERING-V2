'use client';
import { useEffect } from 'react';
import useFluidCursor from '@/hooks/use-FluidCursor';

export default function FluidCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    return useFluidCursor();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
}
