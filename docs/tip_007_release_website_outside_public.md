我们之前已经创建了简化的认证系统，不需要 NextAuth。让我们删除这个未使用的文件：

## 🔧 删除未使用的 NextAuth 文件

### 1️⃣ 删除 auth.ts 文件

```bash
# 删除未使用的 auth.ts
rm -f src/lib/auth.ts

# 确认文件已删除
ls -la src/lib/
```

### 2️⃣ 再次构建

```bash
npm run build
```

### 3️⃣ 如果构建成功，会看到类似这样的输出

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Collecting build traces
✓ Finalizing page optimization
```

### 4️⃣ 构建成功后，启动 PM2

```bash
# 启动生产版本
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs empowerlove-ai --lines 20
```

请执行这些命令，应该就能成功构建了！
