# Song Tracker项目说明

## 📚 文档说明

**保留开发**：希望快速掌握全栈开发，能够独立开发类似项目的开发者
**技术栈**：Next.js 16 + TypeScript + Supabase + Tailwind CSS + Shadcn/ui
**适用场景**：SaaS 应用、数据追踪系统、多用户管理平台

# 第一部分：项目概览

## 1.1 系统架构图

┌─────────────────────────────────────────────────────────┐
│                    用户浏览器                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  登录/注册   │  │  歌曲管理    │  │  数据可视化  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│              Vercel (Next.js 托管)                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  前端路由层 (App Router)                          │  │
│  │  /login → 登录页                                  │  │
│  │  /dashboard → 仪表盘                              │  │
│  │  /dashboard/songs/[id] → 详情页                  │  │
│  │  /admin → 管理后台                                │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API 路由层 (/app/api/*)                          │  │
│  │  /api/songs/add → 添加歌曲                        │  │
│  │  /api/songs/my-songs → 获取用户歌曲              │  │
│  │  /api/admin/* → 管理员 API                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│                  Supabase 平台                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Auth 认证    │  │ PostgreSQL   │  │ pg_cron      │  │
│  │ - 注册登录   │  │ - 6张数据表  │  │ - 定时抓取   │  │
│  │ - Session    │  │ - RLS 策略   │  │ - 每日汇总   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│              抖音音乐 API (外部数据源)                   │
│  [https://beta-luna.douyin.com/luna/h5/seo_track](https://beta-luna.douyin.com/luna/h5/seo_track)         │
└─────────────────────────────────────────────────────────┘

## 1.2 技术栈详解

### 前端框架

- **Next.js 16 (App Router)**：服务端渲染 + 路由
- **React 18**：UI 组件库
- **TypeScript**：类型安全

### UI 相关

- **Tailwind CSS**：原子化 CSS 框架
- **Shadcn/ui**：基于 Radix UI 的组件库
- **Recharts**：图表库
- **Lucide React**：图标库

### 后端服务

- **Supabase**：
    - PostgreSQL 数据库
    - Authentication（用户认证）
    - Row Level Security（数据权限）
    - pg_cron（定时任务）

### 状态管理

- **Zustand**：轻量级状态管理

### 部署

- **Vercel**：前端托管
- **Supabase Cloud**：后端服务

## 1.3 核心功能列表

### 用户功能

1. ✅ 用户注册/登录
2. ✅ 添加歌曲追踪
3. ✅ 查看歌曲列表
4. ✅ 查看歌曲详情（图表）
5. ✅ 取消追踪
6. ✅ 修改追踪频率（Rank）

### 数据功能

1. ✅ 自动定时抓取数据
2. ✅ 每日增量计算
3. ✅ 趋势图表展示
4. ✅ 统计卡片展示

### 管理功能

1. ✅ 管理员权限控制
2. ✅ 用户管理
3. ✅ 歌曲管理
4. ✅ 手动触发抓取
5. ✅ 查看抓取日志

## 1.4 数据流向图

### 1.4.1 用户添加歌曲流程

┌──────────┐
│ 用户输入 │
│ 歌曲 ID  │
└────┬─────┘
│
▼
┌────────────────────┐
│ AddSongForm 组件   │
│ 1. 验证输入        │
│ 2. 调用 API        │
└────┬───────────────┘
│
▼
┌────────────────────────┐
│ /api/douyin/fetch-track│
│ 1. 调用抖音 API        │
│ 2. 解析 JSON 数据      │
│ 3. 返回歌曲信息        │
└────┬───────────────────┘
│
▼
┌────────────────────────┐
│ 前端展示预览           │
│ - 歌曲名               │
│ - 歌手                 │
│ - 统计数据             │
└────┬───────────────────┘
│ 用户确认
▼
┌────────────────────────┐
│ /api/songs/add         │
│ 1. 检查歌曲是否存在    │
│ 2. 保存到 songs 表     │
│ 3. 保存初始统计        │
│ 4. 创建用户关联        │
└────┬───────────────────┘
│
▼
┌────────────────────────┐
│ Supabase 数据库        │
│ - songs                │
│ - song_stats           │
│ - user_song_relations  │
└────────────────────────┘

1.4.2 定时数据抓取流程

┌─────────────────────┐
│ Supabase pg_cron    │
│ 每小时触发          │
└──────┬──────────────┘
│
▼
┌──────────────────────────┐
│ trigger_fetch_rank_a()   │
│ SQL 函数                 │
└──────┬───────────────────┘
│
▼
┌──────────────────────────┐
│ 查询 Rank A 歌曲         │
│ SELECT * FROM songs      │
│ WHERE rank = 'A'         │
└──────┬───────────────────┘
│
▼
┌──────────────────────────┐
│ 循环每首歌曲             │
│ 1. 调用抖音 API          │
│ 2. 解析数据              │
│ 3. 保存到 song_stats     │
│ 4. 记录日志              │
└──────┬───────────────────┘
│
▼
┌──────────────────────────┐
│ 数据库更新               │
│ - song_stats (新记录)    │
│ - fetch_logs (日志)      │
└──────────────────────────┘

# 第二部分：目录结构详解

## 2.1 完整目录树

song-tracker/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # 认证相关路由组
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # 登录页
│   │   │   ├── actions.ts           # Server Actions (登录/注册/登出)
│   │   │   └── layout.tsx           # 认证布局
│   │   ├── dashboard/               # 主应用路由
│   │   │   ├── songs/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # 歌曲详情页
│   │   │   └── page.tsx             # 仪表盘主页
│   │   ├── admin/                   # 管理后台
│   │   │   └── page.tsx             # 管理后台主页
│   │   ├── api/                     # API 路由
│   │   │   ├── songs/
│   │   │   │   ├── add/route.ts    # 添加歌曲
│   │   │   │   ├── my-songs/route.ts # 获取用户歌曲
│   │   │   │   ├── untrack/route.ts  # 取消追踪
│   │   │   │   ├── update-rank/route.ts # 修改 Rank
│   │   │   │   └── [id]/route.ts   # 获取歌曲详情
│   │   │   ├── douyin/
│   │   │   │   └── fetch-track/route.ts # 调用抖音 API
│   │   │   ├── admin/
│   │   │   │   ├── users/route.ts  # 用户管理
│   │   │   │   ├── all-songs/route.ts # 全局歌曲
│   │   │   │   ├── trigger-fetch/route.ts # 手动抓取
│   │   │   │   └── trigger-daily-rollup/route.ts # 每日汇总
│   │   │   └── auth/
│   │   │       └── is-admin/route.ts # 检查管理员
│   │   ├── auth/
│   │   │   └── callback/route.ts    # 认证回调
│   │   ├── test-db/
│   │   │   └── page.tsx             # 数据库测试页
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页（重定向）
│   │   └── globals.css              # 全局样式
│   ├── components/                  # React 组件
│   │   ├── admin/
│   │   │   └── trigger-fetch.tsx   # 手动触发组件
│   │   ├── charts/
│   │   │   ├── stats-chart.tsx     # 趋势图表
│   │   │   ├── daily-stats-chart.tsx # 每日增量图
│   │   │   └── stat-cards.tsx      # 统计卡片
│   │   ├── layout/
│   │   ├── providers/
│   │   │   └── auth-provider.tsx   # 认证上下文
│   │   ├── songs/
│   │   │   ├── add-song-form.tsx   # 添加歌曲表单
│   │   │   ├── song-card.tsx       # 歌曲卡片
│   │   │   ├── song-list.tsx       # 歌曲列表
│   │   │   ├── delete-song-dialog.tsx # 删除确认
│   │   │   └── update-rank-dialog.tsx # 修改 Rank
│   │   ├── ui/                     # Shadcn UI 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (其他组件)
│   │   ├── theme-provider.tsx      # 主题提供者
│   │   └── theme-toggle.tsx        # 主题切换
│   ├── hooks/                      # 自定义 Hooks
│   │   └── use-fetch-song.ts      # 获取歌曲信息
│   ├── lib/                        # 工具函数
│   │   ├── supabase/
│   │   │   ├── client.ts          # 客户端
│   │   │   ├── server.ts          # 服务端
│   │   │   └── middleware.ts      # 中间件
│   │   ├── admin.ts               # 管理员工具
│   │   ├── parse-douyin-data.ts   # 数据解析
│   │   └── utils.ts               # 通用工具
│   ├── store/                      # 状态管理
│   │   └── auth-store.ts          # 认证状态
│   └── types/                      # TypeScript 类型
│       └── index.ts               # 类型定义
├── supabase/                       # Supabase 配置
│   └── migrations/                # 数据库迁移
├── workers/                        # Cloudflare Workers (可选)
├── .env.local                     # 本地环境变量
├── .env.production                # 生产环境变量
├── .gitignore
├── next.config.js                 # Next.js 配置
├── package.json
├── tailwind.config.ts             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
└── [README.md](http://readme.md/)

## 2.2 目录作用说明

### `src/app/` - Next.js App Router

这是 Next.js 15 的核心，使用**文件系统路由**：

- **文件夹 = 路由段**：`app/dashboard` → `/dashboard`
- **page.tsx = 页面**：定义该路由的 UI
- **layout.tsx = 布局**：共享的 UI 包裹
- **route.ts = API**：API 端点
- **(folder) = 路由组**：不影响 URL，只用于组织

### `src/components/` - React 组件

按**功能模块**组织：

- `admin/` - 管理员专用组件
- `charts/` - 图表组件
- `songs/` - 歌曲相关组件
- `ui/` - 通用 UI 组件（Shadcn）
- `providers/` - React Context 提供者

### `src/lib/` - 工具函数库

**核心工具**：

- `supabase/` - 数据库客户端（分客户端/服务端）
- `parse-douyin-data.ts` - 解析外部 API 数据
- `utils.ts` - 通用工具（cn 函数等）

### `src/store/` - 全局状态

使用 **Zustand** 管理：

- 认证状态（用户信息、是否管理员）
- 全局加载状态
- 其他跨组件状态

### `src/types/` - TypeScript 类型

**集中管理类型定义**：

- 数据库表类型
- API 响应类型
- 组件 Props 类型

# 第三部分：分阶段开发过程

## 阶段 1：项目初始化

### 目标

搭建 Next.js 项目，配置 TypeScript、Tailwind CSS、Shadcn/u

### 创建的文件

```
文件路径作用关键内容package.json项目依赖Next.js, React, TypeScript, Tailwindnext.config.jsNext.js 配置图片域名、环境变量tailwind.config.tsTailwind 配置主题、颜色、暗色模式src/app/layout.tsx根布局HTML 结构、字体、Providersrc/types/index.ts类型定义Song, SongStats, DailyStats 等.env.local环境变量Supabase URL, Keys
```

### 核心代码示例

**`src/types/index.ts`** - 类型定义的基础

```jsx
// 定义系统中所有的数据类型
export type RankType = 'A' | 'B' | 'C';

export interface Song {
  id: string;              // UUID (数据库主键)
  song_id: string;         // 抖音歌曲 ID (业务主键)
  title: string;
  artist: string;
  album: string;
  cover_url?: string;
  rank: RankType;          // 追踪频率
  created_at: string;      // ISO 时间戳
}

export interface SongStats {
  id: number;
  song_id: string;         // 外键关联 Song
  likes: number;
  favorites: number;
  comments: number;
  shares: number;
  fetched_at: string;
}
```

**为什么这样设计？**

- `Song` 是主实体，存储歌曲基本信息
- `SongStats` 是时序数据，同一首歌有多条统计记录
- 使用 `song_id` (UUID) 关联，而不是 `song_id` (抖音ID)，因为 UUID 是数据库主键

### 检查点

- [ ]  `npm run dev` 启动成功
- [ ]  `http://localhost:3000` 显示默认页面
- [ ]  Tailwind 样式生效
- [ ]  TypeScript 无报错

## 阶段 2：Supabase 配置

### 目标

创建数据库表、配置 RLS、连接 Next.js

### 数据库表结构

### **songs（歌曲主表）**

```jsx
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id TEXT UNIQUE NOT NULL,      -- 抖音歌曲ID（业务唯一键）
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  cover_url TEXT,
  rank TEXT DEFAULT 'C',              -- A/B/C
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引：提升查询性能
CREATE INDEX idx_songs_rank ON songs(rank);
CREATE INDEX idx_songs_song_id ON songs(song_id);
```

**为什么需要两个ID？**

- `id` (UUID): 数据库内部主键，全局唯一
- `song_id` (TEXT): 业务键（抖音ID），用于对接外部 API

### **user_song_relations（用户-歌曲关联表）**

```jsx
CREATE TABLE user_song_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, song_id)           -- 防止重复关注
);
```

**为什么需要关联表？**

- 多对多关系：一个用户可以追踪多首歌，一首歌可以被多个用户追踪
- 级联删除：用户删除时，自动删除其关注关系

### **song_stats（统计数据表）**

```jsx
CREATE TABLE song_stats (
  id BIGSERIAL PRIMARY KEY,           -- 自增ID（时序数据）
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  likes BIGINT DEFAULT 0,
  favorites BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- 组合索引：按歌曲和时间查询
CREATE INDEX idx_song_stats_song_fetched 
ON song_stats(song_id, fetched_at DESC);
```

**为什么用 BIGSERIAL？**

- 时序数据量大，自增 ID 性能更好
- 不需要 UUID（不是业务主键）

### RLS（Row Level Security）策略

**核心概念**：RLS 让数据库自动过滤数据，用户只能看到自己的数据。

```jsx
-- 启用 RLS
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- 策略：用户只能查看自己关注的歌曲
CREATE POLICY "Users can view their tracked songs"
ON songs FOR SELECT
TO authenticated                      -- 已登录用户
USING (
  id IN (
    SELECT song_id 
    FROM user_song_relations 
    WHERE user_id = auth.uid()        -- 当前用户ID
  )
  OR
  auth.uid() IN (SELECT user_id FROM admins) -- 或是管理员
);
```

**工作原理**：

1. 用户查询 `SELECT * FROM songs`
2. PostgreSQL 自动添加 `WHERE` 条件
3. 只返回该用户有权限的数据

### Supabase 客户端配置

**`src/lib/supabase/client.ts`** - 客户端（浏览器）

```jsx
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`src/lib/supabase/server.ts`** - 服务端（Next.js API）

```jsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

**为什么分客户端和服务端？**
- **客户端**：浏览器中运行，使用浏览器 Cookie
- **服务端**：Next.js API Routes，需要读取服务端 Cookie
- **SSR**：Next.js 中间件，需要特殊处理

### 检查点
- [ ] 数据库表创建成功
- [ ] RLS 策略启用
- [ ] `/test-db` 页面连接成功

---

## 阶段 3：用户认证系统

### 目标
实现注册、登录、登出，保护路由

### 认证流程图
```
┌─────────────┐
│ 用户填写表单│
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Server Action    │
│ (login/signup)   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Supabase Auth    │
│ - 验证密码       │
│ - 生成 JWT       │
│ - 设置 Cookie    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ redirect()       │
│ → /dashboard     │
└──────────────────┘
```

### 核心文件

**`src/app/(auth)/actions.ts`** - Server Actions

```jsx
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// 登录
export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}

// 注册
export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  // 先登出（清除旧会话）
  await supabase.auth.signOut()
  
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}

// 登出
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

**为什么用 Server Actions？**

- 在服务端执行，更安全
- 直接访问数据库和认证 API
- 自动处理 Cookie
- 支持 `redirect()`

**`src/store/auth-store.ts`** - 全局认证状态

```jsx
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, isAdmin: false, isLoading: false }),
}))
```

**为什么用 Zustand？**

- 比 Redux 简单很多
- 无需 Context Provider
- TypeScript 支持好
- 性能优秀

**`src/components/providers/auth-provider.tsx`** - 认证监听

```jsx
'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setIsAdmin, setIsLoading } = useAuthStore()
  
  useEffect(() => {
    const supabase = createClient()
    
    // 获取初始 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        // 检查是否是管理员
        checkAdmin(session.user.id)
      }
      setIsLoading(false)
    })
    
    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user)
          checkAdmin(session.user.id)
        } else {
          setUser(null)
          setIsAdmin(false)
        }
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
  
  const checkAdmin = async (userId: string) => {
    const response = await fetch('/api/auth/is-admin')
    const data = await response.json()
    setIsAdmin(data.isAdmin)
  }
  
  return <>{children}</>
}
```

**为什么需要 AuthProvider？**

- 在 App 启动时获取用户状态
- 监听认证事件（登录、登出）
- 更新全局 store

### 路由保护

**`src/app/dashboard/page.tsx`**

```jsx
'use client'

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')  // 未登录，跳转登录页
    }
  }, [user, isLoading, router])
  
  if (isLoading) return <Loading />
  if (!user) return null
  
  return <div>Dashboard Content</div>
}
```

### 检查点

- [ ]  注册新用户成功
- [ ]  登录跳转到 Dashboar

## 阶段 4：歌曲添加与抖音 API 集成

### 目标

用户输入歌曲 ID，调用抖音 API，解析数据，保存到数据库

### 数据流程图

```jsx
┌──────────────┐
│ 1. 用户输入  │
│ 歌曲 ID      │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ 2. useFetchSong Hook │
│ 调用前端 API         │
└──────┬───────────────┘
       │
       ▼
┌─────────────────────────────┐
│ 3. /api/douyin/fetch-track  │
│ - 调用抖音 API              │
│ - 解析 JSON                 │
│ - 返回标准化数据            │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────────┐
│ 4. 前端显示预览      │
│ - 歌曲信息           │
│ - 统计数据           │
│ - Rank 选择器        │
└──────┬───────────────┘
       │ 用户确认
       ▼
┌─────────────────────────┐
│ 5. /api/songs/add       │
│ - 检查歌曲是否已存在    │
│ - 插入 songs 表         │
│ - 插入 song_stats 表    │
│ - 创建用户关联          │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────┐
│ 6. 刷新列表          │
└──────────────────────┘
```

### 核心文件详解

### **1. API 调用层**

**`src/app/api/douyin/fetch-track/route.ts`**

```jsx
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackId = searchParams.get('track_id')
  
  if (!trackId) {
    return NextResponse.json({ error: '缺少歌曲 ID' }, { status: 400 })
  }
  
  try {
    // 1. 调用抖音 API
    const apiUrl = `https://beta-luna.douyin.com/luna/h5/seo_track?track_id=${trackId}`
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 ...',
        'Accept': 'application/json',
      },
      cache: 'no-store',  // 不缓存，获取最新数据
    })
    
    if (!response.ok) {
      throw new Error(`API 返回 ${response.status}`)
    }
    
    const data = await response.json()
    
    // 2. 返回原始数据（让前端解析）
    return NextResponse.json(data)
    
  } catch (error) {
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    )
  }
}
```

**为什么在服务端调用 API？**

- 避免 CORS 跨域问题
- 隐藏 API 细节
- 统一错误处理
- 可以添加缓存、限流

### **2. 数据解析层**

**`src/lib/parse-douyin-data.ts`**

```jsx
import { ParsedSongInfo } from '@/types'

export function parseDouyinResponse(data: any, trackId: string): ParsedSongInfo | null {
  try {
    // 抖音 API 返回的数据结构
    const seoTrack = data.seo_track
    
    if (!seoTrack) return null
    
    // 标准化数据
    return {
      song_id: trackId,
      title: seoTrack.name || '未知歌曲',
      artist: seoTrack.track?.artists?.[0]?.name || '未知歌手',
      album: seoTrack.track?.album?.name || '未知专辑',
      cover_url: seoTrack.cover || '',
      // 统计数据
      likes: parseInt(seoTrack.track?.stats?.count_collected || '0'),
      favorites: 0,  // API 无此字段
      comments: parseInt(seoTrack.track?.stats?.count_comment || '0'),
      shares: parseInt(seoTrack.track?.stats?.count_shared || '0'),
    }
  } catch (error) {
    console.error('解析失败:', error)
    return null
  }
}

// 格式化数字（1000 → 1K）
export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}
```

**为什么需要解析层？**

- 外部 API 结构复杂，统一处理
- 数据验证和容错
- 方便适配多个数据源
- 类型安全

### **3. 自定义 Hook**

**`src/hooks/use-fetch-song.ts`**

```jsx
import { useState } from 'react'
import { ParsedSongInfo } from '@/types'
import { parseDouyinResponse, validateParsedSong } from '@/lib/parse-douyin-data'

export function useFetchSong() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchSong = async (trackId: string): Promise<ParsedSongInfo | null> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // 1. 调用后端 API
      const response = await fetch(`/api/douyin/fetch-track?track_id=${trackId}`)
      
      if (!response.ok) {
        throw new Error('获取失败')
      }
      
      const data = await response.json()
      
      // 2. 解析数据
      const parsed = parseDouyinResponse(data, trackId)
      
      // 3. 验证数据
      if (!validateParsedSong(parsed)) {
        throw new Error('数据无效')
      }
      
      return parsed
      
    } catch (err) {
      const message = err instanceof Error ? err.message : '未知错误'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }
  
  return { fetchSong, isLoading, error }
}
```

**为什么用自定义 Hook？**

- 封装业务逻辑
- 管理状态（loading, error）
- 可重用
- 测试友好

### **4. 添加歌曲组件**

**`src/components/songs/add-song-form.tsx`** - 核心组件

```jsx
'use client'

import { useState } from 'react'
import { useFetchSong } from '@/hooks/use-fetch-song'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AddSongForm({ onSuccess }: { onSuccess?: () => void }) {
  const [trackId, setTrackId] = useState('')
  const [selectedRank, setSelectedRank] = useState<'A' | 'B' | 'C'>('C')
  const [songPreview, setSongPreview] = useState<ParsedSongInfo | null>(null)
  const [step, setStep] = useState<'input' | 'preview' | 'success'>('input')
  
  const { fetchSong, isLoading, error } = useFetchSong()
  
  // 步骤 1: 获取歌曲预览
  const handleFetchPreview = async () => {
    const result = await fetchSong(trackId)
    if (result) {
      setSongPreview(result)
      setStep('preview')
    }
  }
  
  // 步骤 2: 确认添加
  const handleConfirmAdd = async () => {
    try {
      const response = await fetch('/api/songs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...songPreview,
          rank: selectedRank,
        }),
      })
      
      if (!response.ok) throw new Error('添加失败')
      
      setStep('success')
      onSuccess?.()  // 通知父组件刷新列表
      
    } catch (error) {
      console.error(error)
    }
  }
  
  // 根据步骤渲染不同 UI
  return (
    <Card>
      {step === 'input' && (
        <InputStep 
          trackId={trackId}
          setTrackId={setTrackId}
          onFetch={handleFetchPreview}
          isLoading={isLoading}
          error={error}
        />
      )}
      
      {step === 'preview' && songPreview && (
        <PreviewStep
          song={songPreview}
          rank={selectedRank}
          setRank={setSelectedRank}
          onConfirm={handleConfirmAdd}
          onCancel={() => setStep('input')}
        />
      )}
      
      {step === 'success' && (
        <SuccessStep onReset={() => setStep('input')} />
      )}
    </Card>
  )
}
```

**组件设计要点**：

- **多步骤表单**：input → preview → success
- **状态提升**：通过 `onSuccess` 通知父组件
- **子组件分离**：每个步骤独立组件，便于维护

### **5. 保存到数据库**

**`src/app/api/songs/add/route.ts`**

```jsx
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    // 1. 验证用户身份
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }
    
    // 2. 解析请求体
    const body = await request.json()
    const { song_id, title, artist, album, cover_url, rank, likes, comments, shares } = body
    
    // 3. 使用 admin 客户端（绕过 RLS）
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // 4. 检查歌曲是否已存在
    const { data: existingSong } = await supabaseAdmin
      .from('songs')
      .select('id')
      .eq('song_id', song_id)
      .maybeSingle()
    
    let songUuid: string
    
    if (existingSong) {
      // 歌曲存在，检查用户是否已关注
      songUuid = existingSong.id
      
      const { data: relation } = await supabaseAdmin
        .from('user_song_relations')
        .select('id')
        .eq('user_id', user.id)
        .eq('song_id', songUuid)
        .maybeSingle()
      
      if (relation) {
        return NextResponse.json(
          { error: '已添加过此歌曲' },
          { status: 409 }
        )
      }
      
    } else {
      // 5. 创建新歌曲
      const { data: newSong, error: insertError } = await supabaseAdmin
        .from('songs')
        .insert({
          song_id,
          title,
          artist,
          album,
          cover_url,
          rank,
        })
        .select('id')
        .single()
      
      if (insertError) throw insertError
      
      songUuid = newSong.id
      
      // 6. 保存初始统计数据
      await supabaseAdmin
        .from('song_stats')
        .insert({
          song_id: songUuid,
          likes,
          favorites: 0,
          comments,
          shares,
        })
    }
    
    // 7. 创建用户关联
    await supabaseAdmin
      .from('user_song_relations')
      .insert({
        user_id: user.id,
        song_id: songUuid,
      })
    
    return NextResponse.json({
      success: true,
      song_id: songUuid,
    })
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

**关键逻辑**：
1. **验证用户身份**：必须登录
2. **检查重复**：同一用户不能重复添加
3. **事务处理**：
   - 插入/获取歌曲
   - 插入统计数据
   - 创建用户关联
4. **使用 Admin 客户端**：绕过 RLS，直接写入

**为什么用 Admin 客户端？**
- RLS 策略限制了插入权限
- 需要以系统身份写入数据
- Service Role Key 有完全权限

### 检查点
- [ ] 输入歌曲 ID，获取预览
- [ ] 显示歌曲信息和统计
- [ ] 点击确认，成功添加
- [ ] 数据库有新记录
- [ ] 列表刷新显示新歌曲

---

## 阶段 5：歌曲列表与管理

### 目标
显示用户追踪的歌曲，支持取消追踪、修改 Rank

### 数据流程图
```
┌──────────────┐
│ Dashboard    │
│ 挂载时       │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ SongList 组件    │
│ useEffect 获取   │
└──────┬───────────┘
       │
       ▼
┌─────────────────────────┐
│ /api/songs/my-songs     │
│ - 查询 user_song_rel... │
│ - JOIN songs            │
│ - 获取最新统计          │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ 遍历渲染 SongCard       │
│ - 显示歌曲信息          │
│ - 显示统计数据          │
│ - 操作菜单              │
└─────────────────────────┘
```

### 核心文件

### **1. 获取歌曲列表 API**

**`src/app/api/songs/my-songs/route.ts`**

```jsx
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }
  
  // 1. 查询用户关注的歌曲（利用 RLS 自动过滤）
  const { data: relations } = await supabase
    .from('user_song_relations')
    .select(`
      id,
      created_at,
      song_id,
      songs (
        id,
        song_id,
        title,
        artist,
        album,
        cover_url,
        rank,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  // 2. 提取歌曲数据
  const songs = relations.map(r => r.songs).filter(Boolean)
  
  // 3. 获取每首歌的最新统计
  const songsWithStats = await Promise.all(
    songs.map(async (song) => {
      const { data: latestStats } = await supabase
        .from('song_stats')
        .select('likes, favorites, comments, shares, fetched_at')
        .eq('song_id', song.id)
        .order('fetched_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      
      return {
        ...song,
        latest_stats: latestStats || {
          likes: 0,
          favorites: 0,
          comments: 0,
          shares: 0,
          fetched_at: null,
        }
      }
    })
  )
  
  return NextResponse.json({
    songs: songsWithStats,
    total: songs.length,
  })
}
```

**SQL 查询详解**：

```jsx
// Supabase 的 select 支持嵌套查询
.select(`
  id,
  created_at,
  song_id,
  songs (...)  // 自动 JOIN songs 表
`)
```

等价于 SQL:

```jsx
SELECT 
  r.id,
  r.created_at,
  r.song_id,
  s.*
FROM user_song_relations r
LEFT JOIN songs s ON r.song_id = s.id
WHERE r.user_id = $user_id
```

### **2. 歌曲卡片组件**

**`src/components/songs/song-card.tsx`**

```jsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Music, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'

interface SongCardProps {
  song: {
    id: string
    title: string
    artist: string
    rank: 'A' | 'B' | 'C'
    latest_stats?: {
      likes: number
      comments: number
      shares: number
      fetched_at: string
    }
  }
  onDeleted?: () => void
}

export function SongCard({ song, onDeleted }: SongCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showRankDialog, setShowRankDialog] = useState(false)
  
  // 取消追踪
  const handleDelete = async () => {
    try {
      const response = await fetch('/api/songs/untrack', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id: song.id }),
      })
      
      if (!response.ok) throw new Error('删除失败')
      
      toast.success('取消追踪成功')
      onDeleted?.()  // 通知父组件刷新
      
    } catch (error) {
      toast.error('操作失败')
    }
  }
  
  // 修改 Rank
  const handleUpdateRank = async (newRank: 'A' | 'B' | 'C') => {
    try {
      const response = await fetch('/api/songs/update-rank', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id: song.id, rank: newRank }),
      })
      
      if (!response.ok) throw new Error('更新失败')
      
      toast.success('更新成功')
      onDeleted?.()  // 刷新列表
      
    } catch (error) {
      toast.error('操作失败')
    }
  }
  
  return (
    <>
      <Card>
        {/* 歌曲信息 */}
        <div className="flex items-center justify-between">
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          
          {/* Rank 徽章 */}
          <Badge>{song.rank}</Badge>
          
          {/* 操作菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowRankDialog(true)}>
                修改 Rank
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                取消追踪
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* 统计数据 */}
        <div className="grid grid-cols-3">
          <div>点赞: {song.latest_stats?.likes}</div>
          <div>评论: {song.latest_stats?.comments}</div>
          <div>分享: {song.latest_stats?.shares}</div>
        </div>
      </Card>
      
      {/* 确认对话框 */}
      <DeleteSongDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        songTitle={song.title}
      />
      
      <UpdateRankDialog
        open={showRankDialog}
        onOpenChange={setShowRankDialog}
        onConfirm={handleUpdateRank}
        currentRank={song.rank}
      />
    </>
  )
}
```

**组件设计要点**：

- **状态管理**：每个对话框独立状态
- **回调通知**：通过 `onDeleted` 通知父组件
- **Toast 提示**：操作反馈
- **对话框分离**：`DeleteSongDialog`、`UpdateRankDialog` 独立组件

### **3. 取消追踪 API**

**`src/app/api/songs/untrack/route.ts`**

```jsx
export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }
  
  const { song_id } = await request.json()
  
  // 使用 admin 客户端删除关联
  const supabaseAdmin = createAdminClient(...)
  
  await supabaseAdmin
    .from('user_song_relations')
    .delete()
    .eq('user_id', user.id)
    .eq('song_id', song_id)
  
  return NextResponse.json({ success: true })
}
```

**逻辑要点**：

- 只删除 `user_song_relations` 记录
- 不删除 `songs` 表（其他用户可能还在追踪）
- 级联删除由数据库自动处理

### **4. 修改 Rank API**

**`src/app/api/songs/update-rank/route.ts`**

```jsx
export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }
  
  const { song_id, rank } = await request.json()
  
  // 验证 Rank 值
  if (!['A', 'B', 'C'].includes(rank)) {
    return NextResponse.json({ error: '无效的 Rank' }, { status: 400 })
  }
  
  // 验证用户是否有权限（是追踪者或管理员）
  const { data: relation } = await supabase
    .from('user_song_relations')
    .select('id')
    .eq('user_id', user.id)
    .eq('song_id', song_id)
    .maybeSingle()
  
  if (!relation) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }
  
  // 更新 Rank
  const supabaseAdmin = createAdminClient(...)
  
  await supabaseAdmin
    .from('songs')
    .update({ rank })
    .eq('id', song_id)
  
  return NextResponse.json({ success: true })
}
```

**权限控制**：
- 验证用户是否追踪了该歌曲
- 管理员可以修改所有歌曲
- 使用 PATCH 方法（部分更新）

### 检查点
- [ ] Dashboard 显示歌曲列表
- [ ] 点击"取消追踪"，歌曲消失
- [ ] 点击"修改 Rank"，Rank 更新
- [ ] Toast 提示正常显示

---

## 阶段 6：数据抓取系统（Supabase Cron）

### 目标
使用 Supabase pg_cron 定时抓取数据

### Cron 执行流程图
```
┌──────────────────────────┐
│ Supabase pg_cron         │
│ 每小时触发（Rank A）      │
└────────┬─────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ trigger_fetch_rank_a()      │
│ PostgreSQL 函数             │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ 读取私有配置表              │
│ - supabase_url              │
│ - service_role_key          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ 调用 Edge Function (可选)   │
│ 或直接在函数内抓取          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ FOR EACH 歌曲 IN Rank A     │
│ 1. 调用抖音 API             │
│ 2. 解析数据                 │
│ 3. INSERT song_stats        │
│ 4. INSERT fetch_logs        │
└─────────────────────────────┘
```

### 核心配置

### **1. 创建私有配置表**

```jsx
-- 创建 private schema
CREATE SCHEMA IF NOT EXISTS private;

