# React 学习指南 —— 从 Vue 到 React

一个专为 Vue 开发者设计的 React 学习项目，通过 Vue/React 双代码对比的方式，帮助你快速掌握 React 核心概念。

## 预览

左侧菜单导航 + 右侧内容展示，每个知识点都配有 Vue 和 React 的对比代码示例、交互式演示和注意事项。

## 技术栈

| 技术         | 版本 | 说明         |
| ------------ | ---- | ------------ |
| React        | 19.x | UI 框架      |
| TypeScript   | 5.x  | 类型安全     |
| Vite         | 8.x  | 构建工具     |
| React Router | 6.x  | 路由管理     |
| Prism.js     | 1.x  | 代码语法高亮 |

## 项目结构

```
src/
├── components/       # 公共组件
│   ├── Layout.tsx    # 布局组件（侧边栏 + 内容区）
│   ├── Layout.css    # 布局样式
│   └── CodeBlock.tsx # 代码展示 & Vue/React 对比组件
├── pages/            # 知识点页面
│   ├── Home.tsx              # 课程介绍
│   ├── Environment.tsx       # 环境搭建
│   ├── ProjectStructure.tsx  # 项目结构
│   ├── JSXPage.tsx           # JSX 语法
│   ├── ComponentsPage.tsx    # 组件基础
│   ├── PropsPage.tsx         # Props 属性
│   ├── StatePage.tsx         # State 状态
│   ├── EventHandlingPage.tsx # 事件处理
│   ├── ConditionalRenderingPage.tsx # 条件渲染
│   ├── ListRenderingPage.tsx # 列表渲染
│   ├── FormsPage.tsx         # 表单处理
│   ├── UseStatePage.tsx      # useState 详解
│   ├── UseEffectPage.tsx     # useEffect 详解
│   ├── UseRefPage.tsx        # useRef 详解
│   ├── UseMemoPage.tsx       # useMemo & useCallback
│   ├── UseContextPage.tsx    # useContext
│   ├── UseReducerPage.tsx    # useReducer
│   ├── CustomHooksPage.tsx   # 自定义 Hooks
│   ├── LifecyclePage.tsx     # 生命周期对比
│   ├── ContextVsProvidePage.tsx # Context vs Provide/Inject
│   ├── ReactRouterPage.tsx   # React Router
│   ├── StateManagementPage.tsx  # 状态管理
│   ├── PerformancePage.tsx   # 性能优化
│   ├── TypeScriptPage.tsx    # TypeScript 结合
│   ├── PatternsPage.tsx      # 常用设计模式
│   └── DifferencesSummaryPage.tsx # React vs Vue 总结
├── App.tsx           # 路由配置
├── main.tsx          # 入口文件
└── index.css         # 全局样式
```

## 内容目录

### 快速开始

- 课程介绍 & Vue vs React 总览
- 环境搭建
- 项目结构对比

### 核心概念

- JSX 语法（vs Vue Template）
- 组件基础（插槽 vs children）
- Props 属性（emit vs 回调函数）
- State 状态（响应式 vs 不可变）
- 事件处理（修饰符对应）
- 条件渲染（v-if vs &&/三元）
- 列表渲染（v-for vs map）
- 表单处理（v-model vs 受控组件）

### Hooks 深入

- useState（vs ref/reactive）
- useEffect（vs watch/onMounted）
- useRef（vs template ref）
- useMemo & useCallback（vs computed）
- useContext（vs provide/inject）
- useReducer（vs Vuex actions）
- 自定义 Hooks（vs Composables）

### 进阶技巧

- 生命周期映射表
- Context vs Provide/Inject
- React Router（vs Vue Router）
- 状态管理（Zustand/Redux vs Pinia）
- 性能优化
- TypeScript 结合

### 实战模式

- 常用设计模式（HOC、组合组件等）
- React vs Vue 终极对照表

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

启动后访问 http://localhost:5173

## 适用人群

- 有 Vue 2/3 开发经验，想快速学习 React 的开发者
- 需要同时掌握 Vue 和 React 的前端工程师
- 想了解两个框架设计理念差异的技术爱好者
