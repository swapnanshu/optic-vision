// lib/animations.ts

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const springPop = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', stiffness: 400, damping: 22 },
};

export const slideFromBottom = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit:    { y: '100%' },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};
