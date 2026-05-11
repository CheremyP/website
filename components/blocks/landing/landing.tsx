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
  const plane1 = useRef<HTMLDivElement>(null);
  const plane2 = useRef<HTMLDivElement>(null);
  const plane3 = useRef<HTMLDivElement>(null);
  
  const [isScrolled, setIsScrolled] = useState(false);

  // Use refs for animation state to prevent recreating on render
  const animState = useRef({
    requestAnimationFrameId: null as number | null,
    xForce: 0,
    yForce: 0,
    easing: 0.08,
    speed: 0.01
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll(); // Check initially
    window.addEventListener('scroll', handleScroll, { passive: true });

    const lerp = (start: number, target: number, amount: number) => start * (1 - amount) + target * amount;

    const animate = () => {
      const state = animState.current;
      state.xForce = lerp(state.xForce, 0, state.easing);
      state.yForce = lerp(state.yForce, 0, state.easing);
      
      if (plane1.current) gsap.set(plane1.current, {x: `+=${state.xForce}`, y: `+=${state.yForce}`});
      if (plane2.current) gsap.set(plane2.current, {x: `+=${state.xForce * 0.5}`, y: `+=${state.yForce * 0.5}`});
      if (plane3.current) gsap.set(plane3.current, {x: `+=${state.xForce * 0.25}`, y: `+=${state.yForce * 0.25}`});

      if(Math.abs(state.xForce) < 0.01) state.xForce = 0;
      if(Math.abs(state.yForce) < 0.01) state.yForce = 0;
      
      if(state.xForce != 0 || state.yForce != 0){
        state.requestAnimationFrameId = requestAnimationFrame(animate);
      } else {
        state.requestAnimationFrameId = null;
      }
    };

    const manageMouseMove = (e: MouseEvent) => {
      const { movementX, movementY } = e;
      const state = animState.current;
      state.xForce += movementX * state.speed;
      state.yForce += movementY * state.speed;

      if(state.requestAnimationFrameId == null){
        state.requestAnimationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', manageMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', manageMouseMove);
      if (animState.current.requestAnimationFrameId !== null) {
        cancelAnimationFrame(animState.current.requestAnimationFrameId);
      }
    };
  }, []);

  return (
    <main className={styles.main}>
      <div ref={plane1} className={styles.plane}>
          <Image 
            src={bits}
            alt=''
            role="presentation"
            style={{ width: 'clamp(120px, 20.83vw, 300px)', height: 'auto' }}
            priority
          />
          <Image 
            src={bonsai}
            alt=''
            role="presentation"
            style={{ width: 'clamp(120px, 20.83vw, 300px)', height: 'auto' }}
            priority
          />
          <Image 
            src={zero_ones}
            alt=''
            role="presentation"
            style={{ width: 'clamp(90px, 15.625vw, 225px)', height: 'auto' }}
            priority
          />
      </div>
      <div ref={plane2} className={styles.plane}>
          <Image 
            src={growth}
            alt=''
            role="presentation"
            style={{ width: 'clamp(100px, 17.36vw, 250px)', height: 'auto' }}
            priority
          />
           <Image 
            src={gpu}
            alt=''
            role="presentation"
            style={{ width: 'clamp(80px, 13.88vw, 200px)', height: 'auto' }}
            priority
          />
          <Image 
            src={ai}
            alt=''
            role="presentation"
            style={{ width: 'clamp(90px, 15.625vw, 225px)', height: 'auto' }}
            priority
          />
      </div>
      <div ref={plane3} className={styles.plane}>
          <Image 
            src={wall_e}
            alt=''
            role="presentation"
            style={{ width: 'clamp(56px, 9.72vw, 140px)', height: 'auto' }}
            priority
          />
           <Image 
            src={computer}
            alt=''
            role="presentation"
            style={{ width: 'clamp(80px, 13.88vw, 200px)', height: 'auto' }}
            priority
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
