import React from 'react';
import { motion } from 'motion/react';
import { Frame } from '@/types';
import { FrameCard } from './FrameCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { staggerChildren, fadeUp } from '@/lib/animations';

interface FrameGridProps {
  frames: Frame[];
  isLoading: boolean;
}

export const FrameGrid: React.FC<FrameGridProps> = ({ frames, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <Skeleton className="aspect-[4/3] w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">👓</div>
        <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
          Koi frame nahi mila — filters hatao!
        </h3>
        <p className="text-base font-semibold text-[var(--color-text-secondary)] mt-2">
          Koi doosre style ya category ke filters check karke dekho.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {frames.map((frame) => (
        <motion.div key={frame.id} variants={fadeUp}>
          <FrameCard frame={frame} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FrameGrid;
