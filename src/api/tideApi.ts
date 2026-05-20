export interface TidePoint {
  type: string;
  time: string;
  val: string;
  active?: boolean;
}

export interface TideData {
  location: string;
  current: string;
  currentLeft: string;
  path: string;
  cx: string;
  cy: string;
  points: TidePoint[];
  tip: string;
}

export interface MarineInfo {
  waveHeight: string;
  waterTemp: string;
  windSpeed: string;
}

export async function getTides(city: 'krabi' | 'lanta'): Promise<TideData> {
  const krabiTide: TideData = {
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

  const lantaTide: TideData = {
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

  return city === 'krabi' ? krabiTide : lantaTide;
}

export async function getMarine(city: 'krabi' | 'lanta'): Promise<MarineInfo> {
  return {
    waveHeight: city === 'krabi' ? "0.5m - 1.2m" : "0.3m - 0.8m",
    waterTemp: "29°C",
    windSpeed: city === 'krabi' ? "12 km/h" : "18 km/h"
  };
}
