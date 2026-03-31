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
    return `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name} ${venue.address}`,
  )}`;
};

export const VenueCard = ({ venue }: VenueCardProps) => {
  const mapUrl = getMapUrl(venue);

  return (
    <li className="flex flex-col max-md:flex-row border border-[#E7E5E4] bg-white rounded-2xl max-md:h-35.25 max-md:rounded-xl">
      <div
        style={
          venue.imageUrl
            ? { backgroundImage: `url(${venue.imageUrl})` }
            : undefined
        }
        className={`relative h-46.25 bg-center bg-no-repeat rounded-t-2xl max-md:w-[37.9%] max-md:h-auto max-md:rounded-xl ${
          venue.imageUrl
            ? 'bg-cover'
            : 'bg-white bg-[url(/images/logo-2.svg)] bg-contain'
        }`}
      >
        <ul className="absolute left-4 bottom-3 flex gap-2 max-md:left-3 max-md:bottom-2">
          {venue.petType.map((type) => (
            <li
              key={type}
              className={`w-7 h-7 flex justify-center items-center rounded-full ${PET_TYPE_ICONS[type].bgColor} ${PET_TYPE_ICONS[type].borderColor} max-md:w-6 max-md:h-6`}
            >
              <Image
                src={PET_TYPE_ICONS[type].src}
                width={18}
                height={18}
                alt={type}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 max-md:p-3 overflow-hidden">
        <div className="flex flex-col flex-1">
          <h3
            title={venue.name}
            className="text-lg font-bold text-ink overflow-hidden whitespace-nowrap text-ellipsis max-md:text-sm"
          >
            {venue.name}
          </h3>
          <span className="block mb-4 text-sm text-ink-muted max-md:text-xs max-md:mb-3">
            {venue.address}
          </span>
          {venue.phone && (
            <div className="flex items-center gap-2">
              <Image src="/images/phone.svg" width={12} height={12} alt="" />
              <span className="text-[15px] font-bold text-ink max-md:text-xs">
                {venue.phone}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <ul className="flex gap-1.5">
            {venue.serviceType.map((type) => (
              <li key={type}>
                <span
                  key={type}
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
            className="pt-2 pb-1.5 pr-3.5 pl-2 flex items-center gap-1 bg-[#F5F5F4] rounded-[100px] max-md:px-3"
          >
            <Image
              src="/images/location.svg"
              width={15}
              height={15}
              alt=""
              className="max-md:hidden"
            />
            <span className="block text-xs font-medium leading-5">地圖</span>
          </a>
        </div>
      </div>
    </li>
  );
};
