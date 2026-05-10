'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import SplitText from '@/components/ui/splittext';
import type { Case, CaseBlock } from '@/lib/cases';

export function CaseHero({ caseData }: { caseData: Case }) {
  const shouldReduceMotion = useReducedMotion();
  const transition = { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <SplitText text={caseData.title} className={styles.title} />
      </div>
      
      <motion.div 
        className={styles.heroImageWrapper}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...transition, delay: 0.2 }}
      >
        <Image src={caseData.heroImage} alt={caseData.title} fill className={styles.image} priority />
      </motion.div>
      
      <div className={styles.content}>
        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <strong>Client</strong>
            <span>{caseData.client}</span>
          </div>
          <div className={styles.metaItem}>
            <strong>Year</strong>
            <span>{caseData.year}</span>
          </div>
          <div className={styles.metaItem}>
            <strong>Services</strong>
            <span>{caseData.services.join(', ')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlockRenderer({ block, index }: { block: CaseBlock, index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const transition = { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const };
  
  const fadeUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' },
    transition
  };

  switch (block.type) {
    case 'text':
      return (
        <motion.div className={styles.textBlock} {...fadeUp}>
          {block.heading && <h3 className={styles.blockHeading}>{block.heading}</h3>}
          <p className={styles.blockContent}>{block.content}</p>
        </motion.div>
      );
    case 'image':
      return (
        <motion.div className={`${styles.imageBlock} ${block.fullWidth ? styles.fullWidth : ''}`} {...fadeUp}>
          <div className={styles.imgWrap}>
            <Image src={block.src} alt={block.alt} fill className={styles.image} />
          </div>
          {block.caption && <p className={styles.caption}>{block.caption}</p>}
        </motion.div>
      );
    case 'image-pair':
      return (
        <motion.div className={styles.imagePairBlock} {...fadeUp}>
          <div className={styles.imgWrap}>
            <Image src={block.srcLeft} alt={block.altLeft} fill className={styles.image} />
          </div>
          <div className={styles.imgWrap}>
            <Image src={block.srcRight} alt={block.altRight} fill className={styles.image} />
          </div>
        </motion.div>
      );
    case 'quote':
      return (
        <motion.div className={styles.quoteBlock} {...fadeUp}>
          <blockquote className={styles.quoteText}>"{block.text}"</blockquote>
          {(block.author || block.role) && (
            <div className={styles.quoteMeta}>
              {block.author && <strong>{block.author}</strong>}
              {block.role && <span>{block.role}</span>}
            </div>
          )}
        </motion.div>
      );
    default:
      return null;
  }
}
