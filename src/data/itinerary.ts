import { DayItinerary } from '../types';
import { ITINERARY_DAY1_BG, ITINERARY_DAY3_BG } from '../assets/localImages';

import changiWaterfall from '../assets/images/changi_waterfall_one_1779244607786.png';
import krabiSunsetDinner from '../assets/images/krabi_sunset_dinner_1779252115396.png';

export const ITINERARY: DayItinerary[] = [
  {
    day: 1,
    date: '06.28',
    title: '准备启程',
    icon: 'plane-takeoff',
    activities: [
      {
        id: 'a1-1',
        time: '20:00',
        title: '全员萧山集结',
        location: '杭州萧山国际机场 T4 航站楼',
        description: '请于晚上 8 点（20:00）在萧山机场 T4 航站楼集合，统一在指定值机柜台前办理值机和出境手续。温馨提醒：提前备好少量泰铢，检查护照和随身物品。',
        type: 'itinerary'
      },
      {
        id: 'a1-2',
        time: '深夜航班',
        title: '夜航启程',
        location: '杭州 -> 泰国甲米',
        description: '搭乘国际航班前往泰国甲米，正式开启 2026 兰塔之旅。请尽量在飞机上休息好。',
        type: 'itinerary'
      }
    ],
    tags: ['萧山集结', '夜航启程'],
    image: changiWaterfall
  },
  {
    day: 2,
    date: '06.29',
    title: '抵达入住',
    icon: 'hotel',
    activities: [
      {
        id: 'a2-1',
        time: '上午（曼谷时间）',
        title: '入境甲米 & 提取行李',
        location: '甲米国际机场 (KBV)',
        description: '顺利抵达甲米机场后办理入境手续，统一提取团队行李并进行集结。',
        type: 'itinerary'
      },
      {
        id: 'a2-2',
        time: '中午-下午',
        title: '专车前往兰塔 Rawi Warin 酒店并入住',
        location: '甲米机场 -> 兰塔岛 Rawi Warin Resort & Spa',
        description: '乘坐舒适舒心的专车前往美丽的兰塔岛 Rawi Warin Resort & Spa（克隆托湾，Khlong Toab Beach）。下午办理入住（6/29 入住，住 3 晚），稍作休整放松。',
        type: 'hotel'
      },
      {
        id: 'a2-3',
        time: '傍晚 & 晚上',
        title: '海边散步与欣赏璀璨日落',
        location: '兰塔海滩',
        description: '在蔚蓝的海边沙滩悠闲散步、饱览日落红霞。晚上全员自由享用美味晚餐。',
        type: 'dining'
      }
    ],
    tags: ['专车前往', '兰塔入住', '海边落日'],
    image: krabiSunsetDinner
  },
  {
    day: 3,
    date: '06.30',
    title: '自由活动',
    icon: 'compass',
    activities: [
      {
        id: 'a3-1',
        time: '上午',
        title: '睡到自然醒 & 酒店椰风早餐',
        location: '度假村及周边',
        description: '睡到自然醒，好享享用悠闲美味的酒店海景度假早餐。',
        type: 'itinerary'
      },
      {
        id: 'a3-2',
        time: '下午',
        title: '探访兰塔老镇与红树林冒险',
        location: '兰塔老镇 (Lanta Old Town) & 红树林河湾',
        description: '随后可前往兰塔老镇感受安静复古的海边街景与风情；下午可安排生态红树林探秘、皮划艇或找一家舒适的临海咖啡馆悠然舒压。',
        type: 'attraction'
      },
      {
        id: 'a3-3',
        time: '晚上',
        title: '返回酒店泳池放松 & 自由晚餐',
        location: '酒店泳池 / 兰塔特色餐厅',
        description: '可以返回酒店泳池或海滩躺平，伴着椰风享用自由惬意的晚餐。',
        type: 'dining'
      }
    ],
    tags: ['兰塔老镇', '皮划艇探索', '漫游发呆']
  },
  {
    day: 4,
    date: '07.01',
    title: '自由活动',
    icon: 'waves',
    activities: [
      {
        id: 'a4-1',
        time: '上午',
        title: '探索兰塔南部幽静海滩',
        location: 'Kantiang Bay / Nui Bay / Bamboo Bay',
        description: '南部的海岸海滩更加清幽，适合探秘和兜风。',
        type: 'attraction'
      },
      {
        id: 'a4-2',
        time: '下午',
        title: '南部国家公园灯塔之行',
        location: '兰塔南部国家森林公园',
        description: '如果天气合适，全员可以前往经典的国家公园，探访壮观的地标性红白灯塔和海岸怪石滩，用镜头定格极致海景。',
        type: 'attraction'
      },
      {
        id: 'a4-3',
        time: '晚上',
        title: '海边星空晚餐 & 自由休整',
        location: '度假酒店',
        description: '踩着一地的晚霞回到酒店并休整休息。',
        type: 'dining'
      }
    ],
    tags: ['国家公园', '最南灯塔', '秘境探海'],
    image: ITINERARY_DAY3_BG
  },
  {
    day: 5,
    date: '07.02',
    title: '汇聚甲米',
    icon: 'navigation',
    activities: [
      {
        id: 'a5-1',
        time: '上午',
        title: 'Rawi Warin 退房，专车离岛重聚奥南',
        location: '兰塔岛 Rawi Warin -> 甲米奥南',
        description: '美味早餐过后整理行装，统一在 Rawi Warin 办理退房（7/2 退房），乘坐专车离开兰塔岛，当天赶往甲米奥南。',
        type: 'itinerary'
      },
      {
        id: 'a5-2',
        time: '下午',
        title: '入住奥南 Holiday Inn & 自由午休',
        location: '甲米奥南 Holiday Inn Resort Krabi Ao Nang',
        description: '抵达后在 Holiday Inn Resort Krabi Ao Nang 办理入住（7/2 入住，住 4 晚），安顿行李，舒服地简单睡个午觉并补充体力。',
        type: 'hotel'
      },
      {
        id: 'a5-3',
        time: '傍晚 & 晚上',
        title: '奥南海滩和繁华商业街自由探索',
        location: '奥南大滩 / 商业街 / 泰式街边夜市',
        description: '傍晚在热闹的奥南海湾周边轻松活动，自由寻访美食，也可以顺路采购当地海岛伴手礼及特产。',
        type: 'dining'
      }
    ],
    tags: ['转场甲米', '入住奥南', '繁华夜色']
  },
  {
    day: 6,
    date: '07.03',
    title: '莱利半日',
    icon: 'waves',
    activities: [
      {
        id: 'a6-1',
        time: '上午',
        title: '乘坐泰式古典长尾船前往莱利半岛',
        location: '奥南主码头 -> Railay Beach',
        description: '搭乘经典的泰国摇曳长尾船仅需 5-10 分钟航程即可抵达，近距离仰望喀斯特奇石峭壁。',
        type: 'attraction'
      },
      {
        id: 'a6-2',
        time: '下午',
        title: '游览莱利海滩与神秘帕南公主洞海滩',
        location: '莱利湾帕南洞穴海滩 (Prha Nang Cave)',
        description: '游览莱利极具名气的喀斯特断崖风景和纯净沙滩。下午根据自身天气和体能，随时选择留在沙滩冰饮放松或乘坐长尾船返回奥南午休。',
        type: 'attraction'
      },
      {
        id: 'a6-3',
        time: '晚上',
        title: '品尝海鲜美食 & 自由安排舒缓泰式按摩',
        location: '奥南海滩及沿街餐厅',
        description: '晚上大家自由组团享用当地海鲜烧烤大餐，推荐在晚餐结束后安排一次舒解筋骨的泰式全身 Spa 按摩。',
        type: 'dining'
      }
    ],
    tags: ['莱利半岛', '长尾船奇航', '帕南洞穴']
  },
  {
    day: 7,
    date: '07.04',
    title: '宏岛浮潜',
    icon: 'compass',
    activities: [
      {
        id: 'a7-1',
        time: '出海线（天气晴好时）',
        title: 'Hong Islands 宏岛一日出海浮潜',
        location: '大宏岛美丽海域及梦幻泻湖',
        description: '天气与风浪条件俱佳时，乘船开始经典 360 度超级宏岛出海探奇，感受清凉透底的翡翠海水浮潜和白色沙滩。',
        type: 'attraction'
      },
      {
        id: 'a7-2',
        time: '内陆线（若下雨风浪大备用）',
        title: '打卡热带翡翠池、温泉瀑布与喀斯特虎窟寺',
        location: '内陆国家级绿色翡翠池 / 温泉 / 虎窟寺',
        description: '如果下雨或海况风浪不宜出海，则平滑变更为舒适安全的避风内陆特色景观带：畅游宛若九寨的林中翡翠池，在温泉飞瀑中天然水疗，或去甲米镇感受人文。',
        type: 'attraction'
      }
    ],
    tags: ['宏岛浮潜', '天气好出海', '雨天改内陆']
  },
  {
    day: 8,
    date: '07.05',
    title: '自由活动',
    icon: 'waves',
    activities: [
      {
        id: 'a8-1',
        time: '全天自由',
        title: '奥南商区随心打卡、购物选特产、海风慢生活',
        location: '度假中心 / 咖啡馆 / 纪念品店',
        description: '今日彻底留白，全员不作团队打卡限定。大家可以根据兴趣进行咖啡发呆、特产采买，亦或只是在奥南海边静赏潮起潮落。',
        type: 'itinerary'
      },
      {
        id: 'a8-2',
        time: '晚上（团队晚餐）',
        title: 'Lenakids 团队盛大答谢与欢聚晚会',
        location: '奥南海湾高空海景浪漫餐吧',
        description: '在夕阳与椰风沙滩的相伴中，团队齐聚盛宴。欢声笑语，觥筹交错，共同纪念与感恩这段精彩的 2026 Retreat 海岛之行。',
        type: 'dining'
      }
    ],
    tags: ['全天随心', '奥南购物', '告别晚宴']
  },
  {
    day: 9,
    date: '07.06',
    title: '返回杭州',
    icon: 'plane-takeoff',
    activities: [
      {
        id: 'a9-1',
        time: '上午（送机时刻）',
        title: '整理行装 & 登上专用大巴返航',
        location: '奥南 Holiday Inn -> 甲米机场',
        description: '在 Holiday Inn 从容吃完早餐，办理退房（7/6 退房）并整理好行李，登上专用送机专车，乘车稳稳驶入甲米国际机场进行办票。',
        type: 'itinerary'
      },
      {
        id: 'a9-2',
        time: '航班时间',
        title: '怀着欢声笑语与满满快乐重归家园',
        location: '甲米机场 (KBV) -> 杭州萧山机港',
        description: '携带饱满的度假元气与相机相册中无数的绝美风景在值机后登机起航。圆满告别极赞的 2026 泰国兰塔团建休养！',
        type: 'itinerary'
      }
    ],
    tags: ['完美收官', '平安抵达', '期待重逢']
  }
];
