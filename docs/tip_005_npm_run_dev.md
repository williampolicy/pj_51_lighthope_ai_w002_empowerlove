export PS1='\[\e[38;5;110m\]${CONDA_DEFAULT_ENV:+(${CONDA_DEFAULT_ENV##*/}) }\[\e[38;5;251m\]\W \[\e[38;5;110m\]❯\[\e[0m\] '

好的！我看到问题了 - 缺少 `package.json` 文件，所以无法运行 `npm run dev`。让我帮您解决这个问题并启动项目。

## 🚀 快速修复步骤

### 1️⃣ 创建 package.json 文件
```bash
cat > package.json << 'EOF'
{
  "name": "empowerlove-ai",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.7.4",
    "@prisma/client": "^6.9.0",
    "bcryptjs": "^2.4.3",
    "next": "15.0.4",
    "next-auth": "^5.0.0-beta.25",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^8",
    "eslint-config-next": "15.0.4",
    "prisma": "^6.9.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}
EOF
```

### 2️⃣ 创建必要的配置文件

**创建 tailwind.config.js**
```bash
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
```

**创建 postcss.config.js**
```bash
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

**创建 tsconfig.json**
```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

**创建 next.config.js**
```bash
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
EOF
```

### 3️⃣ 安装所有依赖
```bash
# 安装依赖
npm install

# 如果有问题，尝试清理后重装
rm -rf node_modules package-lock.json
npm install
```

### 4️⃣ 创建缺失的认证相关文件

**创建 src/lib/auth.ts**
```bash
cat > src/lib/auth.ts << 'EOF'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/auth/error"
  }
}
EOF
```

**创建 src/components/providers/SessionProvider.tsx**
```bash
mkdir -p src/components/providers
cat > src/components/providers/SessionProvider.tsx << 'EOF'
"use client"

import { SessionProvider } from "next-auth/react"

export default function AuthSessionProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
EOF
```

### 5️⃣ 修复 page.tsx 文件（之前的文件可能不完整）
```bash
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

### 6️⃣ 现在启动项目！
```bash
# 使用 HOST=0.0.0.0 让外部可以访问
HOST=0.0.0.0 npm run dev
```

## 🎯 测试步骤

1. **本地访问**: http://localhost:3001
2. **外部访问**: http://192.168.1.17:3001
3. **测试页面**:
   - 首页: http://192.168.1.17:3001
   - 登录: http://192.168.1.17:3001/login
   - 注册: http://192.168.1.17:3001/register

## 🚨 如果遇到错误

如果出现模块找不到的错误，执行：
```bash
# 清理并重新安装
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 检查清单

确保以下文件都存在：
- ✅ package.json
- ✅ tsconfig.json
- ✅ tailwind.config.js
- ✅ next.config.js
- ✅ src/app/page.tsx
- ✅ src/app/layout.tsx
- ✅ src/app/globals.css
- ✅ src/lib/prisma.ts
- ✅ src/lib/auth.ts

执行这些步骤后，您的网站应该可以正常运行了！告诉我运行结果如何。
