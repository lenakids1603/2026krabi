import { Restaurant } from '../types';
import beachDinner from '../assets/images/thai_beach_dinner_1779244685299.png';

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
