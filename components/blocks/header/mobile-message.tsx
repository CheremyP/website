'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import styles from './mobile-message.module.scss';
import bodyStyles from './body/style.module.scss';
import {
  mobileLinkContainer,
  mobileLinkContainerReduced,
  mobileLinkItem,
  mobileChar,
  mobileCharReduced,
} from './anim';

const MESSAGE_OPTIONS = [
  { label: 'WhatsApp', href: '#' },
  { label: 'Contact', href: '/contact' },
  { label: 'Plan a Call', href: '#' },
];

type MobileMessageProps = {
  onLinkClick?: () => void;
};

export default function MobileMessage({ onLinkClick }: MobileMessageProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? mobileLinkContainerReduced : mobileLinkContainer;
  const charVariants = shouldReduceMotion ? mobileCharReduced : mobileChar;

  const getMobileChars = (word: string) =>
    word.split('').map((char, i) => (
      <span key={`${char}-${i}`} aria-hidden="true" className={bodyStyles.charMask}>
        <m.span variants={charVariants}>{char === ' ' ? '\u00A0' : char}</m.span>
      </span>
    ));

  return (
    <div className={styles.messagePanel}>
      <m.nav
        className={`${bodyStyles.body} ${bodyStyles.mobileBody} ${styles.list}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Contact options"
      >
        {MESSAGE_OPTIONS.map((option) => (
          <m.div key={option.label} variants={mobileLinkItem}>
            <Link href={option.href} onClick={onLinkClick} className={bodyStyles.mobileLink}>
              <p className={styles.linkLabel} aria-label={option.label}>
                {getMobileChars(option.label)}
              </p>
            </Link>
          </m.div>
        ))}
      </m.nav>
    </div>
  );
}
