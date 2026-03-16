export const ELLIPSIS = '...' as const;
export type PageItem = number | typeof ELLIPSIS;

export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: PageItem[] = [1];
  const showLeadingEllipsis = currentPage > 3;
  const showTrailingEllipsis = currentPage < totalPages - 2;

  if (showLeadingEllipsis) {
    pages.push(ELLIPSIS);
  }

  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  for (let page = rangeStart; page <= rangeEnd; page++) {
    pages.push(page);
  }

  if (showTrailingEllipsis) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};
