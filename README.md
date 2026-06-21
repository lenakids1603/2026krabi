<div align="center">
  <img src="src/assets/images/krabi_hero_retreat_1779245216266.png" alt="LENAKIDS RETREAT 2026" width="900" />

  <h1>LENAKIDS RETREAT 2026 · 安达曼团建出行助手</h1>

  <p>面向 2026 年泰国甲米 / 兰塔岛企业团建的一站式随行小程序<br/>行程、机酒、活动、天气潮汐、共享相册、打卡点分享、临时通讯录，一个 App 全搞定。</p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" />
    <img alt="Express" src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" />
  </p>
</div>

---

## 项目简介

这是一个**全栈一体**的旅行随行 Web App，为一次 10 天 9 晚的泰国甲米团建（出发日 **2026-06-28**）量身打造。前端是移动端优先的单页应用（SPA），后端是同一个 Express 进程：既托管前端静态页，又提供 `/api/*` 接口，**前后端跑在同一个端口（默认 `5188`）**，部署只需一个 Node 服务。

数据采用轻量的 **JSON 文件 + 本地目录**存储，无需数据库即可开箱运行；首次启动会自动生成种子数据。

> 应用界面与文档均为简体中文，面向中文团队成员使用。

---

## 功能特性

| 模块 | 路由 | 说明 |
| --- | --- | --- |
| 🏠 首页 | `/` | 按曼谷时区计算团建阶段（行前 / 畅游中 / 圆满谢幕），展示当前或即将开始的活动卡片与功能导航 |
| 📅 行程安排 | `/itinerary` | 10 天日程时间轴，自动高亮当天，支持横滑与单日详情展开 |
| ✈️ 机酒信息 | `/travel-info` | 航班与酒店关键信息汇总 |
| 🗺️ 活动安排 | `/attractions` | 海岛游、皮划艇等活动详情，含装备清单、强度、费用与注意事项 |
| 🧭 周边查询 | `/dining` | 周边餐厅 / 探店信息查询 |
| ☀️ 天气和潮汐 | `/weather` | 甲米与兰塔双区实时天气（Open-Meteo）+ 潮汐曲线（WorldTides），带缓存与离线降级 |
| 📸 共享相册 | `/gallery` | 团队图片 / 视频上传与浏览，自动生成缩略图；含管理员页 `/gallery-admin` |
| 📍 打卡点分享 | `/checkin-spots` | 共享餐厅 / 摄影位 / 酒吧 / 咖啡馆打卡点，支持一键唤起 Google Maps 导航；新增页 `/add-spot` |
| 👥 临时泰国通讯录 | `/directory` | 团队成员泰国临时号码通讯录，一键拨号 |
| ℹ️ 注意事项 | `/more` | 出行提醒与实用贴士 |

**亮点能力**

- **时区感知**：所有"当前进度 / 当天高亮 / 下一项活动"均基于 `Asia/Bangkok` 计算，人在国内也能看到泰国当地的实时进度。
- **稳健降级**：天气 / 潮汐第三方接口失败时自动回退到内置 Mock 数据并标记 `source: fallback`，页面永不白屏。
- **匿名归属**：相册与打卡点采用匿名 Token 的 SHA-256 哈希标识上传者，**只能删除自己上传的内容**；相册另设管理员可强制删除。
- **上传安全**：限速 + 大小限制 + 文件头魔数（magic number）校验，防止伪造扩展名 / MIME 类型。

---

## 技术栈