-- 配置表
CREATE TABLE IF NOT EXISTS private.app_config (
  key text PRIMARY KEY,
  value text NOT NULL
);

-- 写入配置
INSERT INTO private.app_config (key, value) VALUES
  ('supabase_url', 'https://your-project.supabase.co'),
  ('service_role_key', 'your_service_role_key')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
```

**为什么需要私有配置？**

- pg_cron 运行在数据库内部
- 需要访问 Supabase URL 和 Key
- 不能使用环境变量（Node.js 才有）
- private schema 不被 API 暴露

### **2. 创建触发函数**

```jsx
CREATE OR REPLACE FUNCTION trigger_fetch_rank_a()
RETURNS void AS $$
DECLARE
  _url text;
  _key text;
BEGIN
  -- 读取配置
  SELECT value INTO _url FROM private.app_config WHERE key = 'supabase_url';
  SELECT value INTO _key FROM private.app_config WHERE key = 'service_role_key';
  
  -- 调用 Edge Function 或直接在这里写抓取逻辑
  -- 方案1: 调用 Edge Function
  PERFORM net.http_post(
    url := _url || '/functions/v1/fetch-rank-a',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || _key
    )
  );
  
  -- 方案2: 直接在函数内抓取（更简单）
  -- 见下文
END;
$$ LANGUAGE plpgsql;
```

3. 创建 Cron 任务

```jsx
-- Rank A: 每小时
SELECT cron.schedule(
  'fetch-rank-a-hourly',
  '0 * * * *',  -- Cron 表达式：每小时的第0分钟
  $$SELECT trigger_fetch_rank_a()$$
);

