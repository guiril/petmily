import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="px-12 py-10 flex justify-between items-end bg-[#1C1917] max-lg:pt-6 max-lg:px-4 max-lg:pb-5 max-lg:flex-col max-lg:items-stretch max-lg:gap-10">
      <div className="flex flex-col gap-6 max-lg:flex-row max-lg:justify-between max-lg:items-start">
        <Image src="/images/logo-white.svg" width={81} height={20} alt="" />
        <div className="text-xs font-semibold text-[#A6A09B] max-lg:flex max-lg:flex-col max-lg:gap-2 max-lg:items-end">
          <span>Data sourced from </span>
          <a
            href="https://www.animal.taichung.gov.tw/1521448/1521512/1521537/1521539"
            target="_blank"
            className="text-white underline max-lg:text-sm"
          >
            臺中市動物保護防疫處
          </a>
        </div>
      </div>
      <p className="text-xs text-[#A6A09B] max-lg:text-center">
        For personal, non-commercial use only. © 2026 Petmily
      </p>
    </footer>
  );
};
