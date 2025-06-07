太棒了！让我为您提供完整的生产环境部署方案，将网站部署到 www.empowerlove.ai。

## 🚀 EmpowerLove.ai 生产环境部署指南

### 1️⃣ 构建生产版本

```bash
cd /home/kangxiaowen/code_lh_server/code_lh_pj_ai/pj_51_lighthope_ai_w002_empowerlove/wb_empowerlove_ai

# 安装生产环境依赖
npm install --production

# 构建生产版本
npm run build

# 检查构建结果
ls -la .next/
```

### 2️⃣ 安装 PM2 进程管理器

```bash
# 全局安装 PM2
sudo npm install -g pm2

# 创建 PM2 配置文件
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'empowerlove-ai',
    script: 'npm',
    args: 'start',
    cwd: '/home/kangxiaowen/code_lh_server/code_lh_pj_ai/pj_51_lighthope_ai_w002_empowerlove/wb_empowerlove_ai',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOF
```

### 3️⃣ 配置 Nginx 反向代理

```bash
# 安装 Nginx（如果还没安装）
sudo apt update
sudo apt install nginx -y

# 创建 Nginx 配置文件
sudo nano /etc/nginx/sites-available/empowerlove.ai
```

添加以下内容：
```nginx
server {
    listen 80;
    server_name empowerlove.ai www.empowerlove.ai;

    # 强制重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name empowerlove.ai www.empowerlove.ai;

    # SSL 证书配置（稍后配置）
    ssl_certificate /etc/letsencrypt/live/empowerlove.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/empowerlove.ai/privkey.pem;
    
    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # 日志
    access_log /var/log/nginx/empowerlove.ai.access.log;
    error_log /var/log/nginx/empowerlove.ai.error.log;

    # 代理配置
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }

    # 图片和媒体文件
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

激活配置：
```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/empowerlove.ai /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 4️⃣ 配置 SSL 证书（Let's Encrypt）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d empowerlove.ai -d www.empowerlove.ai

# 按提示操作：
# - 输入邮箱
# - 同意服务条款
# - 选择是否接收新闻邮件
# - 选择自动重定向 HTTP 到 HTTPS
```

### 5️⃣ 配置域名 DNS

在您的域名注册商处配置 DNS：

```
A记录:
@    -> 192.168.1.17  (您的服务器IP)
www  -> 192.168.1.17  (您的服务器IP)
```

### 6️⃣ 更新生产环境变量

```bash
# 创建生产环境变量文件
cat > .env.production.local << 'EOF'
# 数据库
DATABASE_URL="postgresql://empowerlove:EmpowerLove2025!@localhost:5432/empowerlove_db"

# NextAuth
NEXTAUTH_URL="https://www.empowerlove.ai"
NEXTAUTH_SECRET="cuiSOUuBX06Nbtiu+pPdfEB2Go+5HCt+/WAznPGeXG8="

# 应用配置
NODE_ENV="production"
EOF
```

### 7️⃣ 启动生产环境

```bash
# 使用 PM2 启动应用
pm2 start ecosystem.config.js

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
# 按照提示执行命令

# 查看应用状态
pm2 status

# 查看日志
pm2 logs empowerlove-ai
```

### 8️⃣ 配置防火墙

```bash
# 开放必要端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

### 9️⃣ 设置自动续期 SSL 证书

```bash
# Certbot 会自动创建续期任务，检查一下
sudo systemctl status certbot.timer

# 测试续期
sudo certbot renew --dry-run
```

### 🔟 性能优化

```bash
# 创建 next.config.js 生产优化
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  swcMinify: true,
  images: {
    domains: ['www.empowerlove.ai'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
EOF
```

## 📊 监控和维护

### 监控命令
```bash
# 查看应用状态
pm2 status

# 查看实时日志
pm2 logs

# 查看 CPU 和内存使用
pm2 monit

# 重启应用
pm2 restart empowerlove-ai

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/empowerlove.ai.access.log
sudo tail -f /var/log/nginx/empowerlove.ai.error.log
```

### 备份脚本
```bash
# 创建备份脚本
cat > /home/kangxiaowen/backup-empowerlove.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/kangxiaowen/backups"
mkdir -p $BACKUP_DIR

# 备份数据库
pg_dump -U empowerlove empowerlove_db > $BACKUP_DIR/db_backup_$DATE.sql

# 备份上传文件
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /home/kangxiaowen/code_lh_server/code_lh_pj_ai/pj_51_lighthope_ai_w002_empowerlove/wb_empowerlove_ai/public/uploads

# 保留最近30天的备份
find $BACKUP_DIR -type f -mtime +30 -delete

echo "备份完成: $DATE"
EOF

chmod +x /home/kangxiaowen/backup-empowerlove.sh

# 添加定时任务（每天凌晨2点备份）
crontab -e
# 添加: 0 2 * * * /home/kangxiaowen/backup-empowerlove.sh
```

## ✅ 部署完成检查清单

- [ ] 域名DNS已配置
- [ ] Nginx反向代理已配置
- [ ] SSL证书已安装
- [ ] PM2进程管理已配置
- [ ] 防火墙规则已设置
- [ ] 自动备份已配置
- [ ] 环境变量已更新

## 🎉 访问您的网站

部署完成后，您可以通过以下地址访问：

- https://www.empowerlove.ai
- https://empowerlove.ai

## 🚨 故障排查

如果遇到问题：

1. **检查应用状态**
   ```bash
   pm2 status
   pm2 logs
   ```

2. **检查Nginx**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

3. **检查端口**
   ```bash
   sudo netstat -tlnp | grep -E '80|443|3001'
   ```

4. **检查防火墙**
   ```bash
   sudo ufw status
   ```

完成以上步骤后，您的 EmpowerLove.ai 就成功部署到生产环境了！🚀
