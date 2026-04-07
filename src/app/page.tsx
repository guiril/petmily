import { fetchVenues } from '@/lib/venues';
import { Header } from '@/components/Header';
import { VenueLayout } from '@/components/VenueLayout';

export default async function Home() {
  const venues = await fetchVenues();

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header />
      <VenueLayout venues={venues} />
    </div>
  );
}