-- Rank B: 每6小时
SELECT cron.schedule(
  'fetch-rank-b-6hourly',
  '0 */6 * * *',
  $$SELECT trigger_fetch_rank_b()$$
);

-- Rank C: 每12小时
SELECT cron.schedule(
  'fetch-rank-c-12hourly',
  '0 */12 * * *',
  $$SELECT trigger_fetch_rank_c()$$
);

-- 每日汇总: 每天 00:00
SELECT cron.schedule(
  'daily-rollup',
  '0 0 * * *',
  $$SELECT trigger_daily_rollup()$$
);
```

**Cron 表达式说明**：

```jsx
*    *    *    *    *
  │    │    │    │    │
  │    │    │    │    └─ 星期几 (0-6, 0=周日)
  │    │    │    └────── 月份 (1-12)
  │    │    └─────────── 日
  │    └──────────────── 小时 (0-23)
└───────────────────── 分钟 (0-59)

#### **4. 直接在 SQL 函数内抓取（推荐）**
```sql
CREATE OR REPLACE FUNCTION fetch_and_save_rank_a()
RETURNS void AS $$
DECLARE
  song_record RECORD;
  api_response jsonb;
  likes_count bigint;
  comments_count bigint;
  shares_count bigint;
BEGIN
  -- 遍历 Rank A 歌曲
  FOR song_record IN 
    SELECT id, song_id, title FROM songs WHERE rank = 'A'
  LOOP
    BEGIN
      -- 调用 HTTP API（需要 pg_net 扩展）
      SELECT content::jsonb INTO api_response
      FROM net.http_get(
        'https://beta-luna.douyin.com/luna/h5/seo_track?track_id=' || song_record.song_id
      );
      
      -- 解析数据
      likes_count := (api_response->'seo_track'->'track'->'stats'->>'count_collected')::bigint;
      comments_count := (api_response->'seo_track'->'track'->'stats'->>'count_comment')::bigint;
      shares_count := (api_response->'seo_track'->'track'->'stats'->>'count_shared')::bigint;
      
      -- 插入统计数据
      INSERT INTO song_stats (song_id, likes, favorites, comments, shares)
      VALUES (song_record.id, likes_count, 0, comments_count, shares_count);
      
      -- 记录成功日志
      INSERT INTO fetch_logs (song_id, status)
      VALUES (song_record.id, 'success');
      
    EXCEPTION WHEN OTHERS THEN
      -- 记录失败日志
      INSERT INTO fetch_logs (song_id, status, error_message)
      VALUES (song_record.id, 'error', SQLERRM);
    END;
    
    -- 延迟1秒（避免请求过快）
    PERFORM pg_sleep(1);
  END LOOP;
END;
$$ LANGUAGE plpgsql;
```

