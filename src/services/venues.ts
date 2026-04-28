import type { CityKey, RawVenue, Venue, VenuesData } from '@/types/venue';

const GITHUB_VENUES_URL =
  'https://raw.githubusercontent.com/guiril/petmily-crawler/main/data/venues.json';

const fetchVenuesData = async (): Promise<VenuesData> => {
  const response = await fetch(GITHUB_VENUES_URL, { cache: 'force-cache' });

  if (!response.ok) {
    throw new Error(`Upstream fetch failed: ${response.status}`);
  }

  const data: VenuesData = await response.json();
  return data;
};

export const getAllVenues = async (): Promise<Venue[]> => {
  const data = await fetchVenuesData();
  const entries = Object.entries(data.venues) as [
    CityKey,
    RawVenue[] | undefined,
  ][];

  return entries.flatMap(([city, venues]) =>
    (venues ?? []).map((venue) => ({ ...venue, city })),
  );
};

export const getVenuesByCity = async (
  city: string,
): Promise<Venue[] | null> => {
  const data = await fetchVenuesData();
  const cityKey = city as CityKey;
  const cityVenues: RawVenue[] | undefined = data.venues[cityKey];

  if (!cityVenues) return null;

  return cityVenues.map((venue) => ({ ...venue, city: cityKey }));
};
