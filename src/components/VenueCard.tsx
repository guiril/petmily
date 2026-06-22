import Image from 'next/image';
import type { Venue } from '@/types/venue';

interface VenueCardProps {
  venue: Venue;
}

const PET_TYPE_ICONS: Record<
  string,
  {
    src: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  犬: {
    src: '/images/pet/dog.svg',
    bgColor: 'bg-[#FAD6AF]',
    borderColor: 'border-[#FEF0E1]',
  },
  貓: {
    src: '/images/pet/cat.svg',
    bgColor: 'bg-[#FFB6A2]',
    borderColor: 'border-[#FFE3D9]',
  },
  其他: {
    src: '/images/pet/other.svg',
    bgColor: 'bg-[#A2CCFF]',
    borderColor: 'border-[#DBEBFF]',
  },
};

const SERVICE_TYPE_STYLES: Record<string, string> = {
  餐飲: 'bg-[#FFE7BA] text-[#AD4E00]',
  美容: 'bg-[#FFE3D9] text-[#D95C3A]',
  醫療: 'bg-[#D7EEFF] text-[#1596F8]',
  住宿: 'bg-[#F0FFDD] text-[#67A512]',
  娛樂: 'bg-[#FFE8ED] text-[#FF4470]',
  交通: 'bg-[#EDE8FF] text-[#6E4AF2]',
  其他: 'bg-[#F5F5F4] text-[#79716B]',
};

const getMapUrl = (venue: Venue): string => {
  if (venue.location) {
    const { lat, lng } = venue.location;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name} ${venue.address}`,
  )}`;
};

export const VenueCard = ({ venue }: VenueCardProps) => {
  const { name, address, phone, imageUrl, petTypes, serviceTypes } = venue;
  const mapUrl = getMapUrl(venue);

  return (
    <li className="flex flex-col border border-[#E7E5E4] bg-white rounded-2xl max-lg:h-35.25 max-lg:flex-row max-lg:rounded-xl">
      <div
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        className={`relative h-46.25 bg-center bg-no-repeat rounded-t-2xl max-lg:w-[37.9%] max-lg:h-auto max-lg:rounded-xl ${
          imageUrl
            ? 'bg-cover'
            : 'bg-[#F5F5F4] bg-[url(/images/logo-2.svg)] bg-size-[72px]'
        }`}
      >
        {petTypes.length > 0 && (
          <ul className="absolute left-4 bottom-3 flex gap-2 max-lg:left-3 max-lg:bottom-2">
            {petTypes.map((type) => {
              const icon = PET_TYPE_ICONS[type];
              return (
                <li
                  key={type}
                  className={`w-7 h-7 flex justify-center items-center rounded-full ${icon.bgColor} ${icon.borderColor} max-lg:w-6 max-lg:h-6`}
                >
                  <Image src={icon.src} width={18} height={18} alt={type} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 max-lg:p-3 overflow-hidden">
        <div className="flex flex-col flex-1">
          <h3
            title={name}
            className="text-lg font-bold text-ink overflow-hidden whitespace-nowrap text-ellipsis max-lg:text-sm"
          >
            {name}
          </h3>
          <span className="block mb-4 text-sm text-ink-muted max-lg:text-xs max-lg:mb-3">
            {address}
          </span>
          {phone && (
            <div className="flex items-center gap-2">
              <Image src="/images/phone.svg" width={12} height={12} alt="" />
              <span className="text-[15px] font-bold text-ink max-lg:text-xs">
                {phone}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <ul className="flex gap-1.5">
            {serviceTypes.map((type) => (
              <li key={type}>
                <span
                  className={`px-2 py-1 text-xs font-medium tracking-[-0.02em] rounded-md ${SERVICE_TYPE_STYLES[type]}`}
                >
                  {type}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pt-2 pb-1.5 pr-3.5 pl-2 flex items-center gap-1 bg-[#F5F5F4] rounded-[100px] max-lg:px-3"
          >
            <Image
              src="/images/location.svg"
              width={15}
              height={15}
              alt=""
              className="max-lg:hidden"
            />
            <span className="block text-xs font-medium leading-5">地圖</span>
          </a>
        </div>
      </div>
    </li>
  );
};
