import { TeamMember } from '../types';

// Helper to generate beautifully customized deterministic avatars based on gender and English name seed
const getAvatarUrl = (nameEn: string, gender: string, id: string): string => {
  const seed = nameEn.toUpperCase().replace(/\s+/g, '');
  if (gender === '女') {
    // Elegant, highly stylized and colorful options for female avatars
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&facialHairProbability=0&top[]=longHair,shortHair,bob,curly,dreads&eyes[]=default,happy,wink,hearts&mouth[]=smile,twinkle&backgroundColor=ffe3e3,fff0f0,e8f5e9,e0f7fa`;
  } else {
    // Handsome and smart options for male avatars
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&facialHairProbability=10&top[]=shortHair,curly,dreads&eyes[]=default,happy,wink&mouth[]=smile&backgroundColor=e3f2fd,e0f7fa,f3e5f5,fafafa`;
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: '于静波',
    nameEn: 'YU JINGBO',
    role: '资深大主播',
    roleEn: 'SENIOR LIVE HOST',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5678',
    phoneRaw: '+66812345678',
    avatar: getAvatarUrl('YU JINGBO', '女', '1')
  },
  {
    id: '2',
    name: '王玉蓉',
    nameEn: 'WANG YURONG',
    role: '元气主播',
    roleEn: 'LIVE PRESENTER',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5679',
    phoneRaw: '+66812345679',
    avatar: getAvatarUrl('WANG YURONG', '女', '2')
  },
  {
    id: '3',
    name: '张少华',
    nameEn: 'ZHANG SHAOHUA',
    role: '后勤保障领队',
    roleEn: 'LOGISTICS LEAD',
    group: '其他',
    phoneDisplay: '+66-8-1234-5680',
    phoneRaw: '+66812345680',
    avatar: getAvatarUrl('ZHANG SHAOHUA', '男', '3')
  },
  {
    id: '4',
    name: '孙梦祥',
    nameEn: 'SUN MENGXIANG',
    role: '行政保障总监',
    roleEn: 'ADMIN SERVICES LEAD',
    group: '其他',
    phoneDisplay: '+66-8-1234-5681',
    phoneRaw: '+66812345681',
    avatar: getAvatarUrl('SUN MENGXIANG', '男', '4')
  },
  {
    id: '5',
    name: '包志望',
    nameEn: 'BAO ZHIWANG',
    role: '财务总监',
    roleEn: 'FINANCIAL DIRECTOR',
    group: '其他',
    phoneDisplay: '+66-8-1234-5682',
    phoneRaw: '+66812345682',
    avatar: getAvatarUrl('BAO ZHIWANG', '女', '5')
  },
  {
    id: '6',
    name: '朱隆隆',
    nameEn: 'ZHU LONG LONG',
    role: '主播控播',
    roleEn: 'STREAM CONTROLLER',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5683',
    phoneRaw: '+66812345683',
    avatar: getAvatarUrl('ZHU LONG LONG', '女', '6')
  },
  {
    id: '7',
    name: '董颖',
    nameEn: 'DONG YING',
    role: '核心带货主播',
    roleEn: 'CORE LIVE HOST',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5684',
    phoneRaw: '+66812345684',
    avatar: getAvatarUrl('DONG YING', '女', '7')
  },
  {
    id: '8',
    name: '王亚菲',
    nameEn: 'WANG YAFEI',
    role: '英语双语主播',
    roleEn: 'BILINGUAL HOST',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5685',
    phoneRaw: '+66812345685',
    avatar: getAvatarUrl('WANG YAFEI', '女', '8')
  },
  {
    id: '9',
    name: '饶盼盼',
    nameEn: 'RAO PANPAN',
    role: '活动统筹专家',
    roleEn: 'CAMP OVERSEER / PLANNER',
    group: '运营组',
    phoneDisplay: '+66-8-1234-5686',
    phoneRaw: '+66812345686',
    avatar: getAvatarUrl('RAO PANPAN', '女', '9')
  },
  {
    id: '10',
    name: '徐菲菲',
    nameEn: 'XU FEIFEI',
    role: '金牌主播',
    roleEn: 'GOLDEN LIVE HOST',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5687',
    phoneRaw: '+66812345687',
    avatar: getAvatarUrl('XU FEIFEI', '女', '10')
  },
  {
    id: '11',
    name: '朱安若',
    nameEn: 'ZHU ANRUO',
    role: '新星主播',
    roleEn: 'NEW STAR PERFORMER',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5688',
    phoneRaw: '+66812345688',
    avatar: getAvatarUrl('ZHU ANRUO', '女', '11')
  },
  {
    id: '12',
    name: '张雨婷',
    nameEn: 'ZHANG YUTING',
    role: '高级客情顾问',
    roleEn: 'PREMIUM CLIENT ADVISOR',
    group: '客服组',
    phoneDisplay: '+66-8-1234-5689',
    phoneRaw: '+66812345689',
    avatar: getAvatarUrl('ZHANG YUTING', '女', '12')
  },
  {
    id: '13',
    name: '张婷',
    nameEn: 'ZHANG TING',
    role: '娱乐主播',
    roleEn: 'ENTERTAINMENT CREATOR',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5690',
    phoneRaw: '+66812345690',
    avatar: getAvatarUrl('ZHANG TING', '女', '13')
  },
  {
    id: '14',
    name: '陈清俊',
    nameEn: 'CHEN QINGJUN',
    role: '行程安全协调官',
    roleEn: 'TRAVEL SECURITY OFFICER',
    group: '其他',
    phoneDisplay: '+66-8-1234-5691',
    phoneRaw: '+66812345691',
    avatar: getAvatarUrl('CHEN QINGJUN', '男', '14')
  },
  {
    id: '15',
    name: '庞美玲',
    nameEn: 'PANG MEILING',
    role: '视觉文案策划',
    roleEn: 'CONTENT CREATIVE PRODUCER',
    group: '其他',
    phoneDisplay: '+66-8-1234-5692',
    phoneRaw: '+66812345692',
    avatar: getAvatarUrl('PANG MEILING', '女', '15')
  },
  {
    id: '16',
    name: '郭晓莹',
    nameEn: 'GUO XIAOYING',
    role: '海外运营合伙人',
    roleEn: 'GLOBAL TEAM COMPILER',
    group: '运营组',
    phoneDisplay: '+66-8-1234-5693',
    phoneRaw: '+66812345693',
    avatar: getAvatarUrl('GUO XIAOYING', '女', '16')
  },
  {
    id: '17',
    name: '胡小雨',
    nameEn: 'HU XIAOYU',
    role: '24小时用户专员',
    roleEn: '24H USER SUPPORT',
    group: '客服组',
    phoneDisplay: '+66-8-1234-5694',
    phoneRaw: '+66812345694',
    avatar: getAvatarUrl('HU XIAOYU', '女', '17')
  },
  {
    id: '18',
    name: '詹海璇',
    nameEn: 'ZHAN HAIXUAN',
    role: '媒介公关总监',
    roleEn: 'MEDIA & PR SPECIALIST',
    group: '运营组',
    phoneDisplay: '+66-8-1234-5695',
    phoneRaw: '+66812345695',
    avatar: getAvatarUrl('ZHAN HAIXUAN', '女', '18')
  },
  {
    id: '19',
    name: '廖梦洁',
    nameEn: 'LIAO MENGJIE',
    role: '直播场景设计师',
    roleEn: 'STUDIO SCENARIO STYLIST',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5696',
    phoneRaw: '+66812345696',
    avatar: getAvatarUrl('LIAO MENGJIE', '女', '19')
  },
  {
    id: '20',
    name: '吴宪华',
    nameEn: 'WU XIANHUA',
    role: '现场运营导演',
    roleEn: 'ON-SITE EVENT EXECUTIVE',
    group: '运营组',
    phoneDisplay: '+66-8-1234-5697',
    phoneRaw: '+66812345697',
    avatar: getAvatarUrl('WU XIANHUA', '男', '20')
  },
  {
    id: '21',
    name: '杨言志',
    nameEn: 'YANG YANZHI',
    role: '法务合规保障',
    roleEn: 'LEGAL & RISK CONTROL',
    group: '其他',
    phoneDisplay: '+66-8-1234-5698',
    phoneRaw: '+66812345698',
    avatar: getAvatarUrl('YANG YANZHI', '女', '21')
  },
  {
    id: '22',
    name: '林琪',
    nameEn: 'LIN QI',
    role: '视觉设计主管',
    roleEn: 'CREATIVE DESIGN HEAD',
    group: '其他',
    phoneDisplay: '+66-8-1234-5699',
    phoneRaw: '+66812345699',
    avatar: getAvatarUrl('LIN QI', '女', '22')
  },
  {
    id: '23',
    name: '王志娟',
    nameEn: 'WANG ZHIJUAN',
    role: '大客户服务总监',
    roleEn: 'VIP RELATIONSHIP MANAGER',
    group: '客服组',
    phoneDisplay: '+66-8-1234-5700',
    phoneRaw: '+66812345700',
    avatar: getAvatarUrl('WANG ZHIJUAN', '女', '23')
  },
  {
    id: '24',
    name: '王诺',
    nameEn: 'WANG NUO',
    role: '新媒体全案策划',
    roleEn: 'NEW MEDIA CAMPAIGN LEAD',
    group: '运营组',
    phoneDisplay: '+66-8-1234-5701',
    phoneRaw: '+66812345701',
    avatar: getAvatarUrl('WANG NUO', '女', '24')
  },
  {
    id: '25',
    name: '徐舒言',
    nameEn: 'XU SHUYAN',
    role: '互动插画师',
    roleEn: 'INTERACTIVE ILLUSTRATOR',
    group: '其他',
    phoneDisplay: '+66-8-1234-5702',
    phoneRaw: '+66812345702',
    avatar: getAvatarUrl('XU SHUYAN', '女', '25')
  },
  {
    id: '26',
    name: '陈妍',
    nameEn: 'CHEN YAN',
    role: '直播技术总监',
    roleEn: 'LIVE BROADCAST DIRECTOR',
    group: '直播组',
    phoneDisplay: '+66-8-1234-5703',
    phoneRaw: '+66812345703',
    avatar: getAvatarUrl('CHEN YAN', '女', '26')
  }
];