**关键点**：
- 使用 `pg_net` 扩展发送 HTTP 请求
- `FOR LOOP` 遍历歌曲
- `TRY-CATCH` 错误处理
- `pg_sleep` 限流

### 查看和管理 Cron
```sql
-- 查看所有任务
SELECT * FROM cron.job;

-- 查看执行历史
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;

-- 取消任务
SELECT cron.unschedule('fetch-rank-a-hourly');
```

### 检查点
- [ ] Cron 任务创建成功
- [ ] 手动执行函数，数据正常插入
- [ ] 查看 `fetch_logs` 有记录
- [ ] `song_stats` 表有新数据

---

## 阶段 7：数据可视化

### 目标
展示趋势图表、每日增量、统计卡片

### 图表数据流程图
```

┌──────────────────┐
│ 详情页挂载       │
└────────┬─────────┘
│
▼
┌──────────────────────────┐
│ /api/songs/[id]          │
│ 1. 获取歌曲信息          │
│ 2. 获取历史统计数据      │
│ 3. 获取每日增量          │
└────────┬─────────────────┘
│
▼
┌──────────────────────────┐
│ 前端处理数据             │
│ 1. 转换为图表格式        │
│ 2. 计算增长率            │
│ 3. 渲染图表              │
└──────────────────────────┘

```jsx
### 核心文件

