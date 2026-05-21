# 🌴 Lenakids 2026 团建出行小程序 - 前端项目交接说明书

本交接由前端开发团队（AI Studio）整理，旨在说明本项目目前的前端架构体系、核心数据结构设计规则、API层规范以及后续由 Codex 接入后台、数据库和真实 API 时的对接要点与开发边界分配，帮助后续后端同学无缝接手和进行后台化改造。

---

## 一、项目技术栈 (Frontend Stack)

目前前端部分已全部构建完毕，并通过严格的 TypeScript 语法与编译校验：
* **脚手架与构建工具**：Vite (提供零垃圾、敏捷、轻量、高响应的构建和热重载环境)
* **核心框架**：React 18+
* **开发语言**：TypeScript (开启严格类型校验，确保接口健壮性)
* **样式引擎**：Tailwind CSS (采用 `@import "tailwindcss";` 现代化类名引擎进行原子级声明，无冗余多余 CSS 文件)
* **页面路由**：React Router (采用 SPA 路由配置进行平滑多页面过渡，页面跳转通过 `Link` 优雅完成)

---

## 二、当前主要页面文件位置 (File Mapping)

所有前端页面交互及样式和视图代码均置于 `src/screens` 目录下：
* 🏠 **首页** `/` -> `src/screens/Home.tsx`  
  * *负责展示：当前的团建总体进度（行前准备/畅游中/圆满谢幕）、曼谷时间当下最临近/进行中的下一项活动卡片、核心功能导航入口。*
* 📅 **团建行程页** `/itinerary` -> `src/screens/Itinerary.tsx`  
  * *负责展示：10天9晚的日程轴，自动根据曼谷时区高亮当天卡片，支持用户横向滑动卡片和对单天日程详细展开卡片列表。*
* ☀️ **天气潮汐页** `/weather` -> `src/screens/Weather.tsx`  
  * *负责展示：甲米及兰塔两个区域的实时天气预报（气温、雨天指标、紫外线、安全色旗标等）以及潮汐 SVG 曲线拟合与高低限值预警。*
* 📸 **团队共享相册** `/gallery` -> `src/screens/Gallery.tsx`  
  * *负责展示：团队成员上传的图片及视频流，支持即时预览大图、发表评论、点击点赞和快速上传。*
* 🛠️ **相册管理页** `/gallery-admin` -> `src/screens/GalleryAdmin.tsx`  
  * *负责提供：非个人上传文件在未被鉴权通过下的物理强制删除。*
* 📍 **地理打卡点分享** `/checkin-spots` -> `src/screens/SpotsSharing.tsx`  
  * *负责展示：大家分享的餐厅、摄影位、酒吧、咖啡馆打卡位置列表，支持通过移动端一键唤起 Google Maps 进行真机导航。*
* ➕ **新增打卡点** `/add-spot` -> `src/screens/AddSpot.tsx`  
  * *负责展示：新建打卡点的交互表单，可通过手动标记经纬度、分类并上传打卡图片。*

---

## 三、当前核心数据结构 & 数据文件位置 (Mock Data & Schemata)

本地暂存与模拟运行的核心底层数据源保留在 `src/data` 中：
* **系统行程数据**：`src/data/itinerary.ts`
* **天气 Mock 数据**：`src/data/weather.ts`
* **潮汐 Mock 数据**：`src/data/tides.ts`
* **默认打卡数据**：`src/data/checkinSpots.ts`
* **默认相册媒体**：`src/data/gallery.ts`

---

## 四、前端统一 API 层定义 (API Gateway)

为实现前后端物理剥离，目前前端所有的行为与异步数据获取都集中在一个统一封装层—— **`src/services/api.ts`** 里，严禁将数据请求逻辑、直接 fetch 代码直接写进页面组件内部。

### 已有且完成适配的核心函数：
1. **`getHomeStatus()`**  
   * *功能：获取主页状态与当前曼谷时区下临近下一项活动。*
2. **`getThailandTripProgress()`**  
   * *功能：基础泰国曼谷时间计算辅助（输出 `status: before | during | after`等）。*
3. **`getItinerary()`**  
   * *功能：获取 10 天官方日程列表。*
4. **`getWeather(city: 'krabi' | 'lanta')`**  
   * *功能：获取当前指定城市的天气。支持自动 try-catch 失败物理降级。*
5. **`getTides(city: 'krabi' | 'lanta')`**  
   * *功能：获取当前城市的高低潮汐数据，支持 try-catch 本地备份降级。*
6. **`getGalleryMedia()`**  
   * *功能：获取团队相册全部媒体内容。*
7. **`uploadGalleryMedia(file, thumbnailBase64, onProgress)`**  
   * *功能：上传相册媒体。*
8. **`deleteGalleryMedia(id)`**  
   * *功能：按 ID 删除媒体。*
9. **`getCheckinSpots()`**  
   * *功能：获取合并了 localStorage 用户自创数据与本地出厂设定（Default Checkins）之后的全部打卡点。*
10. **`createCheckinSpot(input)`**  
    * *功能：向打卡存储中预埋写入一条新分享记录。*
11. **`deleteCheckinSpot(id)`**  
    * *功能：根据打卡记录 ID 执行擦除。*

---

## 五、统一数据建模类型 (Consolidated TypeScript Types)

所有前后端交互使用的实体契约与数据模型都在 **`src/types/api.ts`** 进行了标准化建模，Codex 接后台时必须完全对齐以下类型（禁止定义冗余模型名称或破坏契约约束）：

