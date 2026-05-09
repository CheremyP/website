'use client';
import styles from './style.module.scss';
import Image from 'next/image';

const logos = [
  '/integrations/aws.png',
  '/integrations/azure.png',
  '/integrations/claude.png',
  '/integrations/gcp.png',
  '/integrations/gemini.png',
  '/integrations/n8n.png',
  '/integrations/nvidia.png',
  '/integrations/openai.png'
];

export default function Logos() {
  return (
    <section className={styles.logosSection}>
      <div className={styles.headerContainer}>
        <p className={styles.heading}>
          We build AI infrastructure, intelligent agents, and automations that seamlessly integrate with:
        </p>
      </div>
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {/* Double the logos to create the seamless infinite scroll effect */}
          {[...logos, ...logos].map((logo, index) => (
            <div className={styles.slide} key={index}>
              <Image 
                src={logo} 
                alt="Integration Logo" 
                width={150} 
                height={50} 
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
