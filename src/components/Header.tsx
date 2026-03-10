import Link from 'next/link';

import { CITIES } from '@/lib/cities';

interface HeaderProps {
  activeCity: string;
}

export const Header = ({ activeCity }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <span className="text-base font-semibold tracking-tight text-gray-900">
        Petmily
      </span>
      <div className="flex gap-1">
        {CITIES.map(({ key, label, available }) => {
          const isActive = key === activeCity;

          if (!available) {
            return (
              <span
                key={key}
                className="cursor-not-allowed rounded px-3 py-1 text-sm text-gray-300"
              >
                {label}
              </span>
            );
          }

          return (
            <Link
              key={key}
              href={`/?city=${key}`}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};
