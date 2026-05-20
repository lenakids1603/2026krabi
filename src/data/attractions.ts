import { Attraction } from '../types';
import krabiIslands from '../assets/images/krabi_island_tour_1779244669020.png';
import krabiResort from '../assets/images/krabi_luxury_resort_1779244650872.png';

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
