import { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', path: '/', icon: 'home' },
  { id: 'itinerary', label: '行程安排', path: '/itinerary', icon: 'calendar-days' },
  { id: 'travel-info', label: '机酒信息', path: '/travel-info', icon: 'plane-takeoff' },
  { id: 'attractions', label: '活动安排', path: '/attractions', icon: 'map' },
  { id: 'checkin-spots', label: '打卡点分享', path: '/checkin-spots', icon: 'compass' },
  { id: 'dining', label: '周边查询', path: '/dining', icon: 'search' },
  { id: 'weather', label: '天气和潮汐', path: '/weather', icon: 'waves' },
  { id: 'gallery', label: '共享相册', path: '/gallery', icon: 'camera' },
  { id: 'directory', label: '临时泰国号码通讯录', path: '/directory', icon: 'users' },
  { id: 'notes', label: '注意事项', path: '/more', icon: 'info' },
];
