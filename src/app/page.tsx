import type { CityKey } from '@/types/venue';
import { Header } from '@/components/Header';
import { VenueLayout } from '@/components/VenueLayout';
import { CITIES, DEFAULT_CITY } from '@/lib/cities';
import { fetchVenues } from '@/lib/venues';

interface HomeProps {
  searchParams: Promise<{ city?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { city: cityParam } = await searchParams;

  const activeCity =
    CITIES.find((city) => city.key === cityParam && city.available)?.key ??
    DEFAULT_CITY;

  const data = await fetchVenues();
  const venues = data.venues[activeCity as CityKey] ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header activeCity={activeCity} />
      <VenueLayout venues={venues} />
    </div>
  );
}
