import CodeBlock from '../components/CodeBlock'

export default function ProjectStructure() {
    return (
        <div className="page">
            <h1>项目结构</h1>
            <p>对比 Vue 和 React 项目的目录结构，帮助你快速找到对应关系。</p>

            <h2>React + Vite 项目结构</h2>
            <CodeBlock language="bash" code={`
my-react-app/
├── public/              # 静态资源（不经过构建）
│   └── favicon.svg
├── src/
│   ├── assets/          # 需要构建处理的资源
│   ├── components/      # 公共组件
│   ├── pages/           # 页面组件
│   ├── hooks/           # 自定义 Hooks（类似 composables）
│   ├── utils/           # 工具函数
│   ├── types/           # TypeScript 类型定义
│   ├── App.tsx          # 根组件
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
      `} />

            <h2>对比 Vue 项目结构</h2>
            <CodeBlock language="bash" code={`
my-vue-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/      # 公共组件（.vue 文件）
│   ├── views/           # 页面组件（React 中叫 pages）
│   ├── composables/     # 组合式函数（React 中叫 hooks）
│   ├── utils/
│   ├── types/
│   ├── App.vue          # 根组件（React 是 App.tsx）
│   ├── main.ts          # 入口文件
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
      `} />

            <h2>关键文件对比</h2>

            <h3>入口文件</h3>
            <div className="comparison">
                <div className="comparison-col">
                    <div className="comparison-col-header vue">Vue main.ts</div>
                    <CodeBlock code={`
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
          `} language="typescript" />
                </div>
                <div className="comparison-col">
                    <div className="comparison-col-header react">React main.tsx</div>
                    <CodeBlock code={`
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
          `} language="tsx" />
                </div>
            </div>

            <h3>根组件</h3>
            <div className="comparison">
                <div className="comparison-col">
                    <div className="comparison-col-header vue">Vue App.vue</div>
                    <CodeBlock code={`
<template>
  <router-view />
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
/* 样式 */
</style>
          `} language="jsx" />
                </div>
                <div className="comparison-col">
                    <div className="comparison-col-header react">React App.tsx</div>
                    <CodeBlock code={`
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* 路由配置 */}
    </BrowserRouter>
  )
}

export default App
          `} language="tsx" />
                </div>
            </div>

            <div className="tip">
                <div className="tip-title">💡 核心区别</div>
                <ul>
                    <li>Vue 使用 <code>.vue</code> 单文件组件（template + script + style），React 使用 <code>.tsx</code> 文件（JS/TS 中写 JSX）</li>
                    <li>Vue 的 <code>composables/</code> 对应 React 的 <code>hooks/</code></li>
                    <li>Vue 的 <code>views/</code> 对应 React 的 <code>pages/</code></li>
                    <li>Vue 通过 <code>app.use()</code> 注册插件，React 通过组件嵌套（Provider 模式）</li>
                </ul>
            </div>
        </div>
    )
}
