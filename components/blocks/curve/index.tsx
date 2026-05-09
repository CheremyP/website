'use client';
import React, { useEffect, useState } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './style.module.scss';

export default function Curve({ progress }: { progress: MotionValue<number> }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const path = useTransform(progress, [0, 1], [
    `M0 0 L${windowWidth} 0 Q${windowWidth/2} 300 0 0 Z`,
    `M0 0 L${windowWidth} 0 Q${windowWidth/2} 0 0 0 Z`
  ]);

  if (windowWidth === 0) return null;

  return (
    <div className={styles.curveContainer}>
      <svg width="100%" height="300px" viewBox={`0 0 ${windowWidth} 300`} preserveAspectRatio="none">
        <motion.path fill="#FFFFFF" d={path} />
      </svg>
    </div>
  );
}
