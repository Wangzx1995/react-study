import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function CustomHooksPage() {
    return (
        <div className="page">
            <h1>自定义 Hooks</h1>
            <p>自定义 Hooks 是 React 复用逻辑的核心方式，直接对应 Vue 3 的 Composables。</p>

            <h2>基本概念</h2>
            <CodeComparison
                vueCode={`
// Vue: composable (composables/useCounter.ts)
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count, doubled, increment, decrement, reset }
}

// 使用
const { count, doubled, increment } = useCounter(10)`}
                reactCode={`
// React: custom hook (hooks/useCounter.ts)
import { useState, useMemo, useCallback } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const doubled = useMemo(() => count * 2, [count])

  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, doubled, increment, decrement, reset }
}

// 使用
const { count, doubled, increment } = useCounter(10)`}
            />

            <div className="tip">
                <div className="tip-title">💡 核心规则</div>
                <ul>
                    <li>自定义 Hook 必须以 <code>use</code> 开头（这是规则不是建议）</li>
                    <li>内部可以使用任何其他 Hook</li>
                    <li>每次调用都是独立的状态实例</li>
                    <li>Vue 的 composable 也是 <code>use</code> 开头，两者概念完全对应</li>
                </ul>
            </div>

            <h2>实用 Hooks 示例</h2>

            <h3>1. useLocalStorage</h3>
            <CodeBlock code={`
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue] as const
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'dark')
      `} />

            <h3>2. useFetch</h3>
            <CodeBlock code={`
interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network error')
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// 使用
function UserProfile({ id }: { id: string }) {
  const { data: user, loading, error } = useFetch<User>(\`/api/users/\${id}\`)
  
  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <div>{user?.name}</div>
}
      `} />

            <h3>3. useDebounce</h3>
            <CodeBlock code={`
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 使用
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
      `} />

            <h3>4. useToggle</h3>
            <CodeBlock code={`
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}

// 使用
function Modal() {
  const { value: isOpen, toggle, setFalse: close } = useToggle()
  
  return (
    <>
      <button onClick={toggle}>打开弹窗</button>
      {isOpen && <Dialog onClose={close} />}
    </>
  )
}
      `} />

            <h3>5. useWindowSize</h3>
            <CodeBlock code={`
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// 使用
function ResponsiveLayout() {
  const { width } = useWindowSize()
  return width > 768 ? <DesktopLayout /> : <MobileLayout />
}
      `} />

            <h2>Vue Composables vs React Hooks 对比</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>对比项</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue Composables</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React Custom Hooks</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['调用限制', '无限制', '只能在组件顶层调用'],
                        ['响应式', '自动追踪', '需要依赖数组'],
                        ['执行时机', '只执行一次', '每次渲染都执行'],
                        ['返回值', '响应式 ref/reactive', '普通值（每次渲染新的）'],
                        ['解构', '解构后保持响应式(toRefs)', '解构后就是当前值'],
                    ].map(([item, vue, react]) => (
                        <tr key={item} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{item}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
