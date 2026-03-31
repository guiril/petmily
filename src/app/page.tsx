import { Header } from '@/components/Header';
import { VenueLayout } from '@/components/VenueLayout';
import { fetchVenues } from '@/lib/venues';

export default async function Home() {
  const venues = await fetchVenues();

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <VenueLayout venues={venues} />
    </div>
  );
}
