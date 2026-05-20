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
import krabiSunsetDinner from '@/src/assets/images/krabi_sunset_dinner_1779252115396.png';
import changiWaterfall from '@/src/assets/images/changi_waterfall_one_1779244607786.png';

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
    title: '全员集结，准备启程',
    icon: 'plane-takeoff',
    activities: [
      {
        id: 'a1-1',
        time: '21:00',
        title: '萧山国际机场 (HGH) T4 集合',
        location: '杭州萧山国际机场 T4 航站楼',
        description: '团队成员统一在指定值机柜台前集合值机。温馨提醒：提前换好少量泰铢，准备好充电宝、薄外套，国际航班建议提前抵达机场。',
        type: 'itinerary'
      },
      {
        id: 'a1-2',
        time: '23:00',
        title: '登机启程',
        location: '杭州 -> 泰国',
        description: '红眼航班启程，开启充满期待的 retreat 旅行。请尽量在飞机上休息好，恢复体力。',
        type: 'itinerary'
      }
    ],
    tags: ['机场集结', '红眼航班'],
    image: changiWaterfall
  },
  {
    day: 2,
    date: '06.29',
    title: '抵达甲米，入住兰塔',
    icon: 'hotel',
    activities: [
      {
        id: 'a2-1',
        time: '11:50',
        title: '抵达甲米，入境与取行李',
        location: '甲米机场 (KBV)',
        description: '飞机落地，统一办理入境手续并提取行李。落地后不安排甲米市区游玩，直接前往兰塔。',
        type: 'itinerary'
      },
      {
        id: 'a2-2',
        time: '13:00 - 16:00',
        title: '专车前往兰塔酒店，办理入住',
        location: '甲米机场 -> 兰塔度假酒店',
        description: '专车接送，包含车渡时间。由于路况可能会有些多变，实际时间会稍有浮动。抵达酒店后办理入住。',
        type: 'hotel'
      },
      {
        id: 'a2-3',
        time: '傍晚',
        title: '酒店休息、海边散步与看日落',
        location: '兰塔岛海滩 (Long Beach / Klong Dao / Kantiang Bay)',
        description: '漫步漫长静谧的沙滩，饱览艳丽的海上日落，随后在海滨享用美味舒心的泰式海鲜晚餐，吹着晚风，洗去旅途的漫漫风尘。',
        type: 'dining'
      }
    ],
    tags: ['转场兰塔', '海滩落日', '椰风晚宴'],
    image: krabiSunsetDinner
  },
  {
    day: 3,
    date: '06.30',
    title: '漫步北部，开启度假状态',
    icon: 'waves',
    activities: [
      {
        id: 'a3-1',
        time: '上午',
        title: '睡到自然醒，酒店早餐与海边放松',
        location: '度假酒店及周边沙滩',
        description: '享受好吃的度假村早餐。在海风中慢游晨练，彻底进入放松的度假状态。',
        type: 'itinerary'
      },
      {
        id: 'a3-2',
        time: '下午',
        title: '慢游北部沙滩、喝咖啡与下午茶',
        location: 'Long Beach & Klong Dao 海滩',
        description: '下午漫步海滩、喝杯椰林咖啡，或在度假村泳池惬意游泳。温馨提示：雨季海浪稍微偏大，有风浪提示请注意避让。',
        type: 'itinerary'
      },
      {
        id: 'a3-3',
        time: '晚上',
        title: 'Saladan 镇晚餐与便利补给',
        location: 'Saladan 镇街区',
        description: '去北部最热闹的 Saladan 镇享用晚宴并购买一些日用补给，同时预订或确认好后几天的岛内游、包车等细节安排。',
        type: 'dining'
      }
    ],
    tags: ['自然睡醒', '海浪咖啡', 'Saladan巡游']
  },
  {
    day: 4,
    date: '07.01',
    title: '探寻东岸老镇与红树林',
    icon: 'compass',
    activities: [
      {
        id: 'a4-1',
        time: '上午',
        title: 'Lanta Old Town 老镇闲逛与发呆',
        location: '兰塔老镇 (Lanta Old Town)',
        description: '这里是一座纯正的木屋临海老镇，有很多文艺清新的临海咖啡馆 and 海鲜餐厅，非常适合拍照发朋友圈。',
        type: 'attraction'
      },
      {
        id: 'a4-2',
        time: '下午',
        title: '红树林皮划艇冒险 (晴) / 泰餐课 SPA (雨)',
        location: '红树林河湾 / 本地 SPA 烹饪馆',
        description: '若天气晴好：在东部红树林自划皮划艇深入生态迷宫；若遇下雨：我们则改成在室内上一次当地趣味厨艺课，或是去舒适的SPA护理。活动当天依据天气随时调整。不推荐安排远海跳岛。',
        type: 'attraction'
      },
      {
        id: 'a4-3',
        time: '晚上',
        title: '回酒店看日落、享用晚餐',
        location: '度假酒店 / 附近海鲜餐厅',
        description: '踩着一地晚霞返回，晚餐一如既往的放松，没有复杂的商业节奏。',
        type: 'dining'
      }
    ],
    tags: ['古镇风情', '皮划艇探索', '慢活主张'],
    image: ITINERARY_DAY3_BG
  },
  {
    day: 5,
    date: '07.02',
    title: '探秘南部灯塔与绝美南部湾',
    icon: 'bike',
    activities: [
      {
        id: 'a5-1',
        time: '上午',
        title: '包车或自驾游览南部秘境沙滩半日巡礼',
        location: 'Kantiang Bay / Nui Bay / Bamboo Bay',
        description: '南部由于群山环绕更显寂静清幽，水质极佳。可以包车或租小排量车带队前往。温馨提示：雨季山路弯多坡急，开摩托或骑行请一定加倍小心！',
        type: 'attraction'
      },
      {
        id: 'a5-2',
        time: '下午',
        title: 'Mu Ko Lanta 森林公园灯塔 (顺畅时) 或 度假村躺平',
        location: '兰塔国家公园灯塔区 / 酒店泳池',
        description: '前往兰塔最下方的国家公园探秘经典的标志型灯塔，看波涛汹涌的海浊石滩。如果雨势太大，改成在酒店泳池静享慵懒一刻。',
        type: 'attraction'
      },
      {
        id: 'a5-3',
        time: '晚上',
        title: '最后一晚兰塔海滩晚餐',
        location: '兰塔特色椰风海滩餐馆',
        description: '在兰塔的最后一夜，听着温柔的海涛共进最后的晚宴。不建议太晚睡，养足精神准备明天上午的迁徙。',
        type: 'dining'
      }
    ],
    tags: ['国家公园', '碧海南部', '椰风沙滩']
  },
  {
    day: 6,
    date: '07.03',
    title: '专车返程，入住奥南',
    icon: 'navigation',
    activities: [
      {
        id: 'a6-1',
        time: '上午',
        title: '早餐后退房并启程返回甲米奥南',
        location: '兰塔岛 -> 甲米奥南区酒店',
        description: '在度假村悠闲美味的早餐后统一结账。专车跨海送我们重聚奥南主湾。提前一天务必和接送师傅进行确认并约定时间。',
        type: 'itinerary'
      },
      {
        id: 'a6-2',
        time: '下午',
        title: '入住新酒店，迎风漫游奥南海滩',
        location: '奥南海滩 (Ao Nang Beach) / 诺帕拉特塔拉海滩',
        description: '在新酒店安顿行李，简单午休后可在甲米最热闹最好玩的两大沙滩上散步、发呆，首日来到甲米行程尽量不安排累人项目。',
        type: 'hotel'
      },
      {
        id: 'a6-3',
        time: '晚上',
        title: '打卡奥南街区热闹大夜市 & 漫步品尝风味晚餐',
        location: '奥南大夜市 / 临街海景餐位',
        description: '奥南相比兰塔烟火气息十分浓厚。可以去奥南夜市感受当地人的风味小吃，也可以趁夜间咨询当地出海公司查看第2日的风浪以及决定第二天的项目。',
        type: 'dining'
      }
    ],
    tags: ['重归甲米', '繁华奥南', '海景晚灯']
  },
  {
    day: 7,
    date: '07.04',
    title: '莱利一日，探密攀岩胜地',
    icon: 'waves',
    activities: [
      {
        id: 'a7-1',
        time: '上午',
        title: '莱利海滩 & 神秘公主洞穴半日游',
        location: '莱利海滩 (Railay Beach) & Prha Nang Cave Beach',
        description: '如果天气良好：从奥南主码头购买船票乘坐长尾船。仅需 5-10 分钟穿梭，即可到达著名的奇石林立跟攀岩天堂。机动性极好。',
        type: 'attraction'
      },
      {
        id: 'a7-2',
        time: '下午',
        title: '在 Railay 享用冷饮或乘坐长尾船返回度假村午休',
        location: '莱利群山咖啡馆 / 奥南温床',
        description: '继续在遮天翠叶的莱利穿行冒险，也可趁下午暑气返校前直接坐长尾船返回奥南。若遇到强风甚至下雨等不可控海况，我们将改成前往翡翠池与天然温泉。',
        type: 'attraction'
      },
      {
        id: 'a7-3',
        time: '晚上',
        title: '品尝泰式经典海鲜晚餐与老练泰式全身按摩',
        location: '奥南海滩海滨餐厅 / SPA 养生会所',
        description: '大快朵颐大螃蟹和龙虾，最后在娴熟的精油按摩下送走充实而惊奇的一天。',
        type: 'dining'
      }
    ],
    tags: ['莱利攀岩', '公主湾风骨', '休闲翡翠池']
  },
  {
    day: 8,
    date: '07.05',
    title: '跳岛宏岛巡航 / 绝佳内陆雨季替代',
    icon: 'compass',
    activities: [
      {
        id: 'a8-1',
        time: '全天 (晴好)',
        title: '天气极好：宏岛 (Hong Islands) / 甲米四岛经典一日游',
        location: '甲米海域美丽海中小群岛',
        description: '在无暇的碧波沙滩中进行全团出海大浮潜，去探秘神奇的长滩与泻湖。出游时风浪会影响最终船司安排，请前一天定好保留可退改计划。',
        type: 'attraction'
      },
      {
        id: 'a8-2',
        time: '全天 (阴雨备选)',
        title: '天气欠佳：打卡极赞喀斯特翡翠池、瀑布温泉和虎窟寺攀登',
        location: '翡翠池森林、温泉瀑布、虎窟寺与甲米镇大集市',
        description: '若海上面临强阵雨风浪无法出航，请在内陆线里穿梭。去在森林溪水温泉里游泳，甚至登顶虎窟寺俯瞰雨林，晚上大饱口福于甲米镇周末超级夜市。',
        type: 'attraction'
      }
    ],
    tags: ['宏岛漫游', '出海浮潜', '全能温雨备']
  },
  {
    day: 9,
    date: '07.06',
    title: '终章休整，最后的浪漫留白',
    icon: 'waves',
    activities: [
      {
        id: 'a9-1',
        time: '上午',
        title: '睡到自然醒，享用闲逸早餐和在池畔小坐',
        location: '度假村及附近浅滩',
        description: '由于明日返航，最后一日上午避免远航。尽情放松。在椰林树影和碧水晴空中呼吸纯净的海风。',
        type: 'itinerary'
      },
      {
        id: 'a9-2',
        time: '下午',
        title: '海岛特产手礼选购与极致全身精油香薰 SPA',
        location: '奥南工艺集市 / 按摩会馆',
        description: '选购海岛干货特产。做个深层减压 SPA 理疗。给回程和即将到来的工作留下极佳的缓冲！',
        type: 'attraction'
      },
      {
        id: 'a9-3',
        time: '晚上',
        title: 'Lenakids 盛大的答谢与告别晚会',
        location: '奥南星光海景高差餐吧',
        description: '总结 retreat 全过程，欢声笑语，觥筹交错。再次检查并由领队统一订好确定明天早九点前往机场的送机专车。',
        type: 'dining'
      }
    ],
    tags: ['告别狂喜', '特产采买', '顶级SPA']
  },
  {
    day: 10,
    date: '07.07',
    title: '带上满满快乐与行李，踏上归国旅途',
    icon: 'plane-takeoff',
    activities: [
      {
        id: 'a10-1',
        time: '09:00左右',
        title: '全员大堂集合并携箱登上送机专车前往机场',
        location: '奥南酒店 -> 甲米机场 KBV',
        description: '返航国际班机为 11:25，提前预约好的大巴于酒店大堂统一接机出发。预留充足时间办票退税。',
        type: 'itinerary'
      },
      {
        id: 'a10-2',
        time: '11:25',
        title: '国际航班飞返，顺利回到港湾',
        location: '甲米国际机场 (KBV)',
        description: '怀着丰沛的回忆和相机中绝美的照片高飞启航，圆满结束极赞的 2026 Lenakids Retreat！',
        type: 'itinerary'
      }
    ],
    tags: ['完美收官', '带笑而归', '期待重逢']
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
