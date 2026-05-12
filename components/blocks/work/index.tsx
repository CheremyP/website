'use client';
import styles from './style.module.scss';
import posthog from 'posthog-js';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCases } from '@/lib/cases';
import SplitText from '@/components/ui/splittext';
import { m, useReducedMotion } from 'framer-motion';

export default function WorkIndex() {
  const cases = getAllCases();
  const shouldReduceMotion = useReducedMotion();
  
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className={styles.workSection}>
      <div className={styles.content}>
        <SplitText text="Work" className={styles.heading} />
        
        <div className={styles.grid}>
          {cases.map((c, i) => (
            <m.div 
              key={c.slug}
              className={styles.caseCard}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ ...transition, delay: i * 0.1 }}
            >
              <Link href={`/works/${c.slug}`} className={styles.link} onClick={() => posthog.capture('case_study_clicked', { slug: c.slug, title: c.title, client: c.client, sector: c.sector })}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={c.thumbnail} 
                    alt={c.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                    priority={i < 4}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.viewText}>View Case</span>
                  </div>
                </div>
                <div className={styles.meta}>
                  <h2 className={styles.title}>{c.title}</h2>
                  <div className={styles.tags}>
                    <span>{c.client}</span>
                    <span className={styles.dot}>•</span>
                    <span>{c.sector}</span>
                    <span className={styles.dot}>•</span>
                    <span>{c.year}</span>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
