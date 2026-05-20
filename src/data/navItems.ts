import { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', path: '/', icon: 'home' },
  { id: 'itinerary', label: '行程安排', path: '/itinerary', icon: 'calendar-days' },
  { id: 'travel-info', label: '机酒信息', path: '/travel-info', icon: 'plane-takeoff' },
  { id: 'attractions', label: '活动安排', path: '/attractions', icon: 'map' },
  { id: 'dining', label: '周边查询', path: '/dining', icon: 'compass' },
  { id: 'weather', label: '天气和潮汐', path: '/weather', icon: 'waves' },
  { id: 'gallery', label: '共享相册', path: '/gallery', icon: 'camera' },
  { id: 'directory', label: '临时泰国通讯录', path: '/directory', icon: 'users' },
  { id: 'notes', label: '注意事项', path: '/more', icon: 'info' },
];