#### **1. 获取详情 API**

**`src/app/api/songs/[id]/route.ts`**
```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }
  
  // 1. 获取歌曲信息
  const { data: song } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single()
  
  // 2. 验证权限（是否追踪了该歌曲）
  const { data: relation } = await supabase
    .from('user_song_relations')
    .select('id')
    .eq('user_id', user.id)
    .eq('song_id', id)
    .maybeSingle()
  
  if (!relation) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }
  
  // 3. 获取最近30天的统计数据
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const { data: stats } = await supabase
    .from('song_stats')
    .select('*')
    .eq('song_id', id)
    .gte('fetched_at', thirtyDaysAgo.toISOString())
    .order('fetched_at', { ascending: true })
  
  // 4. 获取每日增量
  const { data: dailyStats } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('song_id', id)
    .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
    .order('date', { ascending: true })
  
  return NextResponse.json({
    song,
    stats: stats || [],
    dailyStats: dailyStats || [],
  })
}
```

**SQL 优化**：
- 使用 `gte` (>=) 过滤时间
- `order by` 排序
- 利用索引 `idx_song_stats_song_fetched`

#### **2. 趋势图表组件**

**`src/components/charts/stats-chart.tsx`**
```typescript
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCount } from '@/lib/parse-douyin-data'

interface StatsChartProps {
  data: Array<{
    fetched_at: string
    likes: number
    comments: number
    shares: number
  }>
}

export function StatsChart({ data }: StatsChartProps) {
  // 转换数据格式
  const chartData = data.map(item => ({
    time: new Date(item.fetched_at).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
    }),
    点赞: item.likes,
    评论: item.comments,
    分享: item.shares,
  }))
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
          angle={-45}
          textAnchor="end"
        />
        <YAxis tickFormatter={formatCount} />
        <Tooltip formatter={(value: number) => value.toLocaleString()} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="点赞" 
          stroke="#ef4444"
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="评论" 
          stroke="#22c55e"
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="分享" 
          stroke="#a855f7"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

**Recharts 关键属性**：
- `ResponsiveContainer`: 自适应容器
- `type="monotone"`: 平滑曲线
- `strokeWidth`: 线条粗细
- `tickFormatter`: Y 轴格式化（1000 → 1K）

#### **3. 每日增量柱状图**

**`src/components/charts/daily-stats-chart.tsx`**
```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DailyStatsChartProps {
  data: Array<{
    date: string
    likes: number
    comments: number
    shares: number
  }>
}

