'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';

const logos = [
  '/integrations/aws.png',
  '/integrations/azure.png',
  '/integrations/claude.png',
  '/integrations/gcp.png',
  '/integrations/gemini.png',
  '/integrations/n8n.png',
  '/integrations/nvidia.png',
  '/integrations/openai.png'
];

export default function Logos() {
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className={styles.logosSection} data-header-theme="light">
      <m.div
        className={styles.headerContainer}
        initial={{ y: shouldReduceMotion ? 0 : 40, opacity: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={transition}
      >
        <p className={styles.heading}>
          We build AI infrastructure, intelligent agents, and automations that seamlessly integrate with:
        </p>
      </m.div>
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {[...logos, ...logos].map((logo, index) => (
            <div className={styles.slide} key={index}>
              <Image 
                src={logo} 
                alt="Integration Logo" 
                width={150} 
                height={50} 
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
