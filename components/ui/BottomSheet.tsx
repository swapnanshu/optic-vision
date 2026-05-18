import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slideFromBottom } from '@/lib/animations';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Bottom Sheet */}
          <motion.div
            variants={slideFromBottom}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-3xl shadow-xl max-h-[85vh] border-t border-[var(--color-border)] overflow-hidden"
          >
            {/* Drag Handle Area */}
            <div className="flex justify-center items-center py-3 flex-shrink-0 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 pb-3 border-b border-[var(--color-border)] flex-shrink-0">
              <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
                {title || 'Chunein'}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-[var(--color-text-secondary)]" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-4 flex-grow no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
