'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FilterOption } from '@/types/filters';

const VISIBLE_COUNT = 8;

interface FilterSectionProps {
  name: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}

export const FilterSection = ({
  name,
  options,
  selected,
  onToggle,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = options.length > VISIBLE_COUNT;
  const visibleOptions =
    hasMore && !isExpanded ? options.slice(0, VISIBLE_COUNT) : options;

  const chevronVariant = isHeaderHovered ? 'hover' : 'default';
  const chevronSrc = isOpen
    ? `/images/chevron/up-${chevronVariant}.svg`
    : `/images/chevron/down-${chevronVariant}.svg`;

  return (
    <fieldset className="relative py-3 flex flex-col gap-1">
      <button
        type="button"
        className="py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <legend className="text-base font-bold -tracking-[0.02em] text-ink">
          {`${name} (${options.length})`}
        </legend>
        <Image src={chevronSrc} width={28} height={28} alt="" />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="grid grid-cols-2 gap-2 overflow-hidden">
          {visibleOptions.map(({ key, name }) => (
            <label
              key={key}
              className={`flex justify-center items-center gap-2.5 py-3 text-center border border-stone-200 rounded-control cursor-pointer ${
                selected.has(name)
                  ? 'text-white bg-stone-800 border-transparent'
                  : 'text-ink-sub bg-white hover:bg-stone-200 active:bg-stone-200'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(name)}
                onChange={() => onToggle(name)}
                className="hidden"
              />
              <span className="text-sm">{name}</span>
            </label>
          ))}
          {hasMore && (
            <button
              type="button"
              className="col-span-2 w-full py-3 mt-2 text-sm font-bold text-stone-700 rounded-lg bg-stone-100 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '顯示較少' : '顯示更多'}
            </button>
          )}
        </div>
      </div>
    </fieldset>
  );
};
