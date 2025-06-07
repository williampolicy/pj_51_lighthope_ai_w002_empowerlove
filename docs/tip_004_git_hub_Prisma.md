我来帮您解决这两个问题：

## 问题1：缺少 Prisma Schema 文件（重要！）

这个问题**很重要**，因为没有数据库模型定义，认证系统无法工作。让我们创建它：

### 1️⃣ 创建 Prisma 目录和 Schema 文件
```bash
# 创建 prisma 目录
mkdir -p prisma

# 创建 schema.prisma 文件
cat > prisma/schema.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// NextAuth Models
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  password      String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  trainings     Training[]
  achievements  Achievement[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// App Specific Models
model Training {
  id          String    @id @default(cuid())
  userId      String
  assetType   AssetType
  title       String
  description String?
  progress    Float     @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Achievement {
  id          String    @id @default(cuid())
  userId      String
  title       String
  description String
  icon        String
  unlockedAt  DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum AssetType {
  PHYSICAL
  MENTAL
  SOCIAL
  ECONOMIC
}
EOF
```

### 2️⃣ 安装 Prisma 并初始化数据库
```bash
# 安装 Prisma
npm install prisma @prisma/client

# 生成 Prisma Client
npx prisma generate

# 推送数据库结构
npx prisma db push
```

## 问题2：GitHub 上传问题（node_modules）

这是因为 `node_modules` 文件夹被错误地加入了 Git。让我们修复：

### 1️⃣ 清理 Git 历史
```bash
# 从所有历史中删除 node_modules
git filter-branch -f --index-filter 'git rm -r --cached --ignore-unmatch wb_empowerlove_ai/node_modules' HEAD

# 或者使用更现代的方法（如果上面的命令不工作）
git filter-repo --path wb_empowerlove_ai/node_modules --invert-paths
```

### 2️⃣ 如果上面的命令太复杂，使用简单方法
```bash
# 重置到远程状态
git reset --hard origin/main

# 确保 .gitignore 正确
cat >> .gitignore << 'EOF'

# 确保忽略 node_modules
node_modules/
**/node_modules/
EOF

# 添加源代码（不包括 node_modules）
git add src/
git add prisma/
git add package.json package-lock.json
git add .gitignore

# 提交
git commit -m "feat: 添加用户认证系统和四大资产展示页面"

# 推送
git push origin main
```

## 🔧 创建必要的辅助文件

### 创建 Prisma 客户端文件
```bash
# 创建 src/lib/prisma.ts
cat > src/lib/prisma.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
EOF
```

### 创建缺失的页面文件
```bash
# 创建首页
cat > src/app/page.tsx << 'EOF'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            欢迎来到 EmpowerLove.ai
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            AI驱动的人性资产培养平台，助您全面提升生活品质
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始您的旅程
            </Link>
            <Link
              href="/assets"
              className="inline-block bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              探索四大资产
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF
```

### 创建布局文件
```bash
# 创建 src/app/layout.tsx
cat > src/app/layout.tsx << 'EOF'
import './globals.css'
import AuthSessionProvider from '@/components/providers/SessionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
EOF
```

### 创建全局样式
```bash
# 创建 src/app/globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-900 text-white;
  }
}
EOF
```

## 📋 最终检查清单

1. **运行数据库迁移**
```bash
npx prisma db push
```

2. **测试开发服务器**
```bash
HOST=0.0.0.0 npm run dev
```

3. **推送到 GitHub**
```bash
git add -A
git commit -m "feat: 完整的认证系统和资产页面实现"
git push origin main
```

## 🎯 总结

- **问题1（Prisma）是重要的**，已通过创建 schema 文件解决
- **问题2（GitHub）** 是因为 node_modules 被错误提交，已提供解决方案

现在您的项目应该可以：
1. ✅ 正常运行数据库操作
2. ✅ 成功推送到 GitHub
3. ✅ 访问登录/注册页面

有任何问题请告诉我！
