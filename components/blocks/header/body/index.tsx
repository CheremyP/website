import { m, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import {
  blur,
  translate,
  mobileLinkContainer,
  mobileLinkItem,
  mobileChar,
  mobileLinkContainerReduced,
  mobileCharReduced,
} from '../anim';
import { type Dispatch, type SetStateAction } from 'react';
import type React from 'react';

type NavLink = { title: string; href: string };
type SelectedLink = { isActive: boolean; index: number };

type BodyProps = {
  links: NavLink[];
  selectedLink: SelectedLink;
  setSelectedLink: Dispatch<SetStateAction<SelectedLink>>;
  variant?: 'desktop' | 'mobile';
  onLinkClick?: () => void;
};

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  variant = 'desktop',
  onLinkClick,
}: BodyProps) {
  const shouldReduceMotion = useReducedMotion();

  const getChars = (word: string) => {
    const chars: React.ReactElement[] = [];
    word.split('').forEach((char, i) => {
      chars.push(
        <m.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </m.span>
      );
    });
    return chars;
  };

  const getMobileChars = (word: string) => {
    const charVariants = shouldReduceMotion ? mobileCharReduced : mobileChar;
    return word.split('').map((char, i) => (
      <span
        key={`${char}-${i}`}
        aria-hidden="true"
        className={styles.charMask}
      >
        <m.span variants={charVariants}>{char}</m.span>
      </span>
    ));
  };

  if (variant === 'mobile') {
    const containerVariants = shouldReduceMotion ? mobileLinkContainerReduced : mobileLinkContainer;

    return (
      <m.nav
        className={`${styles.body} ${styles.mobileBody}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Main navigation"
      >
        {links.map((link, index) => {
          const { title, href } = link;
          return (
            <m.div key={`l_${index}`} variants={mobileLinkItem}>
              <Link href={href} onClick={onLinkClick} className={styles.mobileLink}>
                <p aria-label={title}>{getMobileChars(title)}</p>
              </Link>
            </m.div>
          );
        })}
      </m.nav>
    );
  }

  return (
    <div className={styles.body}>
      {links.map((link: NavLink, index: number) => {
        const { title, href } = link;
        return (
          <Link key={`l_${index}`} href={href}>
            <m.p
              onMouseOver={() => { setSelectedLink({ isActive: true, index }); }}
              onMouseLeave={() => { setSelectedLink({ isActive: false, index }); }}
              variants={blur}
              animate={selectedLink.isActive && selectedLink.index !== index ? 'open' : 'closed'}
            >
              {getChars(title)}
            </m.p>
          </Link>
        );
      })}
    </div>
  );
}