export function DailyStatsChart({ data }: DailyStatsChartProps) {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    }),
    点赞增量: item.likes,
    评论增量: item.comments,
    分享增量: item.shares,
  }))
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="点赞增量" fill="#ef4444" />
        <Bar dataKey="评论增量" fill="#22c55e" />
        <Bar dataKey="分享增量" fill="#a855f7" />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

#### **4. 统计卡片**

**`src/components/charts/stat-cards.tsx`**
```typescript
interface StatCardsProps {
  currentStats: {
    likes: number
    comments: number
    shares: number
  }
  previousStats?: {
    likes: number
    comments: number
    shares: number
  }
}

export function StatCards({ currentStats, previousStats }: StatCardsProps) {
  // 计算增长
  const calculateChange = (current: number, previous?: number) => {
    if (!previous) return null
    const change = current - previous
    const percentage = ((change / previous) * 100).toFixed(1)
    return { change, percentage }
  }
  
  const stats = [
    {
      title: '点赞数',
      value: currentStats.likes,
      icon: Heart,
      change: calculateChange(currentStats.likes, previousStats?.likes),
    },
    // ... 其他统计
  ]
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(stat => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
            <stat.icon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCount(stat.value)}
            </div>
            {stat.change && (
              <div className={stat.change.change > 0 ? 'text-green-600' : 'text-red-600'}>
                {stat.change.change > 0 ? '↑' : '↓'} {stat.change.percentage}%
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

**设计要点**：
- 显示当前值
- 显示增长率
- 颜色区分增长/下降
- 图标增强视觉

### 检查点
- [ ] 详情页显示图表
- [ ] 趋势图正常渲染
- [ ] 每日增量柱状图显示
- [ ] 统计卡片显示增长率

---

## 阶段 8：每日增量计算

### 目标
每天自动计算数据增量

### 计算逻辑图
```

