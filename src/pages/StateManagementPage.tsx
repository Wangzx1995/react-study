import CodeBlock from '../components/CodeBlock'

export default function StateManagementPage() {
    return (
        <div className="page">
            <h1>状态管理</h1>
            <p>对比 Vue 生态（Vuex/Pinia）和 React 生态的状态管理方案。</p>

            <h2>React 状态管理方案概览</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>方案</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>适用场景</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>类似 Vue</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['useState', '组件内简单状态', 'ref/reactive'],
                        ['useReducer', '组件内复杂状态', '组件内逻辑'],
                        ['Context + useReducer', '中小型全局状态', 'provide/inject'],
                        ['Zustand', '轻量全局状态（推荐）', 'Pinia'],
                        ['Redux Toolkit', '大型复杂应用', 'Vuex'],
                        ['Jotai', '原子化状态', 'Vue 响应式'],
                        ['React Query/SWR', '服务端状态管理', 'Vue Query'],
                    ].map(([solution, scene, vue]) => (
                        <tr key={solution} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 500 }}>{solution}</td>
                            <td style={{ padding: '8px 10px' }}>{scene}</td>
                            <td style={{ padding: '8px 10px', color: 'var(--vue-color)' }}>{vue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Zustand（推荐 - 最像 Pinia）</h2>
            <CodeBlock code={`
// Zustand: 最简洁的状态管理库（对标 Pinia）
// npm install zustand

import { create } from 'zustand'

// 定义 store（类似 Pinia defineStore）
interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  incrementBy: (amount: number) => void
  reset: () => void
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
  reset: () => set({ count: 0 }),
}))

// 在组件中使用（和 Pinia 一样简单！）
function Counter() {
  const { count, increment, decrement } = useCounterStore()
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}

// 也可以选择性订阅（性能优化）
function DisplayCount() {
  const count = useCounterStore((state) => state.count)
  return <p>{count}</p>  // 只在 count 变化时重渲染
}
      `} />

            <h2>Zustand 异步操作</h2>
            <CodeBlock code={`
interface TodoStore {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/todos')
      const todos = await res.json()
      set({ todos, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  addTodo: async (title) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    })
    const newTodo = await res.json()
    set({ todos: [...get().todos, newTodo] })
  },
}))
      `} />

            <h2>对比 Pinia</h2>
            <CodeBlock code={`
// ============ Pinia 写法 ============
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
  }),
  getters: {
    completedCount: (state) => state.todos.filter(t => t.done).length,
  },
  actions: {
    async fetchTodos() {
      this.loading = true
      this.todos = await fetch('/api/todos').then(r => r.json())
      this.loading = false
    },
  },
})

// ============ Zustand 等效写法 ============
import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  // getter 用派生值或在组件中 useMemo
  get completedCount() {
    return get().todos.filter(t => t.done).length
  },
  fetchTodos: async () => {
    set({ loading: true })
    const todos = await fetch('/api/todos').then(r => r.json())
    set({ todos, loading: false })
  },
}))
      `} />

            <h2>React Query（服务端状态）</h2>
            <CodeBlock code={`
// React Query / TanStack Query
// 专门管理服务端状态（API 数据）
// npm install @tanstack/react-query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function TodoList() {
  // 查询数据（自动缓存、重试、后台更新）
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json()),
  })

  // 变更操作
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (title: string) => 
      fetch('/api/todos', { method: 'POST', body: JSON.stringify({ title }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (isLoading) return <Spinner />
  if (error) return <Error />

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  )
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 推荐选择</div>
                <ul>
                    <li><strong>小项目</strong>：useState + useContext 足够</li>
                    <li><strong>中型项目</strong>：Zustand（最接近 Pinia 的体验）</li>
                    <li><strong>大型项目</strong>：Zustand + React Query（分离客户端和服务端状态）</li>
                    <li><strong>团队项目</strong>：Redux Toolkit（最成熟，社区最大）</li>
                </ul>
            </div>
        </div>
    )
}
