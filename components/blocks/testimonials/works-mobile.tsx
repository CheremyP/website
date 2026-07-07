'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import styles from './works-mobile.module.scss';
import { worksCasesData } from './works-data';

export default function WorksMobile() {
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {worksCasesData.map((item, index) => (
          <m.div
            key={item.id}
            className={styles.card}
            initial={{ y: shouldReduceMotion ? 0 : 40, opacity: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
          >
            <Link href={`/works/${item.slug}`} className={styles.cardLink}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.clientName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                  priority={item.id <= 2}
                />
              </div>
              <div className={styles.meta}>
                <div className={styles.logoContainer}>
                  <Image
                    src={item.logo}
                    alt={item.clientName}
                    width={120}
                    height={36}
                    className={styles.clientLogo}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className={styles.clientName}>{item.clientName}</h3>
                <p className={styles.metaDetail}>
                  {item.sector} • {item.year}
                </p>
              </div>
            </Link>
          </m.div>
        ))}
      </div>
    </div>
  );
}
