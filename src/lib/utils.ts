export const hasOverlap = (items: string[], selected: Set<string>): boolean =>
  items.some((item) => selected.has(item));
