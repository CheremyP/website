import React from 'react'
import { m } from 'framer-motion';
import Image from 'next/image';
import styles from './style.module.scss';
import { opacity } from '../anim';

type SelectedLink = { isActive: boolean; index: number };
type Props = { src: string; alt?: string; selectedLink: SelectedLink };

export default function Index({ src, alt = "image", selectedLink }: Props) {
  return (
    <m.div
      variants={opacity}
      initial="initial"
      animate={selectedLink.isActive ? "open" : "closed"}
      className={styles.imageContainer}
    >
      <Image src={`/header/${src}`} fill sizes="500px" style={{ objectFit: 'cover' }} alt={alt} />
    </m.div>
  )
}