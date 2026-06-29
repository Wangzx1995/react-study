import CodeBlock from '../components/CodeBlock'

export default function PerformancePage() {
    return (
        <div className="page">
            <h1>性能优化</h1>
            <p>Vue 的性能优化大部分是自动的，React 需要开发者主动优化。了解这些差异很重要。</p>

            <h2>Vue vs React 性能模型</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>方面</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['更新粒度', '组件级精确更新', '组件树重新渲染'],
                        ['优化方式', '框架自动优化', '开发者手动优化'],
                        ['不必要渲染', '基本不存在', '默认会发生'],
                        ['缓存', 'computed 自动缓存', 'useMemo 手动缓存'],
                        ['组件跳过', '自动（依赖追踪）', 'React.memo 手动'],
                    ].map(([aspect, vue, react]) => (
                        <tr key={aspect} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 500 }}>{aspect}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>React.memo - 组件缓存</h2>
            <CodeBlock code={`
// React.memo: 当 props 没变化时，跳过重新渲染
// 类似 Vue 组件默认的行为

import { memo } from 'react'

// 没有 memo: 父组件每次渲染，子组件都跟着渲染
function ExpensiveList({ items }: { items: Item[] }) {
  console.log('渲染了！')  // 每次父组件更新都会打印
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
}

// 有 memo: props 相同时跳过渲染
const ExpensiveList = memo(function ExpensiveList({ items }: { items: Item[] }) {
  console.log('渲染了！')  // 只在 items 真正变化时打印
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
})

// 自定义比较函数
const ExpensiveList = memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.items.length === nextProps.items.length
})
      `} />

            <h2>useMemo & useCallback</h2>
            <CodeBlock code={`
function SearchResults({ query, filters }: Props) {
  // ✅ 缓存昂贵计算
  const filteredResults = useMemo(() => {
    return results.filter(r => matchesFilters(r, filters))
  }, [results, filters])

  // ✅ 缓存传给 memo 子组件的回调
  const handleSelect = useCallback((id: string) => {
    setSelected(id)
  }, [])

  // ✅ 缓存传给子组件的对象
  const contextValue = useMemo(() => ({
    query, filters, handleSelect
  }), [query, filters, handleSelect])

  return (
    <SearchContext.Provider value={contextValue}>
      <MemoizedResultList items={filteredResults} onSelect={handleSelect} />
    </SearchContext.Provider>
  )
}
      `} />

            <h2>代码分割 & 懒加载</h2>
            <CodeBlock code={`
import { lazy, Suspense } from 'react'

// 路由级别懒加载（类似 Vue Router 的 () => import()）
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}

// 对比 Vue Router
// { path: '/dashboard', component: () => import('./views/Dashboard.vue') }
      `} />

            <h2>虚拟列表</h2>
            <CodeBlock code={`
// 大列表优化：只渲染可视区域的元素
// npm install @tanstack/react-virtual

import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div key={virtualItem.key}
            style={{ position: 'absolute', top: virtualItem.start, height: virtualItem.size }}>
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
      `} />

            <h2>避免不必要的重渲染</h2>
            <CodeBlock code={`
// 1. 状态下移（把状态放到需要的组件里）
// ❌ 
function App() {
  const [input, setInput] = useState('')  // 输入变化导致整个 App 重渲染
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <ExpensiveTree />  {/* 不必要的重渲染 */}
    </div>
  )
}

// ✅ 
function App() {
  return (
    <div>
      <SearchInput />    {/* 状态封装在内部 */}
      <ExpensiveTree />  {/* 不受影响 */}
    </div>
  )
}

// 2. 内容提升（children 模式）
function App() {
  return (
    <ScrollTracker>      {/* 内部有频繁更新的状态 */}
      <ExpensiveTree />  {/* 作为 children 传入，不重渲染 */}
    </ScrollTracker>
  )
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 性能优化原则</div>
                <ol>
                    <li><strong>先测量再优化</strong>：使用 React DevTools Profiler 定位问题</li>
                    <li><strong>减少渲染范围</strong>：状态下移、组件拆分</li>
                    <li><strong>跳过渲染</strong>：React.memo + useMemo + useCallback</li>
                    <li><strong>延迟渲染</strong>：懒加载、虚拟列表、useDeferredValue</li>
                    <li><strong>不要过早优化</strong>：大多数组件不需要 memo</li>
                </ol>
            </div>
        </div>
    )
}
