'use client';
import styles from './style.module.scss';
import { projects } from './data';
import Card from './card';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function Cards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <main ref={container} className={styles.main}>
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05);
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            url={project.link}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}