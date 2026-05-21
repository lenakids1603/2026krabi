import { TideInfo } from '../types/api';

export const MOCK_TIDE_KRABI: TideInfo = {
  location: "Krabi Pier",
  current: "2.1m",
  currentLeft: "25%",
  path: "M0,80 Q50,20 100,60 T200,80 T300,30 T400,60",
  cx: "100",
  cy: "60",
  points: [
    { type: "低潮", time: "04:12", val: "1.2m" },
    { type: "高潮", time: "10:45", val: "3.4m", active: true },
    { type: "低潮", time: "17:20", val: "0.8m" },
    { type: "高潮", time: "23:55", val: "2.9m" }
  ],
  tip: "“10:00 - 15:00 期间海水平静且水位理想，是最佳的浮潜和跳岛时间。”"
};

export const MOCK_TIDE_LANTA: TideInfo = {
  location: "Saladan Pier, Lanta",
  current: "1.8m",
  currentLeft: "37.5%",
  path: "M0,60 Q50,90 150,60 T250,30 T350,50 T400,40",
  cx: "150",
  cy: "60",
  points: [
    { type: "低潮", time: "05:30", val: "0.9m" },
    { type: "高潮", time: "11:55", val: "3.2m", active: true },
    { type: "低潮", time: "18:15", val: "0.6m" },
    { type: "高潮", time: "00:40", val: "2.7m" }
  ],
  tip: "“11:00 - 16:00 期间，兰塔四周（如Rok岛、红石紫石）水域平静，适合深浅斑斓海底世界。”"
};
