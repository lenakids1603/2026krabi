import { Attraction, DayItinerary, NavItem, Restaurant, TeamMember } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: 'home' },
  { id: 'itinerary', label: '行程', path: '/itinerary', icon: 'calendar-days' },
  { id: 'gallery', label: '相册', path: '/gallery', icon: 'camera' },
  { id: 'directory', label: '通讯录', path: '/directory', icon: 'users' },
  { id: 'more', label: '更多', path: '/more', icon: 'more-horizontal' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: '陈昂',
    nameEn: 'Ming Chen',
    role: '执行领队',
    roleEn: 'EXECUTIVE LEAD',
    phone: '+66 (0) 81-876-5432',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpsS6XvX3VbhJJSVrWL-C4Ve-5_zxDHcTU_Nw0S7h3ifnKNIFe_rKvynf3P_CwHYkpQ8jjOrd1AhIAw1Cvb5QGdf6ojYG20MX8J1EhOEXV4G55xtxxaGPNHW5wHzDdDdbqzkVy5w522LzeD1QP8RlldYS4QHqFKxSIpNZW3o6KSjw69-VvOit5L5L75OW82_hdHaaB5t7bbXJ1EdozoVDqmfMj4Ohf2RAR24RWd_CFTA9YN81gq_bXOgXm9AWTuKsonTmBWSguqjY',
    type: 'lead'
  },
  {
    id: '2',
    name: '兹易瑒',
    nameEn: 'Xiaofang Wang',
    role: '行政协调',
    roleEn: 'ADMIN COORDINATOR',
    phone: '+66 (0) 82-555-0199',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN5TnZYUbhfNEfshOsT-6ivClw8t9hUBAayv1Cl15cOmf3Y3tQ0_BVC2T8tHr5JTN0BgBiynQQGX2CSIvcZlHpGLPimC0B0njKQeG803hG3PalYmmBQNNOut50BXtCqrxDAadm4RmTQVYZLU4L4L_8rM5nw2qB9t-nn_nkoMa4XlBJKzQ-rolAOyQNB06iWVsSzhhespU1PtEcSb3h0TQPoPTlmnQXD9F0p0ms4BYdssB7GfzBOLQBTbyx1oHblwuuEJLtWIjyMfU',
    type: 'admin'
  },
  {
    id: '3',
    name: '逐健嘤',
    nameEn: 'Jianguo Ma',
    role: '技术支持',
    roleEn: 'IT SUPPORT',
    phone: '+66 (0) 89-123-0000',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3z7aUtkkGVki23C_432N5yOTEfl11dL-7UZE1UEmTCNRY8927J3SpBgnqNhnPvlenEeOIs_2Ag4Ya0u0RP1PZrdGg6oswDjC4-YLwzwmBioURgwdCRMScWQshrX3FqM30-CqdhzfjyciZ1dFmxNvdV26b10uNIMZankGWcGx2rbIXerHykrap_AmoCBmFs9bu-qtxWmuEYBdW7nC74I7XNQwDx7LYYOa7OocSb-Ofr5VspaGck0ztqDZLPAC_LBDy_FO3HvCYFmg',
    type: 'member'
  }
];

