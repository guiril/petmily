interface CityDistrict {
  key: string;
  name: string;
}

interface CityConfig {
  key: string;
  name: string;
  isAvailable: boolean;
  districts: CityDistrict[];
}

export const CITIES = [
  { key: 'taipei', name: '台北', isAvailable: false, districts: [] },
  {
    key: 'taichung',
    name: '台中',
    isAvailable: true,
    districts: [
      { key: 'zhongqu', name: '中區' },
      { key: 'dongqu', name: '東區' },
      { key: 'xiqu', name: '西區' },
      { key: 'nanqu', name: '南區' },
      { key: 'beiqu', name: '北區' },
      { key: 'xitun', name: '西屯區' },
      { key: 'nantun', name: '南屯區' },
      { key: 'beitun', name: '北屯區' },
      { key: 'fengyuan', name: '豐原區' },
      { key: 'dali', name: '大里區' },
      { key: 'taiping', name: '太平區' },
      { key: 'qingshui', name: '清水區' },
      { key: 'shalu', name: '沙鹿區' },
      { key: 'dajia', name: '大甲區' },
      { key: 'dongshi', name: '東勢區' },
      { key: 'wuqi', name: '梧棲區' },
      { key: 'wuri', name: '烏日區' },
      { key: 'shengang', name: '神岡區' },
      { key: 'dadu', name: '大肚區' },
      { key: 'daya', name: '大雅區' },
      { key: 'houli', name: '后里區' },
      { key: 'wufeng', name: '霧峰區' },
      { key: 'tanzi', name: '潭子區' },
      { key: 'longjing', name: '龍井區' },
      { key: 'waipu', name: '外埔區' },
      { key: 'heping', name: '和平區' },
      { key: 'shigang', name: '石岡區' },
      { key: 'daan', name: '大安區' },
      { key: 'xinshe', name: '新社區' },
    ],
  },
  { key: 'kaohsiung', name: '高雄', isAvailable: false, districts: [] },
] as const satisfies CityConfig[];
