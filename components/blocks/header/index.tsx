'use client';
import styles from './style.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { opacity, background, height } from './anim';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './nav';
import Rounded from '../../ui/roundedbutton';

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
            <img src="/branding/logo.svg" alt="ARTEFCL Logo" className="w-10 h-10 md:w-14 md:h-14" />
          </Link>
          <div onClick={() => setIsActive(a => !a)} className={styles.el}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`} />
            <div className={styles.label}>
              <motion.p variants={opacity} animate={!isActive ? 'open' : 'closed'}>
                Menu
              </motion.p>
              <motion.p variants={opacity} animate={isActive ? 'open' : 'closed'}>
                Close
              </motion.p>
            </div>
          </div>
          <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.shopContainer}>
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
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className={styles.backgroundOverlay}
        onClick={() => setIsActive(false)}
      />
    </>
  );
}