export const ITINERARY: DayItinerary[] = [
  {
    day: 1,
    date: '06.28',
    title: '抵达甲米',
    activities: [
      {
        id: 'a1',
        time: '14:30 - 全天',
        title: '抵达甲米',
        location: '甲米国际机场 (KBV)',
        description: '专车接机前往度假村，办理入住并领取迎新礼包。',
        type: 'itinerary',
        icon: 'plane-takeoff'
      }
    ],
    tags: ['入驻', '交通'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOES9ZcKSfDVRt43cviTp-F8lFD5V7mQ-XWzpLZv12RDlNZRwEg_bvpqNpdiKf5bqmrIcXB_ufC7Kx7yKihmGSncsrD3ikckIMWhT7YSGMoLIwGG3I530eAVJpHDEB33tRcfkF7O_l3zPw1E5XbcH0fgFV5i5FrMdnILmtgxoDt-nLDM6KiHpivbFevwcSQT8f-DuoiR3yuXVDf9QWJod-Ngq0S2BcAZ6LgmBDeDFvwRyqfDMm87ZltfinDUGcQJwM8pzG_H8h06U'
  },
  {
    day: 2,
    date: '06.29',
    title: '开营仪式 & 迎新晚宴',
    activities: [
        {
            id: 'a2',
            time: '09:00 / 18:30',
            title: '开营仪式 & 迎新晚宴',
            location: '度假村宴会厅 & 海滩',
            description: '正式开启我们的2026团建之旅。',
            type: 'dining',
            icon: 'utensils'
        }
    ],
    tags: ['团建', '餐饮']
  },
  {
    day: 3,
    date: '06.30',
    title: '神奇四岛浮潜之旅',
    activities: [
        {
            id: 'a3',
            time: '08:00 - 16:00',
            title: '神奇四岛浮潜之旅',
            location: 'Chicken Island & Poda Island',
            description: '体验最纯净的海水和最迷人的沙滩。',
            type: 'attraction',
            icon: 'waves'
        }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBogDIo2NVk-umTvJYtV4BVmUfZhfyQ8UGJRnl_jXf9lSbJstwaceIOJGIg6frStwXaPo2H4RRmKcjqxm47U3D-nfaBEtTCiaHJuM6EjHMm7Mx6o6X1-PAur1BPGOYqtFy7ExdeWW8fI2sr9CMlC5Obs87wxu4OoOwF6aw5AM2wcd_9IdPOqCFv7DOcdFcfEVmXFQFwL2G7wVM_R0lhrsj-9gCu_JpilblL4ziajFk8NnolTvQqIqrdjPjdFmrdedwjplwwN0m54bI'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    title: 'Krabi Four Islands Tour',
    rating: 4.9,
    duration: '6小时',
    description: '乘坐长尾船穿梭于波达岛、鸡岛、管岛及莫岛之间，在神奇的“一线天”沙滩漫步。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj4ZfCQBr9izLYKlT5k2tFPKmhaLbcwrygbv2kg9M9aLJ6AGiQGKj0qRL5VTt8vkBqaWjOFSWD-CIftUdam73k_DI9XRJvDyIgXySqekR_qts2L3fHFNHhJtHJtGIyXCI6MJkttPic89x9aZMQywh7fh1tEbjSWSOc-sU-6Q1C5VCARI4eJ8yryj_SXgCwSBf6-2kSRndaJR49AgJJBI0jZ17U0V86yfjLSF7nxN7qlWIhZauCJuTBrDscxoSVmeCf80PRMeTyYXI',
    packingList: ['泳衣', '防晒霜', '防水袋'],
    type: 'water'
  },
  {
    id: '2',
    title: 'Koh Lanta Mangrove Kayaking',
    rating: 4.7,
    duration: '3小时',
    description: '深入兰塔岛红树林迷宫，近距离观察独特的海洋生态系统和野生猴群。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsHCltVY7GgPal9TxriMuDpHuAVqCZ8s6Ni7xYDWqIGWOAe0euFCxN834v1H2L2iTx5aotJjvd9vQEvKhEk5RAuN7aWega4_f1HjxV4RywVfyCkGurS2DRoZM9tScSSNHfL5Jt6GHuHqn5Mvt0eJ5bfWX5IFNx3CSKk8EuhAy8wAF447SMy_kdQzrtqgrYGEExHbfoarvEHjBRdx56ooEOZnuQiwNgmQYjKYcJB68l6aqMnisCUYxh9k6oJ-IkheQDySQMIJWmynQ',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkbfwMd_1TY0Z4IQzh6-rnA2BbYrcI-ZNUv2OuBCvPkNDWWj7pCl2vdqxn5aUiDIRYvenwi4F2uUgZh7mo493XLPZhxlTCT2DV6GfXmPK6CadM0qT_RLlYNY_PCH_bZVIA4Q24UYLKgF646eW0k2Mqy5Jh5vXQKQ9RZQe3sU16f9zF7JasYBrATCgQGtZKTD1qFtv4LUU5Hc1NYzDRdmNPHhMQH1h-OWVDrJd-7KqlQOU4L1-NdKqNXZRaayr6TeKWAOIrxIX9BLA',
        dist: '1.2km',
        type: 'seafood',
        tags: ['Team Favorite: 咖喱蟹', '#本地特色']
    }
];
