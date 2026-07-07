'use client';

import { m, useReducedMotion } from 'framer-motion';
import styles from './style.module.scss';
import WorksDesktop from './works-desktop';
import WorksMobile from './works-mobile';

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className={styles.worksSection} data-header-theme="light">
      <div className={styles.container}>
        <m.h2
          className={styles.mainTitle}
          initial={{ y: shouldReduceMotion ? 0 : 40, opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={transition}
        >
          Works
        </m.h2>

        <WorksDesktop />
        <WorksMobile />
      </div>
    </section>
  );
}
