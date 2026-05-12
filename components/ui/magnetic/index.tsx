'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = {
  children: React.ReactElement;
};

export default function Magnetic({ children }: Props) {
  const magnetic = useRef<HTMLSpanElement | null>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    xTo.current = gsap.quickTo(magnetic.current, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    }) as unknown as (v: number) => void;

    yTo.current = gsap.quickTo(magnetic.current, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    }) as unknown as (v: number) => void;

    return () => {
      xTo.current = null;
      yTo.current = null;
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    xTo.current?.(x * 0.35);
    yTo.current?.(y * 0.35);
  };

  const onMouseLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <span
      ref={magnetic}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  );
}