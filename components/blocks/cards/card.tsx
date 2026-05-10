'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const Card = ({i, title, description, src, url, color, progress, range, targetScale}: any) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
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
            <motion.div
              className={styles.inner}
              style={{scale: imageScale, position: 'relative', width: '100%', height: '100%'}}
            >
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={`/services/${src}`}
                alt="image" 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card