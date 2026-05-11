'use client';
import styles from './page.module.scss'
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import {
    bits, 
    bonsai, 
    computer, 
    growth, 
    gpu, 
    wall_e, 
    zero_ones,
    ai
} from '../../ui/data'

export default function Landing() {

  const slideUp = {
    initial: { y: "100%", opacity: 0 },
    enter: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const, delay: 0.08 * i }
    })
  };

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    
    handleResize(); // Check initially
    handleScroll(); // Check initially

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getWidth = (baseWidth: number) => {
    // Dynamic width using a clamp-like calculation
    // Base width is scaled relative to a target typical desktop size (e.g., 1440px)
    const minWidth = baseWidth * 0.4; // Smallest size allowed is 40% of base
    const maxWidth = baseWidth;       // Largest size allowed is original base
    const dynamicWidth = windowWidth * (baseWidth / 1440); // Scales continuously with viewport width

    // Return the dynamic width bounded by [minWidth, maxWidth] and rounded to an integer
    return Math.round(Math.max(minWidth, Math.min(dynamicWidth, maxWidth)));
  };

  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start: number, target: number, amount: number) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
    else{
      if (requestAnimationFrameId !== null) {
        cancelAnimationFrame(requestAnimationFrameId);
        requestAnimationFrameId = null;
      }
    }
  }

  return (
    <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
      <div ref={plane1} className={styles.plane}>
          <Image 
            src={bits}
            alt='Decorative binary code graphics'
            style={{ width: getWidth(300), height: 'auto' }}
            priority
          />
          <Image 
            src={bonsai}
            alt='Decorative bonsai graphics'
            style={{ width: getWidth(300), height: 'auto' }}
            priority
          />
          <Image 
            src={zero_ones}
            alt='Decorative binary code graphics'
            style={{ width: getWidth(225), height: 'auto' }}
          />
      </div>
      <div ref={plane2} className={styles.plane}>
          <Image 
            src={growth}
            alt='Decorative growth graphics'
            style={{ width: getWidth(250), height: 'auto' }}
          />
           <Image 
            src={gpu}
            alt='Decorative GPU graphics'
            style={{ width: getWidth(200), height: 'auto' }}
          />
          <Image 
            src={ai}
            alt='Decorative AI graphics'
            style={{ width: getWidth(225), height: 'auto' }}
          />
      </div>
      <div ref={plane3} className={styles.plane}>
          <Image 
            src={wall_e}
            alt='Decorative Wall-E graphics'
            style={{ width: getWidth(140), height: 'auto' }}
          />
           <Image 
            src={computer}
            alt='Decorative computer graphics'
            style={{ width: getWidth(200), height: 'auto' }}
          />
      </div>
      <div className={styles.title}>
        <h1 className="sr-only">ARTEFCL | AI with Soul, Strategy and Impact</h1>
        <p aria-hidden="true">ARTEFCL</p>
        <div className={styles.subtitle}>
          <Image src="/handwriting/ai_soul.svg" alt="AI with Soul" width={300} height={100} className={styles.handwriting} priority />
          <Image src="/handwriting/strategy.svg" alt="Strategy" width={300} height={100} className={styles.handwriting} priority />
          <Image src="/handwriting/impact.svg" alt="and Impact" width={300} height={100} className={styles.handwriting} priority />
        </div>
      </div>
      <div 
        className={styles.scrollIndicator}
        style={{ 
          opacity: isScrolled ? 0 : 1, 
          pointerEvents: isScrolled ? 'none' : 'auto',
          transition: 'opacity 0.5s ease'
        }}
      >
        <span className={styles.text}>SCROLL</span>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </main>
  )
}