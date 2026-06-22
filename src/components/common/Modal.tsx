'use client';

import { useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  panelClassName,
}: ModalProps) => {
  // Headless UI Dialog registers a non-passive touchmove listener on iOS that calls
  // preventDefault() on all touch events — including pinch-to-zoom. Registering our
  // listener in the capture phase (which runs before Headless UI's bubble-phase listener)
  // lets us call stopImmediatePropagation() for multi-touch events, preventing
  // preventDefault() from ever being called and restoring native pinch-to-zoom.
  useEffect(() => {
    if (!isOpen) return;

    const allowPinchZoom = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.stopImmediatePropagation();
      }
    };

    document.addEventListener('touchmove', allowPinchZoom, { capture: true });
    return () =>
      document.removeEventListener('touchmove', allowPinchZoom, {
        capture: true,
      });
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-30">
      <DialogBackdrop className="fixed inset-0 bg-black/60" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen flex items-center justify-center p-4">
        <DialogPanel className={`rounded-xl bg-white p-6 ${panelClassName}`}>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
