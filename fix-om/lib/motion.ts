import type { Variants, Transition, ViewportOptions } from "framer-motion";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const revealFromLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0 },
};

export const revealFromRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0 },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export const scrollStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const defaultTransition: Transition = {
  duration: 0.55,
  ease: easeOut,
};

export const scrollTransition: Transition = {
  duration: 0.7,
  ease: easeOut,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
};

export const viewportOnce: ViewportOptions = {
  once: true,
  margin: "-80px",
};

export const viewportTight: ViewportOptions = {
  once: true,
  margin: "-40px",
};