* `TripProgress` --- 表达当前的整个行程活动状态机与时间提示 Banner。
* `HomeStatus` --- 主页团建阶段指示模型。
* `ItineraryDay` --- 每一个单日大行程节点（包含主题、第几天、日期、事件数组等）。
* `ItineraryEvent` --- 单体行程详情（时间、类型、地名、说明、导航等）。
* `WeatherForecastResponse` --- 单站天气高内聚包。
* `TideInfo` --- 单站潮汐指标与 SVG 二维辅助折线信息。
* `GalleryMedia` --- 团队相册文件物理模型。
* `CheckinSpot` --- 探店/摄影地理定位模型。

---

## 六、前端临时层实现说明 (Temporary Layers & Client Sandbox)

在无服务器环境下，为了给产品团队测试出完全具备功能交互、数据状态在刷新后不丢失的保真链路，我们运用了纯客户端沙箱：
* 📍 **打卡点数据**：采用 `localStorage` 进行持久存储引擎实现，通过前端比对 ID 逻辑、克隆新增，可支持关闭浏览器下状态不丢失。
* 📸 **相册模块**：运用独立的模拟多设备共享机制，通过 `localStorage` 自动维护本地资源列表。
* ☀️ **天气与潮汐**：采用基于泰国曼谷时间的当日计算公式 + `getThailandTimeString()` 生成瞬时变化的数据，附带 `source: 'mock'` 标记来通知前端当前为安全离线数据。

---

## 七、Codex 后台改造目标 (Codex Target API Boundaries)

后端同学在编写定制服务端、挂载数据库、打通真实外部数据渠道时，请针对以下各项后台物理实体和 API 接口进行重构实现：

### 1. 数据库持久层设计 (Suggested SQLite Schema)
* **`itineraries`** 存储官方预定日程表。
* **`checkin_spots`** 存储全员共享的自定义打卡信息。
* **`gallery_media`** 存储相册图片/视频文件元数据信息：
  ```sql
  CREATE TABLE gallery_media (
      id TEXT PRIMARY KEY,
      file_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      media_type TEXT CHECK(media_type IN ('image', 'video')) NOT NULL,
      original_name TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      uploader_token_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      likes INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0
  );
  ```

### 2. API Endpoints 替换规划
* 📡 **`/api/gallery`** -> 获取真实相册元数据。
* 📡 **`/api/gallery/upload`** -> 统一的文件分片/流式多媒体上传接口。
* 📡 **`/api/gallery/:id`** -> 删除图片，并且必须判定操作人的 `uploader_token_hash` 权限，对普通用户与 Admin 在服务端区分身份。
* 📡 **`/api/checkin-spots`** -> 增、删、改、查所有人共享的打卡。
* 📡 **`/api/weather` 和 `/api/tides`** -> 
  建议由后端实现 OpenWeather 外部抓取接口，并在后端实现 12-24 小时的**内存物理缓存策略**。避免因高频请求第三方引发接口被封禁甚至速率限制（Rate Limit）导致项目大面积卡顿崩溃。

---

## 八、前后端开发界限与协作模式 (Team Boundaries)

为了保持代码整洁度和最大化敏捷发布，双方分工应当被高度自律地遵循：

### 🎨 前端团队 (AI Studio) 负责：
* `src/screens` 中的界面视觉细节、骨架动画加载态、按钮响应速度。
* `src/components` 中的前端局部逻辑展示，地图弹框组件等。
* 任何情况下不要把复杂的 sql 读写、跨域代理转发逻辑直接硬塞进 React View。

### ⚙️ 后端/系统开发 (Codex) 负责：
* 挂载底层真正的 `server/` (集成 Express 等服务)。
* 构建健壮的 `api/` 路由处理及 `database/` 驱动。
* 执行严格的**文件上传安全校验**（防止前端伪造恶意 MIME 类型、防止溢出漏洞）。
* 服务端对于用户的唯一识别、防止普通打卡记录被任意未授权匿名用户直接越权物理擦除的权限鉴别机制（不能完全依赖前端 UI 级别的隐藏屏蔽作为安全依据）。

---

## 九、部署细节与运行监控 (Deployment Overview)

* **目前前端开发/真机临时调试端口**：`5188`
* **当前系统 PM2 部署预览命令**：
  `npx vite preview --host 127.0.0.1 --port 5188`  
  *【部署提醒】：如需修改为正式容器或挂载 nginx 代理，必须确保反向代理对应到内部启动的端口中，在后端启动或更改 package.json 中 script 命令前先执行静态文件的 `npm run build` 打包。*

---

## 十、给 Codex 开发者伙伴的友情提醒 (Reminders)

1. **绝对不要破坏 UI。** 请确保在用真实网络 Fetch 代替 `src/services/api.ts` 的内部实现时，不要过度改动 UI 组件结构与样式类名。
2. **渐进式重写。** 建议按本项目的模块优先级（打卡 -> 相册 -> 首页 -> 天气）一个模块接一个模块地用 REST 接口去重写 `api.ts` 每一个接口。
3. **保持状态回溯和高可用。** 在数据源网络抖动或获取失败时，应借鉴我们在 `/weather` 中对 `isApiError` 的设计一样，提供平滑容忍的 fallback 降级预案，切不可使整个页面面临白屏崩塌。
