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
  { title: "Services", href: "/services", src: "services.jpg" },
  { title: "About", href: "/about", src: "about.jpg" },
  { title: "Contact", href: "/contact", src: "contact.jpg" }
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <m.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
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