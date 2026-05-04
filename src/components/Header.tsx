import Image from 'next/image';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 px-4 py-6 flex items-center justify-between border-b border-orange-200 bg-white">
      <h1>
        <a href="/">
          <span className="sr-only">Petmily</span>
          <Image src="/images/logo.svg" width={122} height={32} alt="Petmily" />
        </a>
      </h1>
    </header>
  );
};
