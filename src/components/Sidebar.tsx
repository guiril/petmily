const SERVICE_TYPES = ['餐飲', '娛樂', '住宿', '交通', '其他'];
const PET_TYPES = ['犬', '貓', '其他'];

interface FilterSectionProps {
  title: string;
  options: string[];
}

const FilterSection = ({ title, options }: FilterSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-gray-300 accent-gray-900"
          />
          <span className="text-sm text-gray-600">{option}</span>
        </label>
      ))}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <aside className="flex w-44 shrink-0 flex-col gap-5 border-r border-gray-200 bg-white p-4">
      <FilterSection title="服務類型" options={SERVICE_TYPES} />
      <FilterSection title="寵物種類" options={PET_TYPES} />
    </aside>
  );
};
