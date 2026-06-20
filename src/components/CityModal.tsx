'use client';

import { DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/common/Modal';
import { TaiwanMap } from './TaiwanMap';

interface CityModalProps {
  isOpen: boolean;
  currentCity: string;
  onClose: () => void;
}

export const CityModal = ({ isOpen, currentCity, onClose }: CityModalProps) => {
  const router = useRouter();

  const handleCitySelect = (cityKey: string) => {
    router.push(`/${cityKey}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} panelClassName="max-w-4xl w-full">
      <DialogTitle className="mb-4 text-center font-semibold text-gray-800">
        選擇城市
      </DialogTitle>
      <TaiwanMap currentCity={currentCity} onCitySelect={handleCitySelect} />
    </Modal>
  );
};
