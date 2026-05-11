'use client';
import styles from './style.module.css';
import { m } from 'framer-motion';
import { useState } from 'react';
import { height } from '../anim';
import Body from '../body';
import Footer from '../footer';
import Image from '../image';

const links = [
  { title: "Home", href: "/", src: "home.png" },
  { title: "Services", href: "/services", src: "work.jpg" },
  { title: "About", href: "/about", src: "about.jpg" },
  { title: "Contact", href: "/contact", src: "contact.jpg" }
];

export default function Index() {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <m.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <Footer />
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