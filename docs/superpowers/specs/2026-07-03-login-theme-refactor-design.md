# 登录页主题系统改造设计

## 目标

将登录页由硬编码 Tailwind 暗色方案改造为通过 `variable.css` 的 CSS 变量支持的 light/dark 自动主题系统。

## 范围

- 新建 `stores/app.ts`（主题状态管理）
- 新建 `hooks/useTheme.ts`（store ↔ DOM 同步）
- 修改 `styles/styles.css`（引入 variable.css）
- 修改 `pages/__root.tsx`（初始化主题）
- 修改 `pages/login.tsx`（硬编码颜色 → CSS 变量）

不包括：其他页面的主题改造、组件库主题化。

## 架构

```
zustand store (app.ts)           ← persisted to localStorage
    ↕ read/write
useTheme() hook                  ← 在 __root.tsx 调用一次
    ↓
document.documentElement         ← data-theme="light|dark"
    ↓
CSS variable.css                  ← :root / [data-theme="dark"]
    ↓
login.tsx                        ← var(--xxx) 响应主题
```

## 详细设计

### 1. `stores/app.ts`

- Zustand store, `persist` 中间件写入 localStorage key `app-storage`
- 状态：`theme: 'light' | 'dark'`
- 初始化策略：优先读 localStorage → 其次 `prefers-color-scheme` → 默认 `light`
- actions：`setTheme`, `toggleTheme`

### 2. `hooks/useTheme.ts`

- 封装 `useAppStore`，同步 `data-theme` 到 `<html>`
- 返回 `{ theme, setTheme, toggleTheme, isDark }`
- 内部 `useEffect` 监听 `theme` 变化并设置 `document.documentElement.dataset.theme`

### 3. `styles/styles.css`

```css
@import url('./variable.css');
@import url('./tailwind.css');
```

### 4. `pages/__root.tsx`

在 `RootComponent` 调用 `useTheme()` 一次，全局生效。

### 5. `pages/login.tsx` — 颜色变量映射

| 当前 Tailwind 类 | 替换为 |
|---|---|
| `bg-[#0a0a0a]`（页面背景） | `bg-[var(--bg-page)]` |
| `bg-[#141414]`（卡片背景） | `bg-[var(--bg-card)]` |
| `border-white/10` / `border-white/[0.08]` | `border-[var(--border)]` |
| `text-[#fafafa]`（标题文字） | `text-[var(--text-main)]` |
| `text-[#a1a1aa]`（次要文字） | `text-[var(--text-muted)]` |
| `bg-[#1a1a1a]`（输入框背景） | `bg-[var(--input-bg)]` |
| `bg-white`（按钮背景） | `bg-[var(--primary-btn-bg)]` |
| `text-[#0a0a0a]`（按钮文字） | `text-[var(--primary-btn-text)]` |
| `hover:bg-white/90`（按钮 hover） | `hover:opacity-90` 或变量 |
| `focus:border-white/40`（输入框 focus） | `focus:border-[var(--input-focus)]` |

保留：功能逻辑（用户名/密码/显示密码/错误提示/loading）、布局结构、iconify 图标。

新增：右上角主题切换按钮（与提供 HTML 一致）。

## 不变

- 表单字段、验证逻辑、API 调用
- 路由结构（`/login` 作为独立路由）
- zustand authStore
- Tailwind + Iconify 构建工具链

## 文件变动清单

| 操作 | 文件 |
|---|---|
| 新建 | `src/stores/app.ts` |
| 新建 | `src/hooks/useTheme.ts` |
| 修改 | `src/styles/styles.css` — 添加 `@import url('./variable.css')` |
| 修改 | `src/pages/__root.tsx` — 调用 `useTheme()` |
| 修改 | `src/pages/login.tsx` — CSS 变量化 + 主题切换按钮 |
