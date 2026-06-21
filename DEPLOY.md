# 部署指南（Linux VPS + 域名 + HTTPS）

本应用是一个**有状态的全栈 Node 服务**：

- 入口是仓库根目录的 `server.ts`（用 esbuild 打包为 `dist/server.cjs`）。
- 生产模式下 Express 同时提供前端静态页（`dist/`）和 `/api/*` 接口，监听 `0.0.0.0:5188`。
- 数据用 **JSON 文件 + 本地目录**存储，均位于进程工作目录：
  - `uploads/`：上传的图片 / 视频
  - `gallery_db.json`：相册元数据
  - `checkin_spots_db.json`：共享打卡点（首次启动自动生成）

> 配套文件：`.env.example`（环境变量模板）、`ecosystem.config.cjs`（pm2 配置）、`deploy/nginx.conf`（反代示例）。

---

## 前置条件

- 一台 Ubuntu/Debian 服务器，已开放 `22 / 80 / 443` 端口。
- 一个域名，A 记录已解析到服务器公网 IP。
- 下文用 `your-domain.com` 与目录 `/var/www/2026krabi` 作占位，请替换。

---

## 1. 安装 Node 20 + pm2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g pm2
```
（应用用到 Node 18+ 的全局 `fetch`，安装 20 LTS 稳妥。）

## 2. 拉代码 + 装依赖

```bash
sudo mkdir -p /var/www && cd /var/www
git clone https://github.com/lenakids1603/2026krabi.git
cd 2026krabi
npm ci          # 必须装全量依赖：build 需要 esbuild / tailwind 等 devDependencies
```

## 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，至少设置：
#   GALLERY_ADMIN_PASSWORD = 一个强密码
#   ADMIN_SESSION_SECRET   = openssl rand -hex 32 的输出
nano .env
```
各变量含义见 `.env.example` 内注释。**务必改掉管理员密码与会话密钥的默认值**，否则相册管理员可被任意登录 / Cookie 可被伪造。

## 4. 构建

```bash
npm run build          # 产出 dist/（前端）与 dist/server.cjs（服务端）
```
如需"新增打卡点"页的**真实 Google 地图**，地图 key 是构建期变量，要在构建前导出到 shell（写在 `.env` 里对 build 无效）：
```bash
export GOOGLE_MAPS_PLATFORM_KEY="你的key"
npm run build
```
不设置则地图回退为本地模拟盘，其余功能不受影响。

## 5. 用 pm2 守护进程

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup            # 按它打印出的命令复制执行一次，开启开机自启
```
验证：`pm2 status` 中 `krabi` 为 online；`curl -I http://127.0.0.1:5188` 返回 200。
日志：`pm2 logs krabi`。

## 6. nginx 反代 + HTTPS 证书

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 用仓库自带的反代示例，改掉其中的 your-domain.com
sudo cp deploy/nginx.conf /etc/nginx/sites-available/krabi
sudo sed -i 's/your-domain.com/真实域名/g' /etc/nginx/sites-available/krabi
sudo ln -sf /etc/nginx/sites-available/krabi /etc/nginx/sites-enabled/krabi
sudo nginx -t && sudo systemctl reload nginx

# 自动签发证书并配置 HTTPS（443）与 80->443 跳转
sudo certbot --nginx -d your-domain.com
```
`deploy/nginx.conf` 里的 `client_max_body_size 100M` 很关键——应用允许 100MB 视频上传，nginx 默认上限 1MB 会让上传报 413。

## 7. 防火墙（不要把 5188 暴露公网）

```bash
sudo ufw allow 22,80,443/tcp
sudo ufw enable
```
应用监听的是 `0.0.0.0:5188`，因此用防火墙挡住 5188，只放行 80/443，让外部只能经 nginx 访问。

## 8. 以后更新部署

```bash
cd /var/www/2026krabi
git pull
npm ci
npm run build
pm2 restart krabi
```

---

## 数据持久化（重要）

`uploads/`、`gallery_db.json`、`checkin_spots_db.json` 都在 `/var/www/2026krabi` 下，pm2 重启不会丢。**不要 `rm -rf` 重建该目录**，否则会丢失用户上传的照片和共享打卡点。建议定期备份这三项：

```bash
tar czf /backup/krabi-data-$(date +%F).tgz uploads gallery_db.json checkin_spots_db.json
```

## 已知注意事项

- **`gallery_db.json` 目前被 git 跟踪**：服务器运行时会写它，下次 `git pull` 可能与远程版本冲突或覆盖运行时数据。建议后续把 `gallery_db.json` / `checkin_spots_db.json` / `uploads/` 从 git 取消跟踪并加进 `.gitignore`（服务器首次启动会自动重建种子数据，安全）。在那之前，更新前可先 `git stash` 或备份这些文件。
- 旧 AI Studio 模板遗留的 `@google/genai` 依赖与 `GEMINI_API_KEY` / `APP_URL` 变量当前代码并未使用，可忽略；如需精简可单独清理。
