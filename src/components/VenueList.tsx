import { useRef } from 'react';
import Image from 'next/image';
import type { Venue } from '@/types/venue';
import { Pagination } from './common/Pagination';
import { VenueCard } from './VenueCard';
import { Footer } from './Footer';

interface VenueListProps {
  venues: Venue[];
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onOpenSheet: () => void;
  onPageChange: (page: number) => void;
}

export const VenueList = ({
  venues,
  filteredCount,
  totalCount,
  currentPage,
  totalPages,
  onOpenSheet,
  onPageChange,
}: VenueListProps) => {
  const mainRef = useRef<HTMLElement>(null);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={mainRef} className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex-1 px-6 pt-8 pb-6 max-lg:pb-5 max-lg:px-4 max-lg:pt-5">
        <div className="mb-6 flex justify-between items-center max-lg:mb-5">
          <p className="text-2xl font-bold text-ink max-lg:text-base max-lg:leading-8">
            {filteredCount === totalCount
              ? `目前顯示 ${totalCount} 間店家`
              : `找到 ${filteredCount} 件相符條件`}
          </p>
          <button
            onClick={onOpenSheet}
            className="pl-2.5 pr-3 py-2 hidden justify-center items-center gap-1 bg-[#0C0A09] rounded-lg cursor-pointer max-lg:flex"
          >
            <Image src="/images/filter.svg" width={12} height={12} alt="" />
            <span className="text-xs text-white">篩選</span>
          </button>
        </div>
        <ul className="grid grid-cols-4 gap-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 max-lg:gap-2">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </ul>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Footer />
    </main>
  );
};
