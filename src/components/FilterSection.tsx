'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FilterOption } from '@/types/filters';

const VISIBLE_COUNT = 8;

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}

export const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isHeaderHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const optionsLength = options.length;
  const hasMore = optionsLength > VISIBLE_COUNT;
  const visibleOptions =
    hasMore && !isExpanded ? options.slice(0, VISIBLE_COUNT) : options;
  const hiddenCount = optionsLength - VISIBLE_COUNT;

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
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <legend className="text-base font-bold -tracking-[0.02em] text-ink">
          {`${title} (${optionsLength})`}
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
              className={`flex justify-center itmes-center gap-2.5 py-3 text-center border border-[#E7E5E4] rounded-[10px] cursor-pointer  ${
                selected.has(name)
                  ? 'text-white bg-[#292524]'
                  : 'text-[#57534D] bg-white hover:bg-[#E7E5E4] active:bg-[#E7E5E4]'
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
              className="col-span-2 w-full py-3 mt-2 text-sm font-bold text-[#44403B] rounded-lg bg-[#F5F5F4] cursor-pointer"
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
