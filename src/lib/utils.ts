export const hasOverlap = (items: string[], selected: Set<string>): boolean =>
  items.some((item) => selected.has(item));

export const toggleSetValue = (
  set: Set<string>,
  value: string,
): Set<string> => {
  const newSet = new Set(set);

  if (newSet.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }

  return newSet;
};
