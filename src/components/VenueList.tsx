import type { FilterState } from '@/types/filters';
import type { Venue } from '@/types/venue';
import { Pagination } from './common/Pagination';
import { ActiveFilters } from './ActiveFilters';
import { VenueCard } from './VenueCard';

interface VenueListProps {
  venues: Venue[];
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  selectedFilters: FilterState;
  onOpenSheet: () => void;
  onRemoveFilter: (category: keyof FilterState, value: string) => void;
  onClearAllFilters: () => void;
  onPageChange: (page: number) => void;
}

export const VenueList = ({
  venues,
  filteredCount,
  totalCount,
  currentPage,
  totalPages,
  selectedFilters,
  onOpenSheet,
  onRemoveFilter,
  onClearAllFilters,
  onPageChange,
}: VenueListProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex items-center border-b border-orange-100 bg-orange-50 px-4 py-2 md:hidden">
        <button
          onClick={onOpenSheet}
          className="cursor-pointer rounded border border-orange-300 px-3 py-1.5 text-sm text-orange-600"
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
        <p className="mb-3 text-sm text-orange-400">
          {filteredCount === totalCount
            ? `全部 ${totalCount} 筆，第 ${currentPage} 頁`
            : `已篩選 ${filteredCount} 筆，第 ${currentPage} 頁`}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};
