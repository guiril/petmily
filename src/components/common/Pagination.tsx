'use client';

import { useMemo } from 'react';
import { ELLIPSIS, getPageNumbers } from '@/utils/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-w-7 min-h-7 rounded-full text-xl text-orange-500 cursor-pointer transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        ‹
      </button>

      {pageNumbers.map((page, index) =>
        page === ELLIPSIS ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1.5 text-sm text-orange-300"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-7 min-h-7 rounded-full text-sm cursor-pointer transition-colors ${
              currentPage === page
                ? 'bg-orange-400 text-white'
                : 'text-orange-500 hover:bg-orange-100'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-w-7 min-h-7 rounded-full text-xl text-orange-500 cursor-pointer transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        ›
      </button>
    </div>
  );
};
