import { Header } from '@/components/Header';
import { VenueLayout } from '@/components/VenueLayout';
import { fetchVenues } from '@/lib/venues';

export default async function Home() {
  const data = await fetchVenues();
  const venues = data.venues.taichung;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <VenueLayout venues={venues} />
    </div>
  );
}
