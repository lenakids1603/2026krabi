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
    description: '乘坐长尾船/快艇穿梭于波达岛、鸡岛、管岛及莫岛之间，在神奇的“一线天”沙滩漫步，体验浮潜与翡翠玻璃海。',
    image: krabiIslands,
    packingList: ['泳衣', '防晒霜', '防水袋', '换洗衣物'],
    type: 'water',
    category: 'unified',
    region: '甲米',
    schedule: '08:30 - 15:00 (根据海上风浪微调)',
    meetingPoint: '奥南海滩码头 / 酒店大堂统一集合乘大巴',
    effort: '中等 (需要乘船和短途沙滩涉水)',
    cost: '公司全额预算公摊，员工全程免费参加',
    warnings: [
      '由于需要涉水登船，建议全程穿着沙滩鞋或防水凉鞋',
      '海上风浪不确定，容易晕船的伙伴请务必提前半小时服用晕船药',
      '国家公园区域严禁捡拾任何贝壳、珊瑚，泰国对此类环保违规罚款极高',
      '下海浮潜必须按规定穿戴救生衣，听从领队及船工的安全指引'
    ],
    mapsUrl: 'https://maps.google.com/?q=Ao+Nang+Beach+Krabi'
  },
  {
    id: '2',
    title: '海滩落日迎宾晚宴 (Beach Welcome Dinner)',
    rating: 4.8,
    duration: '3小时',
    description: '在奥南海滩落日海椰林下欢聚一堂，享用正宗地道泰式海鲜烧烤与咖喱料理，感受椰林海风与最震撼的橘粉色晚霞。',
    image: thaiBeachDinner,
    packingList: ['相机/手机', '防蚊液', '休闲海岛风便装'],
    type: 'culture',
    category: 'unified',
    region: '甲米',
    schedule: '18:00 - 21:00 (日落预计18:20开始)',
    meetingPoint: '海滨落日景观露天大排档 / 宴会厅门口',
    effort: '轻松 (无任何体力要求)',
    cost: '公司团建统一预算，提供软饮、畅饮海产、泰料自主',
    warnings: [
      '海边黄昏蚊虫较多，请出发前在酒店裸露皮肤处喷足防护水',
      '海滩便步着装即可，建议女士裙装注意风大防沙',
      '请大家准时到场，不错过最美的“魔幻时刻”日落拍照时机'
    ],
    mapsUrl: 'https://maps.google.com/?q=Ao+Nang+Sunset+Beach'
  },
  {
    id: '3',
    title: '宏岛快艇跳岛拼船 (Hong Island Speedboat)',
    rating: 4.9,
    duration: '5小时',
    description: '前往宏岛（割喉岛）群礁，穿过静谧的天然巨石环抱潟湖入口，在翡翠般的内海中游泳，并挑战全新的360度悬崖大视角观景台。',
    image: krabiHero,
    packingList: ['沙滩拖鞋', '太阳镜', '防晒服', '摄影相机'],
    type: 'water',
    category: 'unified',
    region: '甲米',
    schedule: '08:00 - 14:00',
    meetingPoint: '奥南专用渡口/码头 (大巴接送)',
    effort: '中等 (悬崖栈道登顶需要一定体力)',
    cost: '公司团建统一订购，包含宏岛国家公园门票与上岛费',
    warnings: [
      '宏岛365阶钢架观景台较陡，恐高或腿脚不便的伙伴不强求，可留在沙滩游泳晒太阳',
      '潟湖口在退潮时可能水较浅，船只通过时请听从船长指挥不要乱站立',
      '零食零钱可以自备一点，岛上有非常简单的冷饮售卖站'
    ],
    mapsUrl: 'https://maps.google.com/?q=Hong+Island+Krabi'
  },
  {
    id: '4',
    title: '兰塔岛红树林皮划艇 (Mangrove Kayaking)',
    rating: 4.7,
    duration: '3小时',
    description: '由专业泰籍向导带领，深入兰塔岛东海岸静谧的红树林入海口生态迷宫，探寻独特的天然大根、海洋弹涂鱼、小螃蟹和调皮的野生猴群。',
    image: krabiResort,
    packingList: ['驱蚊水', '遮阳帽', '防水双肩包', '长袖速干衣'],
    type: 'nature',
    category: 'suggested',
    region: '兰塔',
    schedule: '自由活动时间内按意向报名 (推荐上午或傍晚)',
    meetingPoint: '兰塔岛 Tung Yee Peng 东方生态码头',
    effort: '偏中等 (需要自主划桨 1.5 小时左右)',
    cost: '拼船预估：500 - 800 泰铢 / 人 (需自行提前或现场预定支付)',
    warnings: [
      '划桨时裤子和鞋子定会弄湿，切记多带一件换洗衣服，带条小毛巾',
      '森林中的野猴群偶尔会扒船寻找食物，请保管好未塞入防水袋的安全设备（尤其是首饰、眼镜和手机）',
      '绝对禁止携带塑料塑料袋和任何不环保的投喂食物上划艇'
    ],
    mapsUrl: 'https://maps.google.com/?q=Tung+Yee+Peng+Pier+Lanta'
  },
  {
    id: '5',
    title: '奥南海滩 sunset 漫步 (Sunset Promenade)',
    rating: 4.7,
    duration: '2小时',
    description: '夜幕降临前，自由漫步于甲米最热闹、最宽阔的奥南海滩大道。享受标志性的金色悬崖海景落日，逛逛泰式风情集市与香脆香蕉煎饼。',
    image: krabiSunsetDinner,
    packingList: ['舒适平底凉鞋', '少量本地泰铢现金', '随手拍手机'],
    type: 'nature',
    category: 'suggested',
    region: '甲米',
    schedule: '每日自由活动日落时分均可出行',
    meetingPoint: '自由漫步，无硬性统一点',
    effort: '轻松 (平道散步，随处可坐可停)',
    cost: '免费游览 (街头小吃、网红煎饼及路边马杀鸡按摩自费)',
    warnings: [
      '奥南海滩公路车速较快，在没有红绿灯的泰国马路上步行和横穿请务必看清来车',
      '日落之后沙滩退潮，可以在露出的礁石边缘拍照但要防着滑倒'
    ],
    mapsUrl: 'https://maps.google.com/?q=Ao+Nang+Beach+Road'
  },
  {
    id: '6',
    title: '翡翠池与温泉瀑布 (Emerald Pool & Hot Springs)',
    rating: 4.6,
    duration: '4小时',
    description: '隐匿于热带雨林自然保护区中的纯天然矿物质淡水湖，池水呈现翡翠碧绿宝石的光泽，还可以前往天然林地温泉瀑布温润浸润。',
    image: forestSprings,
    packingList: ['泳衣', '备用汗巾衣物', '防滑运动胶鞋'],
    type: 'nature',
    category: 'suggested',
    region: '甲米',
    schedule: '自由活动充裕时间段可拼包车往返 (单程1.2小时)',
    meetingPoint: '景区大门口 (自行拼大出租车成行)',
    effort: '中等 (需要林间步行往返约2公里)',
    cost: '翡翠池门票200泰铢/人，温泉瀑布100泰铢/人，往返包车摊费 (自负)',
    warnings: [
      '国家保护林区非常注重洁净，禁止携带任何含化学的肥皂或沐浴露入池冲洗',
      '池底多青苔，在池中央走动时极易滑倒，严禁在边缘高处往池中跳水',
      '温泉水含有多种矿物微量元素。浸泡不宜多于半小时，高血压或过敏者请自控'
    ],
    mapsUrl: 'https://maps.google.com/?q=Emerald+Pool+Krabi'
  }
];