**前端**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)（严格类型）
- [Vite 6](https://vite.dev/) 构建 / 开发服务器
- [Tailwind CSS 4](https://tailwindcss.com/)（`@tailwindcss/vite` 插件）
- [React Router 7](https://reactrouter.com/) SPA 路由
- [Motion](https://motion.dev/) 动效、[lucide-react](https://lucide.dev/) 图标、`clsx` + `tailwind-merge`
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) 谷歌地图（无 key 时回退本地模拟地图）

**后端**
- [Express 4](https://expressjs.com/)（Node 18+ 全局 `fetch`）
- 开发用 [tsx](https://github.com/privatenumber/tsx) 直跑 TS，生产用 [esbuild](https://esbuild.github.io/) 打包为单文件 `dist/server.cjs`
- `multer`（文件上传）、`cookie-parser`（管理员会话）、`crypto`（哈希 / HMAC 签名）

**外部数据源**
- [Open-Meteo](https://open-meteo.com/)：天气，**免 key**
- [WorldTides](https://www.worldtides.info/)：潮汐，**可选 key**，缺省用 Mock

---

## 架构概览

```
                          ┌──────────────────────────────────────┐
                          │        Express 进程 (server.ts)        │
  浏览器 (SPA, React)  ──▶ │                                        │
                          │  开发: Vite 中间件 (HMR)               │
                          │  生产: 托管 dist/ 静态资源              │
                          │                                        │
                          │  /api/weather  /api/tides   ──▶ Open-Meteo / WorldTides
                          │  /api/gallery* (上传/删除/管理)        │
                          │  /api/checkin-spots* (增删查)          │
                          └───────────────┬──────────────────────┘
                                          │  读写本地文件
                          ┌───────────────▼──────────────────────┐
                          │ uploads/             媒体文件         │
                          │ gallery_db.json      相册元数据       │
                          │ checkin_spots_db.json 共享打卡点       │
                          └──────────────────────────────────────┘
```

- **单端口全栈**：开发模式下 Express 以中间件方式挂载 Vite（带 HMR）；生产模式下 Express 直接托管 `dist/` 并对未知路由回退 `index.html`（SPA fallback）。
- **统一 API 层**：前端所有数据请求集中在 `src/services/api.ts`，页面组件不直接写 fetch，便于后续替换为真实后端。
- **内存缓存**：天气 / 潮汐结果按城市做带 TTL 的内存缓存，降低第三方接口压力。

---

## 快速开始（本地开发）

**前置条件**：Node.js **18+**（推荐 20 LTS，需要全局 `fetch`）。

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量（首次）
cp .env.example .env
#   本地随便跑可不改；但建议至少改掉 GALLERY_ADMIN_PASSWORD 与 ADMIN_SESSION_SECRET

# 3. 启动开发服务器（Express + Vite 中间件，带热更新）
npm run dev
```

打开 **http://localhost:5188** 即可访问（前后端同端口）。

> 相册管理员默认密码为 `krabi2026`（可在 `/gallery-admin` 登录），生产环境务必修改，见下文。

---

## 环境变量

服务端通过 `dotenv` 在运行时自动读取根目录 `.env`。完整模板见 [`.env.example`](.env.example)。

| 变量 | 必填 | 默认值 | 说明 |
| --- | :---: | --- | --- |
| `NODE_ENV` | 否 | — | `production` 时托管 `dist/`，否则启用 Vite 中间件 |
| `PORT` | 否 | `5188` | 服务监听端口 |
| `GALLERY_ADMIN_PASSWORD` | **生产必填** | `krabi2026` | 相册管理员密码（优先于 `ADMIN_PASSWORD`） |
| `ADMIN_PASSWORD` | 否 | — | 管理员密码的备选变量 |
| `ADMIN_SESSION_SECRET` | **生产必填** | `default_krabi_2026_salt_secret` | 管理员会话 Cookie 的 HMAC 签名密钥，用 `openssl rand -hex 32` 生成 |
| `WORLD_TIDES_API_KEY` | 否 | — | WorldTides key；不填则潮汐使用内置 Mock |
| `WEATHER_CACHE_TTL_MINUTES` | 否 | `10` | 天气缓存时长（取值被限制在 1–10 分钟） |
| `TIDE_CACHE_TTL_MINUTES` | 否 | `360` | 潮汐缓存时长 |
| `API_TIMEOUT_MS` | 否 | `8000` | 第三方接口请求超时（毫秒） |
| `GOOGLE_MAPS_PLATFORM_KEY` | 否 | — | **构建期变量**，谷歌地图 key；由 `vite.config.ts` 在 `npm run build` 时从 shell 读取（写在 `.env` 里对 build **无效**），不填则地图回退本地模拟盘 |

> ⚠️ 生产环境务必修改 `GALLERY_ADMIN_PASSWORD` 与 `ADMIN_SESSION_SECRET`，否则管理员可被任意登录、会话 Cookie 可被伪造。

---

## 可用脚本

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 开发模式：`tsx server.ts`，Express + Vite 中间件，带 HMR |
| `npm run build` | 构建：`vite build`（前端 → `dist/`）+ `esbuild`（服务端 → `dist/server.cjs`） |
| `npm start` | 生产启动：以 `NODE_ENV=production` 运行 `dist/server.cjs` |
| `npm run preview` | 预览 Vite 构建产物（纯前端） |
| `npm run lint` | `tsc --noEmit` 类型检查 |
| `npm run clean` | 清理 `dist` 等构建产物 |

---

## 项目结构

```
2026krabi/
├── server.ts                  # 后端入口：Express + API + SPA 托管
├── server/services/           # 天气 / 潮汐服务（含缓存与降级）
│   ├── weatherService.ts
│   └── tideService.ts
├── src/
│   ├── App.tsx / main.tsx     # 应用入口与路由
│   ├── screens/               # 各页面（Home / Itinerary / Weather / Gallery ...）
│   ├── components/            # 复用组件（layout / home / weather / gallery / directory ...）
│   ├── services/api.ts        # 统一前端 API 层
│   ├── api/galleryApi.ts      # 相册相关请求封装
│   ├── data/                  # 行程、成员、天气/潮汐 Mock 等本地数据
│   ├── types/ & types.ts      # TypeScript 类型契约
│   ├── lib/ & hooks/          # 工具函数与自定义 Hook
│   └── assets/images/         # 本地图片资源
├── deploy/nginx.conf          # nginx 反代示例
├── ecosystem.config.cjs       # pm2 进程配置
├── DEPLOY.md                  # 生产部署指南（VPS + HTTPS）
├── FRONTEND_HANDOFF.md        # 前端架构与接口交接说明
└── .env.example               # 环境变量模板
```

---

## 数据与存储

应用以进程工作目录下的文件作为持久化存储（**已加入 `.gitignore`，首次启动自动生成种子数据**）：

| 文件 / 目录 | 内容 |
| --- | --- |
| `uploads/` | 用户上传的图片 / 视频及缩略图 |
| `gallery_db.json` | 相册媒体元数据 |
| `checkin_spots_db.json` | 全员共享的打卡点 |

> 这三项是真实用户数据，部署更新时**不要删除**。建议定期备份：
> `tar czf krabi-data-$(date +%F).tgz uploads gallery_db.json checkin_spots_db.json`

---

## 安全说明

- **上传防护**：单 IP 每分钟最多 10 次上传；图片 ≤ 10MB、视频 ≤ 100MB；服务端按文件头魔数校验真实类型，拒绝伪造扩展名 / MIME。
- **删除鉴权**：相册与打卡点用匿名 Token 的 SHA-256 哈希标记归属，普通用户只能删自己上传的内容（鉴权在服务端完成，不依赖前端隐藏）。
- **管理员会话**：密码校验通过后下发 HMAC 签名的 `httpOnly` Cookie（有效期 7 天），管理员可强制删除任意相册项。**默认密码与签名密钥仅供开发，生产必须替换。**

---

## 部署

生产部署（Linux VPS + 域名 + HTTPS）的完整步骤见 **[DEPLOY.md](DEPLOY.md)**，要点：

```bash
npm ci            # 装全量依赖（build 需要 devDependencies）
npm run build     # 产出 dist/（前端）与 dist/server.cjs（服务端）
pm2 start ecosystem.config.cjs   # 用 pm2 守护进程
```

配套 [`ecosystem.config.cjs`](ecosystem.config.cjs)（pm2）与 [`deploy/nginx.conf`](deploy/nginx.conf)（nginx 反代，含 `client_max_body_size 100M` 以支持大视频上传）。建议用防火墙挡住 `5188`，只经 nginx 暴露 80 / 443。

---

## 相关文档

- 📘 [DEPLOY.md](DEPLOY.md) — 生产部署指南（Node + pm2 + nginx + certbot）
- 📗 [FRONTEND_HANDOFF.md](FRONTEND_HANDOFF.md) — 前端架构、数据结构与 API 层交接说明
- ⚙️ [.env.example](.env.example) — 环境变量模板与注释

---

## 备注

- 项目脱胎自 Google AI Studio 模板，遗留的 `@google/genai` 依赖与 `GEMINI_API_KEY` / `APP_URL` 变量当前代码**并未使用**，可忽略或后续清理。
- 数据层目前为 JSON 文件存储，[FRONTEND_HANDOFF.md](FRONTEND_HANDOFF.md) 中给出了迁移到 SQLite 等真实数据库的建议 Schema，供后续演进参考。
