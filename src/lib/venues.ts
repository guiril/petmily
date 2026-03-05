import type { VenuesData } from '@/types/venue';

const VENUES_URL =
  'https://raw.githubusercontent.com/guiril/petmily-crawler/main/data/venues.json';

export const fetchVenues = async (): Promise<VenuesData> => {
  const response = await fetch(VENUES_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const data: VenuesData = await response.json();
  return data;
};
