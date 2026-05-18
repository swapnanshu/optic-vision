import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, fullWidth = true, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-semibold text-[var(--color-text-secondary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-base text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] min-h-[48px]',
            {
              'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20': error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-semibold text-[var(--color-danger)]">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-[var(--color-text-secondary)] bg-transparent">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
