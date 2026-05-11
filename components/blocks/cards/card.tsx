'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, m, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url?: string;
  color?: string;
  link?: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const Card = ({i, title, description, src, progress, range, targetScale}: CardProps) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div ref={container} className={styles.cardContainer}>
      <m.div 
        style={{scale, top:`calc(-5vh + ${i * 100}px)`}} 
        className={styles.card}
      >
        <div className={styles.header}>
          <span className={styles.number}>0{i + 1}</span>
          <h2>{title}</h2>
        </div>
        
        <div className={styles.body}>
          <div className={styles.contentLeft}>
            <p className={styles.description}>{description}</p>
            <hr className={styles.divider} />
            <div className={styles.features}>
              <ul>
                <li>User Research</li>
                <li>Accessibility</li>
                <li>User Experience Design</li>
                <li>User Interface Design</li>
                <li>Webshop Design</li>
              </ul>
              <ul>
                <li>Design Systems</li>
                <li>Native App Design</li>
                <li>Web Design</li>
                <li>Visual Prototyping</li>
                <li>User Testing</li>
              </ul>
            </div>
          </div>

          <div className={styles.imageContainer} style={{ position: 'relative' }}>
            <m.div
              className={styles.inner}
              style={{scale: imageScale, position: 'relative', width: '100%', height: '100%'}}
            >
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={`/services/${src}`}
                alt="image" 
              />
            </m.div>
          </div>
        </div>
      </m.div>
    </div>
  )
}

export default Card