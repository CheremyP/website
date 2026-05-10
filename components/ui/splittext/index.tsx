'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
}

export default function SplitText({ text, className }: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // "Awwwards curve" per AGENTS.md
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const wrapperVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      y: shouldReduceMotion ? "0%" : "110%",
      opacity: shouldReduceMotion ? 1 : 0
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition,
    },
  };

  return (
    <motion.h1
      className={className}
      variants={wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      aria-label={text}
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              aria-hidden="true"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                lineHeight: 1, // Ensures glyph fits inside the mask
                paddingTop: '0.1em', // Buffer for accents
                marginTop: '-0.1em'
              }}
            >
              <motion.span
                variants={letterVariants}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {/* Add a non-breaking space after each word except the last */}
          {wordIndex !== text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.h1>
  );
}
