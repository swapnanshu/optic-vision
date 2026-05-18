import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150 active:scale-[0.97] outline-none disabled:opacity-50 disabled:pointer-events-none min-h-[48px] px-6 py-3.5 text-base',
          {
            // Primary (amber)
            'bg-[var(--color-cta)] text-[var(--color-cta-text)] shadow-sm hover:bg-[var(--color-cta-dark)]': variant === 'primary',
            // Secondary (teal outline)
            'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]': variant === 'secondary',
            // Ghost (teal text, soft bg on hover)
            'text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]': variant === 'ghost',
            // Danger (red)
            'bg-[var(--color-danger)] text-white hover:bg-red-700': variant === 'danger',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
