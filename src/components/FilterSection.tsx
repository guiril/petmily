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
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={selected.has(option)}
            onChange={() => onToggle(option)}
            className="h-3.5 w-3.5 rounded border-gray-300 accent-gray-900"
          />
          <span className="text-sm text-gray-600">{option}</span>
        </label>
      ))}
    </div>
  );
};
