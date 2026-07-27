'use client';

import Image from 'next/image';
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
    if (cityKey !== currentCity) {
      router.push(`/${cityKey}`);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} panelClassName="max-w-4xl w-full">
      <div className="relative mb-4 flex items-center justify-center">
        <DialogTitle className="text-lg font-semibold leading-5.5 -tracking-[0.43px] text-ink">
          選擇城市
        </DialogTitle>
        <button
          type="button"
          className="absolute -top-2 -right-2 cursor-pointer"
          onClick={onClose}
        >
          <Image src="/images/close.svg" width={30} height={30} alt="" />
        </button>
      </div>
      <TaiwanMap currentCityKey={currentCity} onCitySelect={handleCitySelect} />
    </Modal>
  );
};