┌──────────────────────┐
│ 每天 00:00 触发      │
└────────┬─────────────┘
│
▼
┌──────────────────────────────┐
│ FOR EACH 歌曲                │
└────────┬─────────────────────┘
│
▼
┌──────────────────────────────┐
│ 获取今天最后一条统计         │
│ SELECT * FROM song_stats     │
│ WHERE date = today           │
│ ORDER BY fetched_at DESC     │
│ LIMIT 1                      │
└────────┬─────────────────────┘
│
▼
┌──────────────────────────────┐
│ 获取昨天最后一条统计         │
│ SELECT * FROM song_stats     │
│ WHERE date = yesterday       │
│ ORDER BY fetched_at DESC     │
│ LIMIT 1                      │
└────────┬─────────────────────┘
│
▼
┌──────────────────────────────┐
│ 计算增量                     │
│ likes_inc = today - yesterday│
│ change_rate = inc / yesterday│
└────────┬─────────────────────┘
│
▼
┌──────────────────────────────┐
│ INSERT INTO daily_stats      │
│ (song_id, date, likes, ...)  │
└──────────────────────────────┘

```jsx
### 核心 SQL 函数
```sql
CREATE OR REPLACE FUNCTION trigger_daily_rollup()
RETURNS void AS $$
DECLARE
  song_record RECORD;
  today_stats RECORD;
  yesterday_stats RECORD;
  today_date DATE := CURRENT_DATE;
  yesterday_date DATE := CURRENT_DATE - INTERVAL '1 day';
  likes_inc BIGINT;
  comments_inc BIGINT;
  shares_inc BIGINT;
  change_rate_val FLOAT;
BEGIN
  -- 遍历所有歌曲
  FOR song_record IN SELECT id, title FROM songs
  LOOP
    BEGIN
      -- 删除今天的旧记录（如果存在）
      DELETE FROM daily_stats 
      WHERE song_id = song_record.id AND date = today_date;
      
      -- 获取今天的最新数据
      SELECT likes, comments, shares 
      INTO today_stats
      FROM song_stats
      WHERE song_id = song_record.id
        AND fetched_at >= today_date::timestamp
        AND fetched_at < (today_date + INTERVAL '1 day')::timestamp
      ORDER BY fetched_at DESC
      LIMIT 1;
      
      -- 如果今天没有数据，跳过
      CONTINUE WHEN NOT FOUND;
      
      -- 获取昨天的最新数据
      SELECT likes, comments, shares 
      INTO yesterday_stats
      FROM song_stats
      WHERE song_id = song_record.id
        AND fetched_at >= yesterday_date::timestamp
        AND fetched_at < today_date::timestamp
      ORDER BY fetched_at DESC
      LIMIT 1;
      
      -- 计算增量
      likes_inc := today_stats.likes - COALESCE(yesterday_stats.likes, 0);
      comments_inc := today_stats.comments - COALESCE(yesterday_stats.comments, 0);
      shares_inc := today_stats.shares - COALESCE(yesterday_stats.shares, 0);
      
      -- 计算变化率
      IF yesterday_stats.likes > 0 THEN
        change_rate_val := (likes_inc::FLOAT / yesterday_stats.likes) * 100;
      ELSE
        change_rate_val := 0;
      END IF;
      
      -- 插入每日统计
      INSERT INTO daily_stats (song_id, date, likes, comments, shares, change_rate)
      VALUES (song_record.id, today_date, likes_inc, comments_inc, shares_inc, change_rate_val);
      
    EXCEPTION WHEN OTHERS THEN
      -- 记录错误但继续处理下一首歌
      RAISE NOTICE 'Error processing song %: %', song_record.title, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
