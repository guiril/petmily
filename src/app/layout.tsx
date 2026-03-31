import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Petmily | 寵物友善場所查詢',
  description: '查詢台灣各地寵物友善餐廳、住宿、娛樂等場所',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chevron_left,chevron_right"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
