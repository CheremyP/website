'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { opacity, background, height } from './anim';
import { m, AnimatePresence } from 'framer-motion';
import Nav from './nav';
import Rounded from '../../ui/roundedbutton';

import Image from 'next/image';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = isActive ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isActive]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.bar}>
          <Link className="flex items-center gap-2" href="/">
            <Image src="/branding/logo.svg" alt="ARTEFCL Logo" width={56} height={56} className="w-10 h-10 md:w-14 md:h-14" />
          </Link>
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
          <m.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.shopContainer}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="hidden md:flex">
                <Rounded
                  backgroundColor="#000000"
                  onClick={() => { window.location.href = '/contact'; }}
                >
                  <p style={{ textTransform: 'none' }}>Contact</p>
                </Rounded>
              </div>
              <div className="flex md:hidden">
                <Rounded
                  backgroundColor="#000000"
                  onClick={() => { window.location.href = '/contact'; }}
                  style={{ padding: '0.4em 0.8em', fontSize: '10px' }}
                >
                  <p style={{ textTransform: 'none' }}>Contact</p>
                </Rounded>
              </div>
            </div>
          </m.div>
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
              <div
                className={styles.navInner}
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Nav />
                </div>

              </div>
            </m.div>
          )}
        </AnimatePresence>
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

