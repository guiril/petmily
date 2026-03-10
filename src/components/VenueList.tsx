import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { ActiveFilters } from './ActiveFilters';
import { VenueCard } from './VenueCard';

interface VenueListProps {
  venues: Venue[];
  totalCount: number;
  selectedFilters: FilterState;
  onOpenSheet: () => void;
  onRemoveFilter: (category: keyof FilterState, value: string) => void;
  onClearAllFilters: () => void;
}

export const VenueList = ({
  venues,
  totalCount,
  selectedFilters,
  onOpenSheet,
  onRemoveFilter,
  onClearAllFilters,
}: VenueListProps) => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex items-center border-b border-stone-100 bg-white px-4 py-2 md:hidden">
        <button
          onClick={onOpenSheet}
          className="rounded border border-stone-300 px-3 py-1.5 text-sm text-stone-600"
        >
          篩選
        </button>
      </div>
      <ActiveFilters
        selectedFilters={selectedFilters}
        onRemove={onRemoveFilter}
        onClearAll={onClearAllFilters}
      />
      <div className="p-4">
        <p className="mb-3 text-xs text-stone-400">
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
