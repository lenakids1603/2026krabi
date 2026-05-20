import { Attraction } from '../types';
import krabiIslands from '../assets/images/krabi_island_tour_1779244669020.png';
import krabiResort from '../assets/images/krabi_luxury_resort_1779244650872.png';
import krabiSunsetDinner from '../assets/images/krabi_sunset_dinner_1779252115396.png';
import thaiBeachDinner from '../assets/images/thai_beach_dinner_1779244685299.png';
import forestSprings from '../assets/images/changi_waterfall_one_1779244607786.png';
import krabiHero from '../assets/images/krabi_hero_retreat_1779245216266.png';

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    title: '甲米经典四岛出海游 (Four Islands Tour)',
    rating: 4.9,
    duration: '6小时',
    description: '【统一活动】乘坐长尾船穿梭于波达岛、鸡岛、管岛及莫岛之间，在神奇的“一线天”沙滩漫步，体验浮潜与玻璃海。',
    image: krabiIslands,
    packingList: ['泳衣', '防晒霜', '防水袋', '换洗衣物'],
    type: 'water',
    category: 'unified',
    region: '甲米'
  },
  {
    id: '2',
    title: '海滩落日迎宾晚宴 (Beach Welcome Dinner)',
    rating: 4.8,
    duration: '3小时',
    description: '【统一活动】在甲米沙滩欢聚，享用正宗地道泰式海鲜料理，感受椰林海风与震撼的晚霞落日景致。',
    image: thaiBeachDinner,
    packingList: ['相机/手机', '防蚊液', '休闲便装'],
    type: 'culture',
    category: 'unified',
    region: '甲米'
  },
  {
    id: '3',
    title: '宏岛快艇跳岛拼船 (Hong Island Speedboat)',
    rating: 4.9,
    duration: '5小时',
    description: '【统一活动】前往宏岛（割喉岛）群礁，穿过静谧的潟湖入口，在翡翠般的内海中游泳，登上360度大视角观景台。',
    image: krabiHero,
    packingList: ['沙滩拖鞋', '太阳镜', '防晒服', '晕船药'],
    type: 'water',
    category: 'unified',
    region: '甲米'
  },
  {
    id: '4',
    title: '兰塔岛红树林皮划艇 (Mangrove Kayaking)',
    rating: 4.7,
    duration: '3小时',
    description: '【建议自选】由专业向导带领，深入兰塔岛红树林静谧迷宫，探寻独特的天然红树、海洋生物和野生猴群。',
    image: krabiResort,
    packingList: ['驱蚊水', '遮阳帽', '长袖速干衣'],
    type: 'nature',
    category: 'suggested',
    region: '兰塔'
  },
  {
    id: '5',
    title: '奥南海滩 sunset 漫步 (Sunset Promenade)',
    rating: 4.7,
    duration: '2小时',
    description: '【建议自选】漫步于甲米最热闹的奥南海滩大道。这里有最壮观的金色日落、椰风晚霞、各式酒吧和泰式街头小吃。',
    image: krabiSunsetDinner,
    packingList: ['舒适凉鞋', '贴身小包', '防蚊液'],
    type: 'nature',
    category: 'suggested',
    region: '甲米'
  },
  {
    id: '6',
    title: '翡翠池与温泉瀑布 (Emerald Pool & Hot Springs)',
    rating: 4.6,
    duration: '4小时',
    description: '【建议自选】隐匿于热带雨林中的天然矿物淡水湖，池水呈现宝石般的翡翠色，可顺便体验层叠错落的林间天然温泉。',
    image: forestSprings,
    packingList: ['泳衣', '毛巾', '涉水鞋', '防蚊喷雾'],
    type: 'nature',
    category: 'suggested',
    region: '甲米'
  }
];
