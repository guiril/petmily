import Image from 'next/image';
import { AVAILABLE_CITIES } from '@/lib/cities';

interface HeaderProps {
  city: string;
  onOpenCityModal: () => void;
}

export const Header = ({ city, onOpenCityModal }: HeaderProps) => {
  const cityName =
    AVAILABLE_CITIES.find(({ key }) => key === city)?.name ?? city;

  return (
    <header className="sticky top-0 z-10 px-4 py-6 flex items-center justify-between border-b border-orange-200 bg-white">
      <h1>
        <a href="/">
          <span className="sr-only">Petmily</span>
          <Image src="/images/logo.svg" width={122} height={32} alt="Petmily" />
        </a>
      </h1>
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] border border-[#E7E5E4] text-sm font-medium text-[#57534D] bg-white hover:bg-[#E7E5E4] cursor-pointer"
        onClick={onOpenCityModal}
      >
        <Image src="/images/location.svg" width={20} height={20} alt="" />
        {cityName}
        <span className="text-[#A8A29E] text-xl">▾</span>
      </button>
    </header>
  );
};