```

**关键SQL知识**：
- `COALESCE(value, default)`: 如果值为 NULL，返回默认值
- `CONTINUE WHEN`: 跳过当前循环
- `::timestamp`: 类型转换
- `RAISE NOTICE`: 输出日志

### 手动触发 API

**`src/app/api/admin/trigger-daily-rollup/route.ts`**
```typescript
export async function POST(request: Request) {
  // ... 验证管理员权限 ...
  
  const supabaseAdmin = createAdminClient(...)
  
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0]
  
  const { data: songs } = await supabaseAdmin
    .from('songs')
    .select('id, title')
  
  const results = {
    total: songs.length,
    success: 0,
    failed: 0,
    skipped: 0,
  }
  
  for (const song of songs) {
    try {
      // 删除旧记录
      await supabaseAdmin
        .from('daily_stats')
        .delete()
        .eq('song_id', song.id)
        .eq('date', today)
      
      // 获取今天数据
      const { data: todayData } = await supabaseAdmin
        .from('song_stats')
        .select('likes, comments, shares')
        .eq('song_id', song.id)
        .gte('fetched_at', `${today}T00:00:00Z`)
        .lte('fetched_at', `${today}T23:59:59Z`)
        .order('fetched_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      
      if (!todayData) {
        results.skipped++
        continue
      }
      
      // 获取昨天数据
      const { data: yesterdayData } = await supabaseAdmin
        .from('song_stats')
        .select('likes, comments, shares')
        .eq('song_id', song.id)
        .gte('fetched_at', `${yesterday}T00:00:00Z`)
        .lte('fetched_at', `${yesterday}T23:59:59Z`)
        .order('fetched_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      
      // 计算增量
      const likesInc = todayData.likes - (yesterdayData?.likes || 0)
      const commentsInc = todayData.comments - (yesterdayData?.comments || 0)
      const sharesInc = todayData.shares - (yesterdayData?.shares || 0)
      
      const changeRate = yesterdayData?.likes
        ? ((likesInc / yesterdayData.likes) * 100)
        : 0
      
      // 插入
      await supabaseAdmin
        .from('daily_stats')
        .insert({
          song_id: song.id,
          date: today,
          likes: likesInc,
          comments: commentsInc,
          shares: sharesInc,
          change_rate: changeRate,
        })
      
      results.success++
      
    } catch (error) {
      results.failed++
    }
  }
  
  return NextResponse.json({
    success: true,
    results,
  })
}
```

### 检查点
- [ ] 手动触发每日汇总
- [ ] `daily_stats` 表有新记录
- [ ] 增量值正确
- [ ] 详情页显示每日增量图

---

## 阶段 9：管理后台

### 目标
管理员可以查看所有用户、所有歌曲、手动触发抓取

### 权限检查流程
```

┌──────────────┐
│ 访问 /admin  │
└──────┬───────┘
│
▼
┌──────────────────┐
│ useAuthStore     │
│ 检查 isAdmin     │
└──────┬───────────┘
│
├─ false → 跳转 /dashboard
│
└─ true
│
▼
┌────────────────────┐
│ 渲染管理后台       │
│ - 用户列表         │
│ - 歌曲列表         │
│ - 触发抓取         │
└────────────────────┘

```jsx
### 核心文件

#### **1. 用户列表 API**

**`src/app/api/admin/users/route.ts`**
```typescript
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // 验证管理员权限
  const { data: adminData } = await supabase
    .from('admins')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()
  
  if (!adminData) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }
  
  // 使用 admin 客户端获取所有用户
  const supabaseAdmin = createAdminClient(...)
  
  const { data: users } = await supabaseAdmin.auth.admin.listUsers()
  
  // 获取每个用户的歌曲数量
  const usersWithStats = await Promise.all(
    users.users.map(async (u) => {
      const { count } = await supabaseAdmin
        .from('user_song_relations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', u.id)
      
      const { data: adminInfo } = await supabaseAdmin
        .from('admins')
        .select('role')
        .eq('user_id', u.id)
        .maybeSingle()
      
      return {
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        song_count: count || 0,
        is_admin: !!adminInfo,
        admin_role: adminInfo?.role,
      }
    })
  )
  
  return NextResponse.json({
    users: usersWithStats,
    total: users.users.length,
  })
}
```

**关键API**：
- `supabaseAdmin.auth.admin.listUsers()`: 获取所有用户
- `select('*', { count: 'exact', head: true })`: 只返回数量
- `Promise.all()`: 并发查询多个用户

#### **2. 全局歌曲列表 API**

**`src/app/api/admin/all-songs/route.ts`**
```typescript
export async function GET() {
  // ... 验证管理员权限 ...
  
  const { data: songs } = await supabaseAdmin
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })
  
  // 获取每首歌的追踪用户数
  const songsWithStats = await Promise.all(
    songs.map(async (song) => {
      const { count: userCount } = await supabaseAdmin
        .from('user_song_relations')
        .select('*', { count: 'exact', head: true })
        .eq('song_id', song.id)
      
      const { data: latestStats } = await supabaseAdmin
        .from('song_stats')
        .select('likes, comments, shares, fetched_at')
        .eq('song_id', song.id)
        .order('fetched_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      
      return {
        ...song,
        user_count: userCount || 0,
        latest_stats: latestStats,
      }
    })
  )
  
  return NextResponse.json({
    songs: songsWithStats,
    total: songs.length,
  })
}
```

#### **3. 管理后台页面**

**`src/app/admin/page.tsx`**
```typescript
'use client'

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuthStore()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [songs, setSongs] = useState([])
  
  // 权限检查
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/dashboard')
    }
  }, [user, isAdmin, isLoading])
  
  // 获取数据
  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
      fetchSongs()
    }
  }, [isAdmin])
  
  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users')
    const data = await response.json()
    setUsers(data.users)
  }
  
  const fetchSongs = async () => {
    const response = await fetch('/api/admin/all-songs')
    const data = await response.json()
    setSongs(data.songs)
  }
  
  if (!isAdmin) return null
  
  return (
    <div>
      <h1>管理后台</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardTitle>总用户数</CardTitle>
          <div className="text-2xl">{users.length}</div>
        </Card>
        <Card>
          <CardTitle>总歌曲数</CardTitle>
          <div className="text-2xl">{songs.length}</div>
        </Card>
        <Card>
          <CardTitle>平均追踪</CardTitle>
          <div className="text-2xl">
            {(users.reduce((sum, u) => sum + u.song_count, 0) / users.length).toFixed(1)}
          </div>
        </Card>
      </div>
      
      {/* 数据抓取控制 */}
      <TriggerFetch />
      
      {/* 数据表格 */}
      <Tabs>
        <TabsList>
          <TabsTrigger value="users">用户管理</TabsTrigger>
          <TabsTrigger value="songs">歌曲管理</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>邮箱</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>追踪歌曲</TableHead>
                <TableHead>注册时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    {u.is_admin ? <Badge>管理员</Badge> : '普通用户'}
                  </TableCell>
                  <TableCell>{u.song_count} 首</TableCell>
                  <TableCell>
                    {new Date(u.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="songs">
          {/* 歌曲表格类似 */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### 检查点
- [ ] 管理员可以访问 `/admin`
- [ ] 普通用户访问 `/admin` 被跳转
- [ ] 显示用户列表
- [ ] 显示歌曲列表
- [ ] 手动触发抓取正常

---

## 阶段 10：部署到 Vercel

### 目标
部署到生产环境

### 部署流程图
```

┌──────────────┐
│ 推送代码到   │
│ GitHub       │
└──────┬───────┘
│
▼
┌──────────────────┐
│ Vercel 自动检测  │
│ - 拉取代码       │
│ - npm install    │
│ - npm run build  │
└──────┬───────────┘
│
▼
┌──────────────────┐
│ 部署到全球 CDN   │
│ - 静态文件       │
│ - API Routes     │
└──────┬───────────┘
│
▼
┌──────────────────┐
│ 访问生产环境     │
│ https://...      │
└──────────────────┘

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_DOUYIN_API_BASE=...
CRON_SECRET=...
NODE_VERSION=18