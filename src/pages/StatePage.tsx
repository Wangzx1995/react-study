import { useState } from 'react'
import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function StatePage() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('Hello')

    return (
        <div className="page">
            <h1>State 状态</h1>
            <p>状态是 React 中最核心的概念。理解 Vue 和 React 状态管理的区别是学习 React 的关键。</p>

            <h2>核心区别：响应式 vs 不可变</h2>
            <div className="warning">
                <div className="warning-title">⚠️ 最重要的区别</div>
                <p><strong>Vue</strong>：数据是响应式的，直接修改数据，视图自动更新。</p>
                <p><strong>React</strong>：数据是不可变的，必须调用 setState 产生新数据，触发重新渲染。</p>
            </div>

            <CodeComparison
                vueCode={`
<!-- Vue: 直接修改，自动更新 -->
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="count++">+1</button>
    <p>{{ user.name }}</p>
    <button @click="user.name = '李四'">
      改名
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const count = ref(0)
const user = reactive({ name: '张三', age: 25 })

// 直接修改就行！
count.value++
user.name = '李四'
</script>`}
                reactCode={`
// React: 必须用 setState，不能直接修改
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ 
    name: '张三', age: 25 
  })

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
      <p>{user.name}</p>
      <button onClick={() => setUser({
        ...user, name: '李四'
      })}>
        改名
      </button>
    </div>
  )
}
// ❌ 错误: count = count + 1
// ❌ 错误: user.name = '李四'`}
            />

            <h2>实时演示</h2>
            <div className="demo-area">
                <div className="demo-title">🎮 试试看 - 计数器</div>
                <p>当前计数: <strong style={{ color: 'var(--primary-color)', fontSize: '24px' }}>{count}</strong></p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={() => setCount(count - 1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>-1</button>
                    <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>+1</button>
                    <button onClick={() => setCount(0)} style={{ padding: '8px 16px', cursor: 'pointer' }}>重置</button>
                </div>
                <p style={{ marginTop: '12px' }}>
                    文本: <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: '4px 8px', background: 'var(--code-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px' }} />
                    <span style={{ marginLeft: '8px' }}>实时值: {text}</span>
                </p>
            </div>

            <h2>更新对象和数组</h2>
            <CodeBlock code={`
// 更新对象 - 必须创建新对象（展开运算符）
const [user, setUser] = useState({ name: '张三', age: 25 })

// ✅ 正确
setUser({ ...user, name: '李四' })

// ❌ 错误（直接修改不会触发更新）
user.name = '李四'

// 更新嵌套对象
const [form, setForm] = useState({
  name: '张三',
  address: { city: '北京', street: '长安街' }
})

setForm({
  ...form,
  address: { ...form.address, city: '上海' }
})
      `} />

            <CodeBlock code={`
// 更新数组
const [items, setItems] = useState(['苹果', '香蕉', '橘子'])

// 添加元素
setItems([...items, '葡萄'])

// 删除元素
setItems(items.filter((_, i) => i !== index))

// 修改元素
setItems(items.map((item, i) => i === index ? '新值' : item))

// 排序（先复制再排序）
setItems([...items].sort())
      `} />

            <h2>函数式更新</h2>
            <CodeBlock code={`
// 当新状态依赖旧状态时，使用函数式更新
const [count, setCount] = useState(0)

// ⚠️ 可能有问题（闭包陷阱）
function handleClick() {
  setCount(count + 1) // 基于当前渲染时的 count
  setCount(count + 1) // 还是同一个 count！结果只 +1
}

// ✅ 推荐使用函数式更新
function handleClick() {
  setCount(prev => prev + 1) // 基于最新状态
  setCount(prev => prev + 1) // 正确地 +2
}
      `} />

            <h2>批量更新</h2>
            <CodeBlock code={`
// React 18+ 自动批量更新（类似 Vue 的 nextTick 合并）
function handleClick() {
  setCount(c => c + 1)   // 不会立即重新渲染
  setName('新名字')       // 不会立即重新渲染
  setAge(26)             // 不会立即重新渲染
  // 三次更新合并为一次重新渲染！
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 心智模型对比</div>
                <ul>
                    <li><strong>Vue</strong>：像 Excel 表格——修改一个单元格，相关的公式自动重算</li>
                    <li><strong>React</strong>：像拍照片——每次 setState 就是"重新拍一张照片"（重新渲染），你告诉 React 新照片长什么样</li>
                </ul>
            </div>
        </div>
    )
}
