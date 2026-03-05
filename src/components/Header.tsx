export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <span className="text-base font-semibold tracking-tight text-gray-900">
        Petmily
      </span>
      <div className="flex gap-1">
        {['台中', '台北', '高雄'].map((city) => (
          <button
            key={city}
            className="rounded px-3 py-1 text-sm text-gray-500 transition-colors first:bg-gray-900 first:text-white"
          >
            {city}
          </button>
        ))}
      </div>
    </header>
  );
};
