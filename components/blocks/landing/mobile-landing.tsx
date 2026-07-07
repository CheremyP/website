'use client';

import Image, { type StaticImageData } from 'next/image';
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './mobile-landing.module.scss';
import {
  ai,
  bits,
  bonsai,
  computer,
  growth,
  gpu,
  wall_e,
} from '../../ui/data';
import {
  macClassic,
  chatgptLaptop,
  cloudCompute,
  robotics,
  wafer,
} from '../../ui/mobile-landing-data';

const HEADLINE_LINES = ['AI tailored', 'for every', 'business'];

type FloatingImageConfig = {
  src: StaticImageData;
  width: string;
  left: string;
  duration: number;
  phase: number;
  zIndex: number;
  staticTop: string;
};

const FLOATING_IMAGES: FloatingImageConfig[] = [
  { src: bits, width: '20vw', left: '4%', duration: 8, phase: 0, zIndex: 3, staticTop: '8%' },
  { src: bonsai, width: '19vw', left: '72%', duration: 9, phase: 0.083, zIndex: 2, staticTop: '16%' },
  { src: computer, width: '21vw', left: '8%', duration: 10, phase: 0.167, zIndex: 4, staticTop: '52%' },
  { src: growth, width: '18vw', left: '78%', duration: 8.5, phase: 0.25, zIndex: 3, staticTop: '24%' },
  { src: wall_e, width: '22vw', left: '2%', duration: 11, phase: 0.333, zIndex: 5, staticTop: '68%' },
  { src: gpu, width: '20vw', left: '68%', duration: 9.5, phase: 0.417, zIndex: 2, staticTop: '12%' },
  { src: ai, width: '19vw', left: '14%', duration: 12, phase: 0.5, zIndex: 4, staticTop: '44%' },
  { src: macClassic, width: '21vw', left: '82%', duration: 8, phase: 0.583, zIndex: 3, staticTop: '32%' },
  { src: chatgptLaptop, width: '18vw', left: '6%', duration: 10.5, phase: 0.667, zIndex: 5, staticTop: '76%' },
  { src: cloudCompute, width: '20vw', left: '70%', duration: 9, phase: 0.75, zIndex: 2, staticTop: '56%' },
  { src: robotics, width: '22vw', left: '18%', duration: 11.5, phase: 0.833, zIndex: 4, staticTop: '20%' },
  { src: wafer, width: '19vw', left: '74%', duration: 8.5, phase: 0.92, zIndex: 3, staticTop: '64%' },
];

type FloatingImageProps = {
  config: FloatingImageConfig;
  flowDirection: number;
  shouldReduceMotion: boolean | null;
};

function FloatingImage({ config, flowDirection, shouldReduceMotion }: FloatingImageProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scopeRef.current;
    if (!el || shouldReduceMotion) return;

    const travel = window.innerHeight * 1.3;
    const keyframes = flowDirection === -1 ? [0, -travel] : [-travel, 0];

    const controls = animate(el, { y: keyframes }, {
      duration: config.duration,
      delay: -(config.phase * config.duration),
      ease: 'linear',
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [flowDirection, shouldReduceMotion, config]);

  return (
    <div
      ref={scopeRef}
      className={`${styles.floatingImage} ${shouldReduceMotion ? styles.floatingImageStatic : ''}`}
      style={{
        left: config.left,
        width: config.width,
        zIndex: config.zIndex,
        top: shouldReduceMotion ? config.staticTop : undefined,
      }}
    >
      <Image
        src={config.src}
        alt=""
        role="presentation"
        className={styles.floatingImageMedia}
        sizes="30vw"
        priority
      />
    </div>
  );
}

type MobileLandingProps = {
  className?: string;
};

export default function MobileLanding({ className }: MobileLandingProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const prevScrollY = useRef(0);
  const [flowDirection, setFlowDirection] = useState(-1);

  useEffect(() => {
    prevScrollY.current = scrollY.get();
  }, [scrollY]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - prevScrollY.current;
    prevScrollY.current = latest;
    if (delta < -0.5) {
      setFlowDirection(1);
    } else if (delta > 0.5) {
      setFlowDirection(-1);
    }
  });

  return (
    <section
      className={`${styles.hero} ${className ?? ''}`}
      data-header-theme="adaptive"
      aria-label="Hero"
    >
      <div className={styles.floatLayer} aria-hidden="true">
        {FLOATING_IMAGES.map((config, index) => (
          <FloatingImage
            key={index}
            config={config}
            flowDirection={flowDirection}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      <div className={styles.headlineWrap}>
        <h1 className="sr-only">AI tailored for every business</h1>
        <div className={styles.headline} aria-hidden="true">
          {HEADLINE_LINES.map((line) => (
            <p key={line} className={styles.headlineLine}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
