'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import styles from './works-desktop.module.scss';
import { worksCasesData } from './works-data';

export default function WorksDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const visibleCards = 3;
  const maxIndex = Math.max(0, worksCasesData.length - visibleCards);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className={styles.root}>
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {worksCasesData.map((item, index) => {
            const cardInner = (
              <div className={styles.cardInner}>
                <Image
                  src={item.image}
                  alt={item.clientName}
                  fill
                  sizes="33vw"
                  className={styles.backgroundImage}
                  priority={item.id <= 3}
                />
                <div className={styles.content}>
                  <div className={styles.logoContainer}>
                    <Image
                      src={item.logo}
                      alt={item.clientName}
                      width={100}
                      height={40}
                      className={styles.clientLogo}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className={styles.quote}>&quot;{item.quote}&quot;</p>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{item.name}</h4>
                    <p className={styles.authorRole}>{item.role}</p>
                  </div>
                </div>
              </div>
            );

            return (
              <m.div
                key={item.id}
                className={styles.card}
                initial={{ y: shouldReduceMotion ? 0 : 50, opacity: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ ...transition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              >
                <Link href={`/works/${item.slug}`} className={styles.cardLink}>
                  {cardInner}
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
