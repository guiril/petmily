import type { CityKey, RawVenue, Venue, VenuesData } from '@/types/venue';

const VENUES_URL =
  'https://raw.githubusercontent.com/guiril/petmily-crawler/main/data/venues.json';

export const fetchVenues = async (): Promise<Venue[]> => {
  const response = await fetch(VENUES_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const data: VenuesData = await response.json();
  return (Object.entries(data.venues) as [
    CityKey,
    RawVenue[],
  ][]).flatMap(([city, venues]) =>
    (venues ?? []).map((venue) => ({ ...venue, city })),
  );
};
