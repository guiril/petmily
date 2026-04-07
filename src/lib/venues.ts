import type { CityKey, RawVenue, Venue, VenuesData } from '@/types/venue';

const VENUES_URL =
  'https://raw.githubusercontent.com/guiril/petmily-crawler/main/data/venues.json';

export const fetchVenues = async (): Promise<Venue[]> => {
  try {
    const response = await fetch(VENUES_URL, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venues: ${response.status}`);
    }

    const data: VenuesData = await response.json();

    return (Object.entries(data.venues) as [CityKey, RawVenue[]][]).flatMap(
      ([city, venues]) => (venues ?? []).map((venue) => ({ ...venue, city })),
    );
  } catch (error) {
    console.error('[fetchVenues]', error);
    throw error;
  }
};
