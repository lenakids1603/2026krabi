// pm2 进程配置。
// 用法（在仓库根目录）：
//   npm ci && npm run build
//   pm2 start ecosystem.config.cjs
//   pm2 save && pm2 startup   # 开机自启
//   pm2 logs krabi            # 看日志
module.exports = {
  apps: [
    {
      name: "krabi",
      // 运行 esbuild 打包后的服务端（需先执行 npm run build）。
      script: "dist/server.cjs",
      // 固定工作目录为本文件所在目录（仓库根），
      // 确保 uploads/ 与 *.json 数据文件解析到正确位置（即使开机自启也不跑偏）。
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      max_restarts: 10,
      // 服务端内置 dotenv，会自动从 cwd 读取 .env，无需在此重复配置敏感变量。
    },
  ],
};
