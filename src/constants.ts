import { Attraction, DayItinerary, NavItem, Restaurant } from './types';
import { 
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
  { id: 'attractions', label: '活动安排', path: '/attractions', icon: 'map' },
  { id: 'dining', label: '周边查询', path: '/dining', icon: 'compass' },
  { id: 'weather', label: '天气和潮汐', path: '/weather', icon: 'waves' },
  { id: 'gallery', label: '共享相册', path: '/gallery', icon: 'camera' },
  { id: 'directory', label: '临时泰国通讯录', path: '/directory', icon: 'users' },
  { id: 'notes', label: '注意事项', path: '/more', icon: 'info' },
];

import { TEAM_MEMBERS } from './data/teamMembers';
export { TEAM_MEMBERS };

import { ITINERARY as DATA_ITINERARY } from './data/itinerary';
export const ITINERARY = DATA_ITINERARY as unknown as DayItinerary[];

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
