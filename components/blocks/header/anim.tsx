import { Variants } from 'framer-motion';

export const opacity: Variants = {
  open: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: { duration: 0.3 }
  },
  closed: {
    opacity: 0,
    pointerEvents: 'none',
    transition: { duration: 0.25, delay: 0.05 }
  }
};

// ensure ease is a typed cubic-bezier tuple
const easing: [number, number, number, number] = [0.76, 0, 0.24, 1];
const transition: { duration: number; ease: [number, number, number, number] } = {
  duration: 1,
  ease: easing
};

export const height: Variants = {
  initial: { height: 0 },
  enter: { height: "auto", transition },
  exit: { height: 0, transition }
};

export const blur: Variants = {
  initial: { filter: "blur(0px)", opacity: 1 },
  open: { filter: "blur(4px)", opacity: 0.6, transition: { duration: 0.3 } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } }
};

export const translate: Variants = {
  initial: { y: "100%", opacity: 0 },
  enter: (i: [number, number]) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: easing, delay: i[0] }
  }),
  exit: (i: [number, number]) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: easing, delay: i[1] }
  })
};

export const background: Variants = {
  initial: { opacity: 0, pointerEvents: 'none' },
  open: { opacity: 0.5, pointerEvents: 'auto', transition },
  closed: { opacity: 0, pointerEvents: 'none', transition }
};