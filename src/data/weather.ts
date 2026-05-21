import { WeatherForecastResponse } from '../types/api';

export const MOCK_WEATHER_KRABI: WeatherForecastResponse = {
  city: 'krabi',
  temp: "31°",
  condition: "晴朗",
  range: "最高 33° / 最低 27°",
  status: "适宜游玩 (绿旗)",
  stats: [
    { icon: "Sun", label: "紫外线指数", value: "9 (极高)", sub: "需涂抹防晒", progress: 90 },
    { icon: "Droplets", label: "湿度", value: "72%", sub: "体感较潮湿" },
    { icon: "Wind", label: "风速", value: "12 km/h", sub: "东南偏南风" },
    { icon: "Eye", label: "能见度", value: "15 km", sub: "晴空万里" }
  ],
  forecast: [
    { day: "明天", icon: "Sun", min: 26, max: 32 },
    { day: "周三", icon: "CloudRain", min: 25, max: 29 },
    { day: "周四", icon: "Sun", min: 27, max: 33 },
    { day: "周五", icon: "Cloud", min: 26, max: 31 },
    { day: "周六", icon: "CloudLightning", min: 24, max: 28 }
  ],
  safety: [
    { icon: "CheckCircle2", text: "目前海域悬挂“绿旗”，适宜所有水上活动。" },
    { icon: "AlertTriangle", text: "紫外线极强，户外请每 2 小时补涂防晒霜。" },
    { icon: "Droplet", text: "体感温度较高，请注意补充水分，预防中暑。" }
  ]
};

export const MOCK_WEATHER_LANTA: WeatherForecastResponse = {
  city: 'lanta',
  temp: "30°",
  condition: "晴间多云 / 椰风徐徐",
  range: "最高 32° / 最低 26°",
  status: "极佳浮潜 (蓝旗)",
  stats: [
    { icon: "Sun", label: "紫外线指数", value: "10 (极高)", sub: "防晒至关重要", progress: 100 },
    { icon: "Droplets", label: "湿度", value: "75%", sub: "凉爽海风拂面" },
    { icon: "Wind", label: "风速", value: "18 km/h", sub: "西-西南偏西风" },
    { icon: "Eye", label: "能见度", value: "18 km", sub: "极佳海水清透度" }
  ],
  forecast: [
    { day: "明天", icon: "Sun", min: 25, max: 31 },
    { day: "周三", icon: "Cloud", min: 26, max: 30 },
    { day: "周四", icon: "Sun", min: 26, max: 32 },
    { day: "周五", icon: "Sun", min: 27, max: 33 },
    { day: "周六", icon: "CloudRain", min: 25, max: 29 }
  ],
  safety: [
    { icon: "CheckCircle2", text: "沙滩状况优良，水流清缓，适宜浮潜跳岛。" },
    { icon: "AlertTriangle", text: "注意外海离岸流，进行浮潜等水上项目必须穿着救生衣。" },
    { icon: "Droplet", text: "海岛日照强烈多风，游玩时请常备充足饮用水防虚脱。" }
  ]
};
