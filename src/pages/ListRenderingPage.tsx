import { useState } from 'react'
import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function ListRenderingPage() {
    const [items, setItems] = useState([
        { id: 1, name: '学习 React', done: false },
        { id: 2, name: '对比 Vue', done: true },
        { id: 3, name: '写项目', done: false },
    ])
    const [newItem, setNewItem] = useState('')

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, { id: Date.now(), name: newItem, done: false }])
            setNewItem('')
        }
    }

    const toggleItem = (id: number) => {
        setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item))
    }

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    return (
        <div className="page">
            <h1>列表渲染</h1>
            <p>列表渲染是前端最常见的操作之一，Vue 用 v-for 指令，React 用 Array.map()。</p>

            <h2>基本列表渲染</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: v-for 指令 -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>

  <!-- 带索引 -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>
</template>`}
                reactCode={`
// React: Array.map()
function List() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}

// 带索引
function List() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {index + 1}. {item.name}
        </li>
      ))}
    </ul>
  )
}`}
            />

            <h2>Key 的作用</h2>
            <div className="warning">
                <div className="warning-title">⚠️ Key 很重要</div>
                <p>Vue 和 React 都需要 key，原因相同：帮助虚拟 DOM diff 算法高效地更新列表。</p>
            </div>
            <CodeBlock code={`
// ✅ 使用唯一且稳定的 id
{items.map(item => <li key={item.id}>{item.name}</li>)}

// ❌ 避免使用索引作为 key（列表会增删时有 bug）
{items.map((item, index) => <li key={index}>{item.name}</li>)}

// ❌ 不要用随机数
{items.map(item => <li key={Math.random()}>{item.name}</li>)}
      `} />

            <h2>实时演示 - Todo List</h2>
            <div className="demo-area">
                <div className="demo-title">🎮 Todo List 演示</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addItem()}
                        placeholder="添加新待办..."
                        style={{ padding: '6px 12px', flex: 1, background: 'var(--code-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px' }}
                    />
                    <button onClick={addItem} style={{ padding: '6px 12px', cursor: 'pointer' }}>添加</button>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {items.map(item => (
                        <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                            <input type="checkbox" checked={item.done} onChange={() => toggleItem(item.id)} />
                            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-muted)' : 'var(--text-color)' }}>
                                {item.name}
                            </span>
                            <button onClick={() => removeItem(item.id)} style={{ padding: '2px 8px', cursor: 'pointer', color: 'red' }}>删除</button>
                        </li>
                    ))}
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>
                    共 {items.length} 项，已完成 {items.filter(i => i.done).length} 项
                </p>
            </div>

            <h2>列表的过滤和排序</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: computed 过滤 -->
<template>
  <li v-for="item in filteredItems" :key="item.id">
    {{ item.name }}
  </li>
</template>

<script setup>
import { computed } from 'vue'

const filteredItems = computed(() =>
  items.value.filter(item => item.active)
)

const sortedItems = computed(() =>
  [...items.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>`}
                reactCode={`
// React: 直接在 render 中或用 useMemo
function List({ items, filter }) {
  // 方式1: 直接计算
  const filteredItems = items.filter(item => item.active)

  // 方式2: useMemo 缓存（性能优化）
  const sortedItems = useMemo(() =>
    [...items].sort((a, b) => 
      a.name.localeCompare(b.name)
    ),
    [items]
  )

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}`}
            />

            <h2>渲染嵌套列表</h2>
            <CodeBlock code={`
interface Category {
  id: number
  name: string
  items: { id: number; name: string }[]
}

function NestedList({ categories }: { categories: Category[] }) {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
      `} />

            <h2>空列表处理</h2>
            <CodeBlock code={`
function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <div className="empty">暂无数据</div>
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 对比总结</div>
                <ul>
                    <li>Vue: <code>v-for="item in list"</code> → React: <code>{'{list.map(item => ...)}'}</code></li>
                    <li>两者都需要 <code>key</code>，规则相同</li>
                    <li>React 没有 <code>v-for</code> 的 <code>of</code> 和 <code>in</code> 区分，统一用 <code>.map()</code></li>
                    <li>Vue 的 <code>computed</code> 过滤 → React 的 <code>useMemo</code> 或直接计算</li>
                </ul>
            </div>
        </div>
    )
}
