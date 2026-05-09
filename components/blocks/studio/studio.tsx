'use client';
import styles from './style.module.scss';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const metrics = [
  { value: 5, suffix: '+', label: 'Industries Transformed' },
  { value: 3.3, suffix: 'X', label: 'Average ROI' },
  { value: 15, suffix: '+', label: 'Agents Deployed' }
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const incrementTime = 20;
      const totalSteps = duration / incrementTime;
      const increment = end / totalSteps;
      const hasDecimal = value % 1 !== 0;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(hasDecimal ? Number(start.toFixed(1)) : Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={styles.number}>
      {count}{suffix}
    </span>
  );
};

export default function Studio() {
  const container = useRef(null);
  
  // Track scroll progress through this specific container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"] // Start revealing when container enters, finish when it reaches center
  });

  // Map scroll progress to the clip-path mask size (0% to 100%)
  const clipProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={container} className={styles.studioSection}>
      <div className={styles.content}>
        
        <div className={styles.topSplit}>
          {/* Left: Scroll-Triggered Text Reveal */}
          <div className={styles.textLeft}>
            {/* Background Text (Faint) */}
            <h2 className={styles.backgroundText}>
              A cross-industry AI studio
            </h2>
            
            {/* Foreground Text (Solid Black) revealed by clip-path */}
            <motion.h2 
              className={styles.foregroundText}
              style={{ clipPath: useTransform(clipProgress, val => `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`) }}
            >
              A cross-industry AI studio
            </motion.h2>
          </div>

          {/* Right: Descriptive Paragraph */}
          <div className={styles.textRight}>
            <p>
              We don&apos;t just build AI, we redefine what&apos;s possible. From AI automation to multi-agent systems that deliver impact. The future doesn&apos;t wait, neither should you.
            </p>
          </div>
        </div>

        {/* Impact Metrics Section */}
        <div className={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              className={styles.metricBlock}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <Counter value={metric.value} suffix={metric.suffix} />
              <p className={styles.label}>{metric.label}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
