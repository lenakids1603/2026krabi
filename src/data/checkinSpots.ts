import { CheckinSpot } from '../types/api';
import sunsetImg from '../assets/images/railay_beach_sunset_1779278430557.png';
import dinnerImg from '../assets/images/thai_beach_dinner_1779244685299.png';
import barImg from '../assets/images/krabi_sunset_dinner_1779252115396.png';

export const DEFAULT_CHECKIN_SPOTS: CheckinSpot[] = [
  {
    id: 'default-1',
    name: '普吉岛悬崖落日',
    category: '摄影位',
    description: '绝佳的落日拍摄点，可以俯瞰整个卡隆海滩，建议下午5:30到达。',
    image: sunsetImg,
    lat: 7.8204,
    lng: 98.2985,
    user: 'Lenakids 领队',
    createdAt: '2026-06-25T17:30:00Z',
    address: 'Karon View Point, Karon, Phuket',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.8204,98.2985'
  },
  {
    id: 'default-2',
    name: '蓝象餐厅 Blue Elephant',
    category: '餐厅',
    description: '藏在古老建筑中的米其林美食，泰式酸辣汤是这里的招牌必点。',
    image: dinnerImg,
    lat: 7.8841,
    lng: 98.3892,
    user: 'Xiao Min',
    createdAt: '2026-06-25T12:00:00Z',
    address: '96 Krabi Road, Talad Neua, Phuket Town',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.8841,98.3892'
  },
  {
    id: 'default-3',
    name: '兰塔海滩落日酒吧',
    category: '酒吧',
    description: '兰塔岛上氛围绝佳的沙滩酒吧，伴着温柔的波涛 and 动听的音乐，来一杯鸡尾酒。',
    image: barImg,
    lat: 7.6253,
    lng: 99.0342,
    user: 'Xiao Fang',
    createdAt: '2026-06-26T20:00:00Z',
    address: 'Long Beach, Koh Lanta, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.6253,99.0342'
  }
];
