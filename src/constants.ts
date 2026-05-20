import { Attraction, DayItinerary, NavItem, Restaurant, TeamMember } from './types';
import { 
  AVATAR_MING, 
  AVATAR_XIAOFANG, 
  AVATAR_JIANGUO, 
  ITINERARY_DAY1_BG, 
  ITINERARY_DAY3_BG 
} from './assets/localImages';

import krabiIslands from '@/src/assets/images/krabi_island_tour_1779244669020.png';
import krabiResort from '@/src/assets/images/krabi_luxury_resort_1779244650872.png';
import beachDinner from '@/src/assets/images/thai_beach_dinner_1779244685299.png';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', path: '/', icon: 'home' },
  { id: 'itinerary', label: '行程安排', path: '/itinerary', icon: 'calendar-days' },
  { id: 'travel-info', label: '机酒信息', path: '/travel-info', icon: 'plane-takeoff' },
  { id: 'attractions', label: '景点项目', path: '/attractions', icon: 'map-pin' },
  { id: 'dining', label: '餐饮便利', path: '/dining', icon: 'utensils' },
  { id: 'weather', label: '天气潮汐', path: '/weather', icon: 'waves' },
  { id: 'gallery', label: '共享相册', path: '/gallery', icon: 'camera' },
  { id: 'directory', label: '通讯录', path: '/directory', icon: 'users' },
  { id: 'notes', label: '注意事项', path: '/more', icon: 'info' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: '陈昂',
    nameEn: 'Ming Chen',
    role: '执行领队',
    roleEn: 'EXECUTIVE LEAD',
    phone: '+66 (0) 81-876-5432',
    avatar: AVATAR_MING,
    type: 'lead'
  },
  {
    id: '2',
    name: '兹易瑒',
    nameEn: 'Xiaofang Wang',
    role: '行政协调',
    roleEn: 'ADMIN COORDINATOR',
    phone: '+66 (0) 82-555-0199',
    avatar: AVATAR_XIAOFANG,
    type: 'admin'
  },
  {
    id: '3',
    name: '逐健嘤',
    nameEn: 'Jianguo Ma',
    role: '技术支持',
    roleEn: 'IT SUPPORT',
    phone: '+66 (0) 89-123-0000',
    avatar: AVATAR_JIANGUO,
    type: 'member'
  }
];

export const ITINERARY: DayItinerary[] = [
  {
    day: 1,
    date: '06.28',
    title: '启程赴约',
    activities: [
      {
        id: 'a1',
        time: '23:00',
        title: '团队集结 & 登机',
        location: '萧山国际机场 (HGH) T4',
        description: '带着憧憬出发，开启我们的2026兰塔之旅。',
        type: 'itinerary',
        icon: 'plane-takeoff'
      }
    ],
    tags: ['交通', '集结'],
    image: ITINERARY_DAY1_BG
  },
  {
    day: 2,
    date: '06.29',
    title: '抵达度假村',
    activities: [
      {
        id: 'a2',
        time: '11:50',
        title: '抵达甲米',
        location: '甲米国际机场 (KBV)',
        description: '专车接机前往度假村，办理入住。',
        type: 'itinerary',
        icon: 'navigation'
      },
      {
        id: 'a2-2',
        time: '18:30',
        title: '迎新晚宴',
        location: '海滨餐厅',
        description: '吹着海风，享用特色泰式美食。',
        type: 'dining',
        icon: 'utensils'
      }
    ],
    tags: ['抵达', '餐饮']
  },
  {
    day: 3,
    date: '06.30',
    title: '海岛探索',
    activities: [
      {
        id: 'a3',
        time: '09:00 - 16:00',
        title: '神奇四岛浮潜',
        location: 'Chicken Island & Poda Island',
        description: '在蔚蓝的海水中尽情浮潜。',
        type: 'attraction',
        icon: 'waves'
      }
    ],
    image: ITINERARY_DAY3_BG
  },
  {
    day: 9,
    date: '07.06',
    title: '告别甲米 & 返程',
    activities: [
      {
        id: 'a9',
        time: '12:25',
        title: '团队集结 & 赴机',
        location: '甲米国际机场 (KBV)',
        description: '结束愉快的2026兰塔之旅，启程回国。',
        type: 'itinerary',
        icon: 'plane-takeoff'
      }
    ],
    tags: ['返程', '交通']
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    title: 'Krabi Four Islands Tour',
    rating: 4.9,
    duration: '6小时',
    description: '乘坐长尾船穿梭于波达岛、鸡岛、管岛及莫岛之间，在神奇的“一线天”沙滩漫步。',
    image: krabiIslands,
    packingList: ['泳衣', '防晒霜', '防水袋'],
    type: 'water'
  },
  {
    id: '2',
    title: 'Koh Lanta Mangrove Kayaking',
    rating: 4.7,
    duration: '3小时',
    description: '深入兰塔岛红树林迷宫，近距离观察独特的海洋生态系统 and 野生猴群。',
    image: krabiResort,
    packingList: ['驱蚊液', '遮阳帽', '运动鞋'],
    type: 'nature'
  }
];

export const RESTAURANTS: Restaurant[] = [
    {
        id: '1',
        name: 'Lanta Seafood Restaurant',
        rating: 4.9,
        description: '兰塔岛最著名的老牌海鲜馆，位于海港边。每日清晨捕捞的新鲜食材，强烈推荐黄咖喱蟹和冬阴功汤。',
        image: beachDinner,
        dist: '1.2km',
        type: 'seafood',
        tags: ['Team Favorite: 咖喱蟹', '#本地特色']
    }
];
