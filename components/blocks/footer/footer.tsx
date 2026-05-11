'use client';

import styles from './style.module.scss';
import { useRef } from 'react';
import { useScroll, m, useTransform } from 'framer-motion';
import Magnetic from '../../ui/magnetic';
import Rounded from '../../ui/roundedbutton';
import Curve from '../curve';
import Image from 'next/image';

export default function Footer() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  const currentYear = new Date().getFullYear();

  return (
    <m.div ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <h2>Let&apos;s work</h2>
          <h2>together</h2>
          <m.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor="rgba(255, 255, 255, 0.15)" className={styles.button} onClick={() => { window.location.href = '/contact'; }}
            >
              <p>Get in touch</p>
            </Rounded>
          </m.div>
          <m.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </m.svg>
        </div>
        <div className={styles.info}>
          <div>
            <h3>Services</h3>
            <Magnetic><p>AI Strategy</p></Magnetic>
            <Magnetic><p>Cloud & Data Infrastructure</p></Magnetic>
            <Magnetic><p>Agentc AI & GenAI</p></Magnetic>
            <Magnetic><p>AI Automations</p></Magnetic>
          </div>

          <div>
            <h3>Company</h3>
            <Magnetic><p>About Us</p></Magnetic>
            <Magnetic><p>Socials</p></Magnetic>
            <Magnetic><p onClick={() => { window.location.href = '/contact'; }} style={{ cursor: 'pointer' }}>Contact</p></Magnetic>
          </div>

          <div>
            <h3>Resources</h3>
            <Magnetic><p>Blog</p></Magnetic>
            <Magnetic><p>Privacy Policy</p></Magnetic>
            <Magnetic><p>Terms of Service</p></Magnetic>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.giantText} aria-hidden="true">ARTEFCL</div>
        <div className={styles.legal}>
          <span>© {currentYear}</span>
          <span></span>
        </div>
      </div>
      
      <Curve progress={scrollYProgress} />
    </m.div>
  );
}
