export interface CityConfig {
  key: string;
  label: string;
  available: boolean;
}

export const CITIES: CityConfig[] = [
  { key: 'taichung', label: '台中', available: true },
  { key: 'taipei', label: '台北', available: false },
  { key: 'kaohsiung', label: '高雄', available: false },
];

export const DEFAULT_CITY = 'taichung';
