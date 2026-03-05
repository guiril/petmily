import type { Venue } from '@/types/venue';
import { VenueCard } from '@/components/VenueCard';

const mockVenues: Venue[] = [
  {
    id: 'taichung-0',
    name: '鮮森林親子寵物餐廳',
    address: '台中市西區民生路100號',
    district: '西區',
    serviceType: ['餐飲'],
    petType: ['犬', '貓'],
    phone: '04-2321-1234',
    location: { lat: 24.1477, lng: 120.6736 },
  },
  {
    id: 'taichung-1',
    name: '毛孩樂園寵物旅館',
    address: '台中市北區進化路200號',
    district: '北區',
    serviceType: ['住宿', '其他'],
    petType: ['犬'],
    phone: '04-2201-5678',
  },
  {
    id: 'taichung-2',
    name: '台中都會公園',
    address: '台中市西屯區惠來路二段360號',
    district: '西屯區',
    serviceType: ['娛樂'],
    petType: ['犬', '貓', '其他'],
    location: { lat: 24.1685, lng: 120.6423 },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <p className="mb-6 text-xs text-gray-400">VenueCard demo</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
