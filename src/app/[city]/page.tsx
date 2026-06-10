import { notFound } from 'next/navigation';
import { getVenuesByCity } from '@/services/venues';
import { AVAILABLE_CITIES } from '@/lib/cities';
import { VenueLayout } from '@/components/VenueLayout';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;

  const isValidCity = AVAILABLE_CITIES.some(
    (cityConfig) => cityConfig.key === city,
  );

  if (!isValidCity) {
    notFound();
  }

  const venues = (await getVenuesByCity(city)) ?? [];

  return (
    <>
      <VenueLayout city={city} venues={venues} />
    </>
  );
}
