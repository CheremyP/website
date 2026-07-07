'use client';
import styles from './style.module.scss';
import { m } from 'framer-motion';
import { useState } from 'react';
import { height } from '../anim';
import Body from '../body';
import Image from '../image';

const links = [
  { title: "Home", href: "/", src: "home.png" },
  { title: "Works", href: "/works", src: "work.jpg" },
  { title: "Services", href: "/services", src: "work.jpg" },
  { title: "About", href: "/about", src: "about.jpg" },
  { title: "Contact", href: "/contact", src: "contact.jpg" }
];

type NavProps = {
  variant?: 'desktop' | 'mobile';
  onLinkClick?: () => void;
};

export default function Nav({ variant = 'desktop', onLinkClick }: NavProps) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
  const isMobile = variant === 'mobile';

  if (isMobile) {
    return (
      <div className={`${styles.nav} ${styles.mobileNav}`}>
        <div className={styles.mobileWrapper}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            variant="mobile"
            onLinkClick={onLinkClick}
          />
        </div>
      </div>
    );
  }

  return (
    <m.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            variant="desktop"
          />
        </div>
        <Image
          src={links[selectedLink.index].src}
          alt={`${links[selectedLink.index].title} preview`}
          selectedLink={selectedLink}
        />
      </div>
    </m.div>
  );
}
