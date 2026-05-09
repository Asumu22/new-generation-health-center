import { Variants } from "framer-motion";

/**
 * Premium Timing Configuration
 * ease: easeOut (Quart) for a smooth, high-end feel
 */
export const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // Custom easeOutQuart for premium feel
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleHover = {
  initial: { scale: 1, boxShadow: "0px 4px 10px rgba(0,0,0,0.02)" },
  hover: {
    scale: 1.03,
    boxShadow: "0px 12px 30px rgba(0,0,0,0.08)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const buttonHover = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.97,
  },
};

/**
 * Page Transition Presets
 * Applied to the main wrapper in _app.tsx or Layout.tsx
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { ...transition, duration: 0.3 },
  },
};

/**
 * Image Presets
 * Subtle zoom for a high-end aesthetic
 */
export const imageHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
