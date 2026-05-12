'use client';
import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Kevala Ceramics',
    tags: ['UI/UX Design', 'Art Direction'],
    image: '/images/1.jpg',
    logo: '/logos/beton.svg'
  },
  {
    title: 'SCSY Studio',
    tags: ['UI/UX Design', 'Art Direction'],
    image: '/images/2.jpg',
    logo: '/logos/vz.svg'
  },
  {
    title: 'Luštica Bay',
    tags: ['UI/UX Design', 'Art Direction'],
    image: '/images/3.jpg',
    logo: '/logos/tata_logo.svg'
  },
  {
    title: 'The Reserve Residences',
    tags: ['UI/UX Design', 'Art Direction'],
    image: '/images/4.jpg',
    logo: '/logos/pmc_logo.svg'
  }
];

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !containerRef.current) return;

      ctx = gsap.context(() => {
        const scrollDistance = containerRef.current!.scrollWidth - window.innerWidth;

        gsap.to(containerRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }, sectionRef);
    };

    initGsap();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.worksSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>[ Works ]</h2>
        <div className={styles.nav}>
          <span className={styles.active}>Selected</span>
          <span>Archive</span>
        </div>
      </div>
      
      <div ref={containerRef} className={styles.sliderContainer}>
        {projects.map((project, index) => (
          <div className={styles.projectCard} key={index}>
            <div className={styles.imageWrapper}>
              {/* Using standard img tag with placeholders logic just in case image doesn't exist */}
              <Image 
                src={project.image} 
                alt={project.title} 
                className={styles.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.style.backgroundColor = '#333';
                }}
              />
              
              <div className={styles.logoOverlay}>
                <Image src={project.logo} alt="Client Logo" width={80} height={40} style={{ objectFit: 'contain' }} />
              </div>
            </div>
            
            <div className={styles.projectInfo}>
              <h3>{project.title}</h3>
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i < project.tags.length - 1 && <span className={styles.dot}>•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}