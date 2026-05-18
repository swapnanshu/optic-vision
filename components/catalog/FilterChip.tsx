import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: string | React.ReactNode;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onClick,
  icon,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs md:text-sm border-2 transition-all cursor-pointer select-none',
        {
          'bg-[var(--color-primary)] text-white border-transparent shadow-xs scale-105': selected,
          'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary-light)]': !selected,
        }
      )}
    >
      {icon && <span className="text-sm md:text-base">{icon}</span>}
      <span>{label}</span>
    </motion.button>
  );
};

export default FilterChip;
