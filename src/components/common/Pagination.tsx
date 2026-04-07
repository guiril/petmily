'use client';

import { useMemo } from 'react';
import { ELLIPSIS, getPageNumbers } from '@/lib/pagination';

interface NavButtonProps {
  icon: 'chevron_left' | 'chevron_right';
  disabled: boolean;
  onClick: () => void;
}

const NavButton = ({ icon, disabled, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-10 h-10 flex justify-center items-center rounded-full not-disabled:text-ink-muted cursor-pointer transition-colors not-disabled:hover:bg-orange-100 disabled:cursor-not-allowed disabled:text-ink-disabled"
  >
    <span className="material-symbols-outlined text-xl!">{icon}</span>
  </button>
);

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
    <div className="mt-8 flex items-center justify-center gap-2 max-sm:gap-0">
      <NavButton
        icon="chevron_left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((number, index) =>
        number === ELLIPSIS ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1.5 text-sm text-ink-sub cursor-default"
          >
            …
          </span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              currentPage === number
                ? 'bg-ink text-white shadow-[0px_0px_0px_3px_#00000014]'
                : 'text-ink-sub hover:bg-orange-100'
            }`}
          >
            {number}
          </button>
        ),
      )}
      <NavButton
        icon="chevron_right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
