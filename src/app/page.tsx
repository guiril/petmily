import type { Venue } from '@/types/venue';
import { Header } from '@/components/Header';
import { VenueLayout } from '@/components/VenueLayout';

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
  {
    id: 'taichung-3',
    name: '寵物友善咖啡廳 WOOF',
    address: '台中市南區建國路300號',
    district: '南區',
    serviceType: ['餐飲'],
    petType: ['犬'],
    phone: '04-2260-9999',
    location: { lat: 24.1301, lng: 120.6801 },
  },
  {
    id: 'taichung-4',
    name: '毛毛動物醫院',
    address: '台中市東區和平街50號',
    district: '東區',
    serviceType: ['其他'],
    petType: ['犬', '貓'],
  },
  {
    id: 'taichung-5',
    name: '汪喵寵物民宿',
    address: '台中市大里區仁化路88號',
    district: '大里區',
    serviceType: ['住宿'],
    petType: ['犬', '貓', '其他'],
    phone: '04-2481-7777',
    location: { lat: 24.0989, lng: 120.6842 },
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <VenueLayout venues={mockVenues} />
    </div>
  );
}
