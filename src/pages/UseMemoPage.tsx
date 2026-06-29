import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseMemoPage() {
    return (
        <div className="page">
            <h1>useMemo & useCallback</h1>
            <p>useMemo 和 useCallback 是 React 的性能优化 Hooks，对应 Vue 中的 computed 属性。</p>

            <h2>useMemo = Vue 的 computed</h2>
            <CodeComparison
                vueCode={`
<script setup>
import { ref, computed } from 'vue'

const items = ref([1, 2, 3, 4, 5])
const filter = ref('')

// computed: 依赖不变时返回缓存值
const filteredItems = computed(() => {
  console.log('重新计算')
  return items.value.filter(
    item => item > Number(filter.value)
  )
})

const total = computed(() => {
  return items.value.reduce((sum, i) => sum + i, 0)
})
</script>`}
                reactCode={`
import { useState, useMemo } from 'react'

function App() {
  const [items] = useState([1, 2, 3, 4, 5])
  const [filter, setFilter] = useState('')

  // useMemo: 依赖不变时返回缓存值
  const filteredItems = useMemo(() => {
    console.log('重新计算')
    return items.filter(
      item => item > Number(filter)
    )
  }, [items, filter])  // 依赖数组

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i, 0)
  }, [items])

  return <div>...</div>
}`}
            />

            <h2>useMemo 语法</h2>
            <CodeBlock code={`
// useMemo(计算函数, 依赖数组) 
// 只有依赖变化时才重新计算，否则返回缓存值

const expensiveResult = useMemo(() => {
  return heavyComputation(data)
}, [data])

// 常见使用场景：
// 1. 过滤/排序大列表
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])

// 2. 复杂计算
const statistics = useMemo(() => {
  return {
    total: orders.reduce((sum, o) => sum + o.amount, 0),
    average: orders.reduce((sum, o) => sum + o.amount, 0) / orders.length,
    max: Math.max(...orders.map(o => o.amount)),
  }
}, [orders])

// 3. 创建派生对象（避免不必要的重新渲染子组件）
const contextValue = useMemo(() => ({
  user, theme, updateUser
}), [user, theme])
      `} />

            <h2>useCallback = 缓存函数引用</h2>
            <CodeBlock code={`
import { useCallback } from 'react'

// useCallback(函数, 依赖数组)
// 只有依赖变化时才创建新函数，否则返回缓存的函数

// 没有 useCallback：每次渲染都创建新函数
function Parent() {
  const handleClick = () => {
    console.log(count) // 每次渲染都是新函数
  }
  return <Child onClick={handleClick} />
}

// 有 useCallback：依赖不变时返回同一个函数引用
function Parent() {
  const handleClick = useCallback(() => {
    console.log(count)
  }, [count]) // 只有 count 变化时才创建新函数
  
  return <Child onClick={handleClick} />
}

// useCallback 实际上等价于：
// useCallback(fn, deps) === useMemo(() => fn, deps)
      `} />

            <h2>何时使用？</h2>
            <CodeBlock code={`
// ⚠️ 不要过度优化！大多数情况不需要 useMemo/useCallback

// ✅ 应该使用的场景：
// 1. 计算成本很高的操作
const sorted = useMemo(() => expensiveSort(hugeList), [hugeList])

// 2. 传给 React.memo 包裹的子组件的引用类型 props
const MemoChild = React.memo(ChildComponent)
const handleClick = useCallback(() => { ... }, [dep])
return <MemoChild onClick={handleClick} />

// 3. 作为其他 Hook 的依赖
const config = useMemo(() => ({ api, token }), [api, token])
useEffect(() => {
  fetchWithConfig(config)
}, [config])

// ❌ 不需要使用的场景：
// 1. 简单计算
const fullName = firstName + ' ' + lastName  // 不需要 useMemo

// 2. 原始值
const isActive = status === 'active'  // 不需要 useMemo

// 3. 没有传给子组件的函数
const handleClick = () => setCount(c => c + 1)  // 通常不需要 useCallback
      `} />

            <h2>与 Vue computed 的区别</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>特性</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue computed</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React useMemo</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['依赖追踪', '自动追踪', '手动声明依赖数组'],
                        ['缓存', '✅ 自动缓存', '✅ 基于依赖缓存'],
                        ['Setter', '支持 get/set', '不支持（只读）'],
                        ['使用频率', '非常高频', '按需使用（优化手段）'],
                        ['心智负担', '低', '中（需要正确声明依赖）'],
                    ].map(([feature, vue, react]) => (
                        <tr key={feature} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{feature}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="tip">
                <div className="tip-title">💡 记忆口诀</div>
                <ul>
                    <li><code>useMemo</code> → 缓存<strong>计算结果</strong>（值）</li>
                    <li><code>useCallback</code> → 缓存<strong>函数引用</strong></li>
                    <li>Vue 的 <code>computed</code> 更像 useMemo，但用起来简单得多</li>
                    <li>React 的优化是"显式可选的"，Vue 的优化是"内置自动的"</li>
                </ul>
            </div>
        </div>
    )
}
