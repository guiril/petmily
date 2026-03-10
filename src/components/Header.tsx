import Link from 'next/link';

import { CITIES } from '@/lib/cities';

interface HeaderProps {
  activeCity: string;
}

export const Header = ({ activeCity }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-orange-200 bg-orange-50 px-6">
      <span className="text-base font-semibold tracking-tight text-orange-950">
        Petmily
      </span>
      <div className="flex gap-1">
        {CITIES.map(({ key, label, available }) => {
          const isActive = key === activeCity;

          if (!available) {
            return (
              <span
                key={key}
                className="cursor-not-allowed rounded px-3 py-1 text-sm text-orange-300"
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
                  ? 'bg-orange-500 text-white'
                  : 'text-orange-500 hover:bg-orange-100'
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
