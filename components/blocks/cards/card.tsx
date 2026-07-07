'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, m, useScroll, MotionValue, useReducedMotion } from 'framer-motion';
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

const FEATURES = [
  ['User Research', 'Accessibility', 'User Experience Design', 'User Interface Design', 'Webshop Design'],
  ['Design Systems', 'Native App Design', 'Web Design', 'Visual Prototyping', 'User Testing'],
];

const Card = ({i, title, description, src, progress, range, targetScale}: CardProps) => {
  const container = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

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
            <m.p
              className={styles.description}
              initial={{ y: shouldReduceMotion ? 0 : 30, opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={transition}
            >
              {description}
            </m.p>
            <hr className={styles.divider} />
            <div className={styles.features}>
              {FEATURES.map((list, listIndex) => (
                <ul key={listIndex}>
                  {list.map((feature, featureIndex) => (
                    <m.li
                      key={feature}
                      initial={{ y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                      transition={{
                        ...transition,
                        delay: shouldReduceMotion ? 0 : (listIndex * 5 + featureIndex) * 0.06,
                      }}
                    >
                      {feature}
                    </m.li>
                  ))}
                </ul>
              ))}
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
                alt={title}
                priority={i === 0}
              />
            </m.div>
          </div>
        </div>
      </m.div>
    </div>
  )
}

export default Card
