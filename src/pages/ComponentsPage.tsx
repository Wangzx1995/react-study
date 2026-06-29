import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function ComponentsPage() {
    return (
        <div className="page">
            <h1>组件基础</h1>
            <p>React 和 Vue 都是基于组件的框架，但组件的定义方式有很大区别。</p>

            <h2>组件定义方式</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: 单文件组件 (.vue) -->
<template>
  <div class="greeting">
    <h1>{{ title }}</h1>
    <p>欢迎来到 {{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello')
const name = ref('Vue')
</script>

<style scoped>
.greeting { color: green; }
</style>`}
                reactCode={`
// React: 函数组件 (.tsx)
import { useState } from 'react'
import './Greeting.css'

function Greeting() {
  const [title] = useState('Hello')
  const [name] = useState('React')

  return (
    <div className="greeting">
      <h1>{title}</h1>
      <p>欢迎来到 {name}</p>
    </div>
  )
}

export default Greeting`}
            />

            <div className="tip">
                <div className="tip-title">💡 核心区别</div>
                <p>Vue 将模板、逻辑、样式分成三个区块；React 将它们合为一个 JS/TS 函数，"一切都是 JavaScript"。</p>
            </div>

            <h2>组件导入与使用</h2>
            <CodeComparison
                vueCode={`
<!-- Vue 3 script setup 自动注册 -->
<template>
  <div>
    <Header />
    <Sidebar />
    <Content />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
</script>`}
                reactCode={`
// React: 导入后直接使用
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  )
}

export default App`}
            />

            <h2>组件命名规则</h2>
            <ul>
                <li><strong>Vue</strong>：组件名推荐 PascalCase 或 kebab-case，文件名 <code>.vue</code></li>
                <li><strong>React</strong>：组件名<strong>必须</strong>大写开头（PascalCase），否则会被识别为 HTML 标签</li>
            </ul>
            <CodeBlock code={`
// ✅ 正确 - 大写开头
function MyButton() { return <button>按钮</button> }
<MyButton />

// ❌ 错误 - 小写开头会被当成 HTML 标签
function myButton() { return <button>按钮</button> }
<myButton /> // React 会尝试渲染 <mybutton> HTML 标签
      `} />

            <h2>组件的多种写法</h2>
            <CodeBlock code={`
// 1. 函数声明（推荐）
function Welcome() {
  return <h1>Hello</h1>
}

// 2. 箭头函数
const Welcome = () => {
  return <h1>Hello</h1>
}

// 3. 箭头函数 + 隐式返回
const Welcome = () => <h1>Hello</h1>

// 4. 带类型注解的组件
import { FC } from 'react'

interface WelcomeProps {
  name: string
}

const Welcome: FC<WelcomeProps> = ({ name }) => {
  return <h1>Hello, {name}</h1>
}

// 5. 推荐写法（不用 FC，直接标注 props）
function Welcome({ name }: WelcomeProps) {
  return <h1>Hello, {name}</h1>
}
      `} />

            <h2>组件的组合</h2>
            <CodeBlock code={`
// React 鼓励通过组合来复用组件
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  )
}

// 使用 - children 类似 Vue 的默认插槽
function App() {
  return (
    <Card title="用户信息">
      <p>姓名：张三</p>
      <p>年龄：25</p>
    </Card>
  )
}
      `} />

            <h2>Vue 的插槽 vs React 的 children 和 render props</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: 默认插槽 & 具名插槽 -->
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<!-- 使用 -->
<Card>
  <template #header>
    <h3>标题</h3>
  </template>
  <p>内容</p>
  <template #footer>
    <button>确定</button>
  </template>
</Card>`}
                reactCode={`
// React: props 传递不同区域的内容
interface CardProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

function Card({ header, footer, children }: CardProps) {
  return (
    <div className="card">
      {header && <div className="header">{header}</div>}
      <div className="body">{children}</div>
      {footer && <div className="footer">{footer}</div>}
    </div>
  )
}

// 使用
<Card
  header={<h3>标题</h3>}
  footer={<button>确定</button>}
>
  <p>内容</p>
</Card>`}
            />

            <div className="tip">
                <div className="tip-title">💡 思维转换</div>
                <p>Vue 的"插槽"概念在 React 中不存在。React 中一切都是 props，<code>children</code> 是一个特殊的 prop，代表组件标签内的内容。而"具名插槽"对应的就是传递不同的 ReactNode 类型的 props。</p>
            </div>
        </div>
    )
}
