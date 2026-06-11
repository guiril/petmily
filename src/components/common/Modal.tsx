import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <DialogPanel>{children}</DialogPanel>
    </Dialog>
  );
};
