interface FilterSectionProps {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}

export const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
}: FilterSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => onToggle(option)}
              className="h-3.5 w-3.5 cursor-pointer rounded border-stone-300 accent-amber-700"
            />
            <span className="text-base text-stone-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
