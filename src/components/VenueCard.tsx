import type { Venue } from '@/types/venue';

interface VenueCardProps {
  venue: Venue;
}

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
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium leading-snug text-gray-900">
          {venue.name}
        </h3>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-blue-500 hover:underline"
        >
          地圖
        </a>
      </div>
      <p className="text-xs text-gray-500">{venue.address}</p>
      {venue.phone && <p className="text-xs text-gray-500">{venue.phone}</p>}
      <div className="mt-1 flex flex-wrap gap-1">
        {venue.serviceType.map((type) => (
          <span
            key={type}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          >
            {type}
          </span>
        ))}
        {venue.petType.map((type) => (
          <span
            key={type}
            className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
