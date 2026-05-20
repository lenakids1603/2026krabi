import { EmergencyContact } from '../types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'e1',
    name: '领队陈昂 (Ming Chen)',
    role: '24小时突发事件应急直联 & 随队协调',
    group: '领队',
    phoneDisplay: '+66 (0) 81-876-5432',
    phoneRaw: '+66818765432'
  },
  {
    id: 'e2',
    name: '克拉比度假村 (Centara Grand Hotel)',
    role: '前台 24 小时应急专线 & 住客服务',
    group: '酒店',
    phoneDisplay: '+66 (0) 75-637-7890',
    phoneRaw: '+66756377890'
  },
  {
    id: 'e3',
    name: '甲米曼谷医院 (Bangkok Hospital Krabi)',
    role: '24小时急诊绿色通道 & 全天候救护服务',
    group: '医院',
    phoneDisplay: '+66 (0) 75-626-777',
    phoneRaw: '+6675626777'
  },
  {
    id: 'e4',
    name: '泰国国家旅游警察局 (Tourist Police)',
    role: '多语种游客报案求助、口译与安全热线',
    group: '旅游警察',
    phoneDisplay: '1155',
    phoneRaw: '+661155'
  }
];
