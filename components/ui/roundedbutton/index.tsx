'use client';

import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../magnetic';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: string;
  children: React.ReactNode;
};

export default function RoundedButton({ children, backgroundColor = '#303030ff', ...attributes }: Props) {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!circle.current) return;

    timeline.current = gsap.timeline({ paused: true })
      .to(circle.current, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
      .to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeline.current?.kill();
    };
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className={styles.roundedButton}
        style={{ overflow: 'hidden' }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div ref={circle} style={{ backgroundColor }} className={styles.circle}></div>
      </div>
    </Magnetic>
  );
}