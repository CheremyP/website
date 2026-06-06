'use client';
import styles from './style.module.scss';
import { m } from 'framer-motion';

export default function About() {
  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    })
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.content}>
        
        <div className={styles.header}>
          <m.h1 
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            ABOUT US
          </m.h1>
        </div>

        <div className={styles.bodyText}>
          <m.p 
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            Founded in 2026 by Kilan van Loo & Cheremy Pongajow, Studio 28 is a tech company rooted in real connection.
          </m.p>

          <m.p 
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            The name reflects where it all began — house number 28. A place where friendship turned into vision, and vision became something bigger. From the beginning, Studio 28 was built on loyalty, trust, and shared ambition. What started between friends still defines the company today.
          </m.p>

          <m.p 
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            From a single client in our dorm evolved into a technology studio focused on AI, cloud systems, and modern digital experiences that feel something deeper than tech.
          </m.p>

          <m.p 
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            At Studio 28, we don&apos;t chase trends. We build with intention. Every product and service is created with purpose. Made to last, made for impact. Whether it&apos;s a AI, a cloud infrastructure or a web application, we focus on quality, form, and feel.
          </m.p>

          <m.p 
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            Our identity is shaped by loyalty, friendship, and share experience. The reason we belief that meaningful technology starts with meaningful principles.
          </m.p>
        </div>

        <div className={styles.sloganContainer}>
          <m.h2
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
          >
            &ldquo;AI with soul, trust and impact&rdquo;
          </m.h2>
          <m.p
            custom={7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={textVariants}
            className={styles.sloganSub}
          >
            isn&apos;t just a slogan. It&apos;s the heart of our brand.
          </m.p>
        </div>
      </div>
    </section>
  );
}
