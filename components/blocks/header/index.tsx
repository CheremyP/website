'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { opacity, background, height, mobileMenuPanel, mobileMenuPanelReduced } from './anim';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Nav from './nav';
import MobileMessage from './mobile-message';
import { useHeaderTheme, type HeaderTheme } from './use-header-theme';

import Image from 'next/image';

const THEME_CLASS: Record<HeaderTheme, string> = {
  light: styles.themeLight,
  dark: styles.themeDark,
  image: styles.themeImage,
};

const LIGHT_CONTRAST = {
  start: 'light' as const,
  center: 'light' as const,
  end: 'light' as const,
};

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const { contrast, isScrolled } = useHeaderTheme();
  const activeContrast = isActive ? LIGHT_CONTRAST : contrast;
  const shouldReduceMotion = useReducedMotion();
  const panelVariants = shouldReduceMotion ? mobileMenuPanelReduced : mobileMenuPanel;
  const panelsOpen = isActive || isMessageOpen;

  useEffect(() => {
    document.documentElement.style.overflow = panelsOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [panelsOpen]);

  return (
    <>
      <div
        className={`${styles.header} ${isActive ? styles.isActive : ''} ${isScrolled ? styles.isScrolled : ''}`}
        data-header-root
      >
        <div className={styles.bar}>
          <div className={`${styles.barStart} ${THEME_CLASS[activeContrast.start]}`}>
            <Link className={`hidden md:flex items-center gap-2 ${styles.logoLink}`} href="/">
              <Image src="/branding/logo.svg" alt="ARTEFCL Logo" width={56} height={56} className={`w-10 h-10 md:w-14 md:h-14 ${styles.logo}`} />
            </Link>
          </div>
          <div className={`${styles.barCenter} ${THEME_CLASS[activeContrast.center]}`}>
            <button 
              onClick={() => setIsActive(a => !a)} 
              className={styles.el}
              aria-expanded={isActive}
              aria-label={isActive ? "Close menu" : "Open menu"}
            >
              <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`} />
              <div className={styles.label}>
                <m.p variants={opacity} animate={!isActive ? 'open' : 'closed'} aria-hidden="true">
                  Menu
                </m.p>
                <m.p variants={opacity} animate={isActive ? 'open' : 'closed'} aria-hidden="true">
                  Close
                </m.p>
              </div>
            </button>
          </div>
          <div className={`${styles.barEnd} ${THEME_CLASS[activeContrast.end]}`}>
            <div className={styles.shopContainer}>
              <Link href="/contact" className={styles.headerCta}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isActive && (
            <m.div
              className={styles.navWrapper}
              key="nav"
              variants={height}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.navInner}>
                <div className={styles.navContent}>
                  <Nav variant="desktop" />
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isActive && (
          <m.div
            key="mobile-menu"
            className={styles.mobileSheet}
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            aria-hidden={false}
          >
            <Nav variant="mobile" onLinkClick={() => setIsActive(false)} />
          </m.div>
        )}
      </AnimatePresence>

      {/* MOBILE MESSAGE PANEL */}
      <AnimatePresence>
        {isMessageOpen && (
          <m.div
            key="mobile-message"
            className={styles.mobileSheet}
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            aria-hidden={false}
          >
            <MobileMessage onLinkClick={() => setIsMessageOpen(false)} />
          </m.div>
        )}
      </AnimatePresence>
      
      {/* MOBILE BOTTOM NAV */}
      <div className={`${styles.mobileBottomNav} ${panelsOpen ? styles.panelsOpen : ''}`}>
        <div className={styles.pillBar}>
          <div className={styles.pillGroup}>
            <button 
              onClick={() => { setIsActive(!isActive); setIsMessageOpen(false); }} 
              className={`${styles.pillButton} ${styles.menuButton}`}
              aria-label={isActive ? 'Close menu' : 'Open menu'}
              aria-expanded={isActive}
            >
              <div className={styles.burgerWrapper}>
                <div className={`${styles.mobileBurger} ${isActive ? styles.mobileBurgerActive : ''}`} />
              </div>
            </button>
            <button 
              onClick={() => { setIsMessageOpen((open) => !open); setIsActive(false); }} 
              className={`${styles.pillButton} ${styles.iconButton}`}
              aria-label={isMessageOpen ? 'Close contact options' : 'Open contact options'}
              aria-expanded={isMessageOpen}
            >
              <span className={`${styles.messageIcon} ${isMessageOpen ? styles.messageIconActive : ''}`}>
                <svg className={styles.messageIconChat} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <svg className={styles.messageIconClose} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <m.div
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className={styles.backgroundOverlay}
        onClick={() => setIsActive(false)}
      />
    </>
  );
}
