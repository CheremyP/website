import { Variants } from 'framer-motion';

export const awwwardsEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  open: { filter: "blur(0px)", opacity: 0.3, transition: { duration: 0.35, ease: awwwardsEase } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.35, ease: awwwardsEase } }
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

export const mobileMenuPanel: Variants = {
  closed: { y: '100%' },
  open: {
    y: 0,
    transition: { duration: 0.85, ease: awwwardsEase },
  },
};

export const mobileLinkContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

export const mobileLinkItem: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

export const mobileChar: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: awwwardsEase },
  },
};

export const mobileMenuPanelReduced: Variants = {
  closed: { y: 0 },
  open: { y: 0, transition: { duration: 0 } },
};

export const mobileLinkContainerReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

export const mobileCharReduced: Variants = {
  hidden: { y: 0, opacity: 1 },
  visible: { y: 0, opacity: 1, transition: { duration: 0 } },
};

export const mobileMessageItem: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: awwwardsEase },
  },
};

export const mobileMessageItemReduced: Variants = {
  hidden: { y: 0, opacity: 1 },
  visible: { y: 0, opacity: 1, transition: { duration: 0 } },
};
