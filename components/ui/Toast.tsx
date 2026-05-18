'use client';

import { Toaster, toast } from 'react-hot-toast';

export { toast };

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#FFFFFF',
          color: '#1E293B',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#0D9488',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
};
