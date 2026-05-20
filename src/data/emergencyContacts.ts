import { EmergencyContact } from '../types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'e1',
    name: '泰国国家旅游警察局 (Tourist Police)',
    role: '24小时提供中、英、泰多语种紧急求助、报案与紧急中文口译翻译服务',
    group: '旅游警察',
    phoneDisplay: '1155',
    phoneRaw: '1155'
  },
  {
    id: 'e2',
    name: '中国驻泰国大使馆 (Chinese Embassy in Thailand)',
    role: '24小时领事保护与协助应急通道，提供海外中国公民全中文领保求救服务',
    group: '中国大使馆',
    phoneDisplay: '+66 (0) 2-245-7010',
    phoneRaw: '+6622457010'
  }
];
