import { TeamMember } from '../types';
import { 
  AVATAR_MING, 
  AVATAR_XIAOFANG, 
  AVATAR_JIANGUO 
} from '../assets/localImages';

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
