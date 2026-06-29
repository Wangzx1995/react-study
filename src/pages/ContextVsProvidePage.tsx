import CodeBlock from '../components/CodeBlock'

export default function ContextVsProvidePage() {
    return (
        <div className="page">
            <h1>Context vs Provide/Inject</h1>
            <p>深入对比 React Context 和 Vue provide/inject 的设计哲学和使用场景。</p>

            <h2>设计哲学</h2>
            <ul>
                <li><strong>Vue provide/inject</strong>：简洁直观，API 最小化，支持响应式</li>
                <li><strong>React Context</strong>：显式创建、显式提供、显式消费，更可控</li>
            </ul>

            <h2>完整对比示例：认证系统</h2>
            <CodeBlock code={`
// ============ React Context 实现 ============
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查 token，恢复登录状态
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserProfile(token).then(setUser).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { user, token } = await loginAPI(email, password)
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
      `} />

            <CodeBlock code={`
// ============ Vue provide/inject 实现 ============
// composables/useAuth.ts
import { ref, computed, provide, inject, onMounted } from 'vue'
import type { InjectionKey, Ref } from 'vue'

interface User { id: string; name: string; email: string }

interface AuthContext {
  user: Ref<User | null>
  isAuthenticated: Ref<boolean>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: Ref<boolean>
}

const AuthKey: InjectionKey<AuthContext> = Symbol('auth')

// 提供者（在 App.vue 中调用）
export function provideAuth() {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const isAuthenticated = computed(() => !!user.value)

  onMounted(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      user.value = await fetchUserProfile(token)
    }
    loading.value = false
  })

  const login = async (email: string, password: string) => {
    const result = await loginAPI(email, password)
    localStorage.setItem('token', result.token)
    user.value = result.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    user.value = null
  }

  provide(AuthKey, { user, isAuthenticated, login, logout, loading })
}

// 消费者
export function useAuth() {
  const auth = inject(AuthKey)
  if (!auth) throw new Error('useAuth requires provideAuth')
  return auth
}
      `} />

            <h2>性能考虑</h2>
            <div className="warning">
                <div className="warning-title">⚠️ React Context 的性能陷阱</div>
                <CodeBlock code={`
// ❌ 问题：value 每次渲染都是新对象，导致所有消费者重渲染
function Provider({ children }) {
  const [user, setUser] = useState(null)
  // 每次 Provider 重渲染，value 都是新对象！
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ 解决：用 useMemo 缓存 value
function Provider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, login, logout }), [user])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ 更好：拆分 state 和 dispatch 到不同 Context
const StateContext = createContext(null)
const DispatchContext = createContext(null)
// 这样更新 dispatch 不会影响只读 state 的消费者
        `} />
            </div>

            <div className="tip">
                <div className="tip-title">💡 Vue 的优势</div>
                <p>Vue 的 provide/inject 不存在这个问题，因为 Vue 的响应式系统会自动追踪依赖，只有实际使用的值变化时才会更新对应组件。React 需要手动优化这一点。</p>
            </div>
        </div>
    )
}
