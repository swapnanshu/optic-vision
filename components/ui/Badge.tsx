import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'danger' | 'warning' | 'neutral' | 'brand';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest border transition-all duration-150',
        {
          // success (e.g. in stock)
          'bg-emerald-50 text-emerald-700 border-emerald-200': variant === 'success',
          // danger (e.g. out of stock)
          'bg-red-50 text-red-600 border-red-200': variant === 'danger',
          // warning (e.g. low stock)
          'bg-amber-50 text-amber-700 border-amber-200': variant === 'warning',
          // neutral (e.g. gray badges)
          'bg-slate-50 text-slate-600 border-slate-200': variant === 'neutral',
          // brand (teal primary)
          'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border-teal-200': variant === 'brand',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
