import { CheckinSpot } from '../types/api';

// Curated real Krabi check-in spots. Photos live in /public/checkin-spots
// (served at the site root) so the same paths work for the bundled fallback
// here and for the server seed data. See public/checkin-spots/CREDITS.md.
export const DEFAULT_CHECKIN_SPOTS: CheckinSpot[] = [
  {
    id: 'seed-railay-west',
    name: '莱利海滩 Railay Beach',
    category: '摄影位',
    description: '甲米的明信片地标，被巨型石灰岩绝壁环抱，只能坐船抵达。傍晚退潮时长尾船停满金色沙滩，是拍日落剪影的绝佳机位。',
    image: '/checkin-spots/railay.jpg',
    lat: 8.0116,
    lng: 98.8379,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T09:00:00.000Z',
    address: 'Railay West Beach, Ao Nang, Mueang Krabi, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.0116,98.8379'
  },
  {
    id: 'seed-phranang',
    name: '帕南悬崖海滩 Phra Nang',
    category: '摄影位',
    description: '常被评为全球最美海滩之一，金色沙滩与垂挂钟乳石的悬崖相依。崖下还藏着神秘的公主洞，浮潜、攀岩、拍照都一流。',
    image: '/checkin-spots/phranang.jpg',
    lat: 8.0059,
    lng: 98.8377,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:50:00.000Z',
    address: 'Phra Nang Cave Beach, Railay, Ao Nang, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.0059,98.8377'
  },
  {
    id: 'seed-koh-hong',
    name: '洪岛观景台 Koh Hong',
    category: '摄影位',
    description: '翡翠色泻湖环抱的无人岛，登上 360° 观景台可俯瞰海中群岛连成一线。乘长尾船穿入幽静海湾，是甲米跳岛游的高光时刻。',
    image: '/checkin-spots/koh-hong.jpg',
    lat: 8.0781,
    lng: 98.6773,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:40:00.000Z',
    address: 'Ko Hong, Than Bok Khorani NP, Mueang Krabi, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.0781,98.6773'
  },
  {
    id: 'seed-laelay-grill',
    name: 'Lae Lay Grill 悬崖海景餐厅',
    category: '餐厅',
    description: '建在山崖上的人气海鲜餐厅，整面视野俯瞰奥南湾与诺帕拉塔拉群岛。日落时分点一桌泰式海鲜配落日，最是浪漫。',
    image: '/checkin-spots/laelay-cliff.jpg',
    lat: 8.0388,
    lng: 98.8217,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:30:00.000Z',
    address: '89 Moo 3, Ao Nang, Mueang Krabi, Krabi 81180',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.0388,98.8217'
  },
  {
    id: 'seed-tiger-cave',
    name: '老虎洞寺 Tiger Cave Temple',
    category: '其他',
    description: '攀上 1237 级陡梯登顶，金色大佛端坐云端，360° 饱览甲米石林与平原。日出登顶最为震撼，记得备足饮水、穿好鞋。',
    image: '/checkin-spots/tiger-cave.jpg',
    lat: 8.1253,
    lng: 98.9245,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:20:00.000Z',
    address: 'Wat Tham Suea, Mueang Krabi, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.1253,98.9245'
  },
  {
    id: 'seed-emerald-pool',
    name: '翡翠池 Emerald Pool',
    category: '摄影位',
    description: '热带雨林深处的天然山泉池，池水清澈如祖母绿。沿林荫栈道再走可探访梦幻蓝池，是消暑戏水、拍照的雨林秘境。',
    image: '/checkin-spots/emerald-pool.jpg',
    lat: 7.9262,
    lng: 99.2668,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:10:00.000Z',
    address: 'Sa Morakot, Khlong Thom Nuea, Khlong Thom, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.9262,99.2668'
  },
  {
    id: 'seed-tewlay-bar',
    name: 'Tew Lay Bar 海景酒吧',
    category: '酒吧',
    description: '藏在莱利东岸礁石间的质朴小酒吧，沿海边小径步行可达。坐在崖边的木椅上看潮起潮落，一杯啤酒消磨整个黄昏。',
    image: '/checkin-spots/railay-sunset-bar.jpg',
    lat: 8.0130,
    lng: 98.8466,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T08:00:00.000Z',
    address: 'Railay East Beach, Ao Nang, Mueang Krabi, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.0130,98.8466'
  },
  {
    id: 'seed-lanta-oldtown',
    name: '兰塔古镇 Lanta Old Town',
    category: '其他',
    description: '百年华人渔村，海上长栈道串起斑驳的老柚木店屋与中式神庙。午后在老街喝杯咖啡、逛逛手作店，慢享小岛旧时光。',
    image: '/checkin-spots/lanta-oldtown.jpg',
    lat: 7.5310,
    lng: 99.0943,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T07:50:00.000Z',
    address: 'Lanta Old Town (Ban Si Raya), Ko Lanta Yai, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.5310,99.0943'
  },
  {
    id: 'seed-lanta-lighthouse',
    name: '兰塔角灯塔 Lanta Lighthouse',
    category: '摄影位',
    description: '兰塔岛最南端国家公园里的白色灯塔，矗立在绿色海岬上，可俯瞰安达曼海双子湾。沿途常有猴子出没，记得收好食物。',
    image: '/checkin-spots/lanta-lighthouse.jpg',
    lat: 7.4683,
    lng: 99.0981,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T07:40:00.000Z',
    address: 'Mu Ko Lanta National Park, Laem Tanod, Ko Lanta, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=7.4683,99.0981'
  },
  {
    id: 'seed-khaothong-hill',
    name: 'Khaothong Hill 山景咖啡馆',
    category: '咖啡馆',
    description: '农塔莱湿地旁的山丘咖啡馆，正对层叠的石灰岩峰林。满园 ins 打卡机位，看着喀斯特群山发呆喝咖啡，惬意一下午。',
    image: '/checkin-spots/khaothong-hill.jpg',
    lat: 8.1728,
    lng: 98.7527,
    user: 'Lenakids 领队',
    createdAt: '2026-06-20T07:30:00.000Z',
    address: 'Khao Thong, Mueang Krabi, Krabi',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=8.1728,98.7527'
  }
];
