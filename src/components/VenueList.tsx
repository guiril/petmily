import type { Venue } from '@/types/venue';
import { VenueCard } from './VenueCard';

interface VenueListProps {
  venues: Venue[];
  totalCount: number;
}

export const VenueList = ({ venues, totalCount }: VenueListProps) => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex items-center border-b border-gray-100 bg-white px-4 py-2 md:hidden">
        <button className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600">
          篩選
        </button>
      </div>
      <div className="p-4">
        <p className="mb-3 text-xs text-gray-400">
          {venues.length === totalCount
            ? `顯示全部 ${totalCount} 筆`
            : `已篩選 ${venues.length} 筆`}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </main>
  );
};
