import CodeBlock from '../components/CodeBlock'

export default function PatternsPage() {
    return (
        <div className="page">
            <h1>常用设计模式</h1>
            <p>React 有一些常用的设计模式，了解它们可以帮你写出更优雅的代码。</p>

            <h2>1. 容器/展示组件模式</h2>
            <CodeBlock code={`
// 展示组件：只负责 UI，通过 props 接收数据
interface UserCardProps {
  name: string
  avatar: string
  email: string
  onEdit: () => void
}

function UserCard({ name, avatar, email, onEdit }: UserCardProps) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onEdit}>编辑</button>
    </div>
  )
}

// 容器组件：负责数据获取和业务逻辑
function UserCardContainer({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => { fetchUser(userId).then(setUser) }, [userId])
  
  if (!user) return <Loading />
  
  return (
    <UserCard
      name={user.name}
      avatar={user.avatar}
      email={user.email}
      onEdit={() => navigate(\`/edit/\${userId}\`)}
    />
  )
}
      `} />

            <h2>2. 组合组件模式 (Compound Components)</h2>
            <CodeBlock code={`
// 类似 Element UI 的 <el-select> + <el-option> 模式
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list">{children}</div>
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)!
  return (
    <button className={activeTab === value ? 'active' : ''} onClick={() => setActiveTab(value)}>
      {children}
    </button>
  )
}

function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab } = useContext(TabsContext)!
  return activeTab === value ? <div>{children}</div> : null
}

// 使用（非常直观）
<Tabs defaultTab="tab1">
  <TabList>
    <Tab value="tab1">标签一</Tab>
    <Tab value="tab2">标签二</Tab>
  </TabList>
  <TabPanel value="tab1">内容一</TabPanel>
  <TabPanel value="tab2">内容二</TabPanel>
</Tabs>
      `} />

            <h2>3. Render Props 模式</h2>
            <CodeBlock code={`
// 通过函数 prop 共享逻辑（Vue 中用 scoped slot）
interface MousePosition { x: number; y: number }

function MouseTracker({ render }: { render: (pos: MousePosition) => ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return <>{render(position)}</>
}

// 使用
<MouseTracker render={({ x, y }) => (
  <p>鼠标位置: {x}, {y}</p>
)} />

// 现代替代：自定义 Hook（更推荐）
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return position
}
      `} />

            <h2>4. HOC 高阶组件</h2>
            <CodeBlock code={`
// HOC: 接收组件，返回增强后的组件
// 类似 Vue 的 mixin（但更好）

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth()
    
    if (loading) return <Loading />
    if (!isAuthenticated) return <Navigate to="/login" />
    
    return <Component {...props} />
  }
}

// 使用
const ProtectedDashboard = withAuth(Dashboard)
// <ProtectedDashboard />

// ⚠️ 现代 React 中，自定义 Hook 通常是更好的选择
// HOC 会导致组件嵌套层级增加，调试困难
      `} />

            <h2>5. 自定义 Hook 模式（最推荐）</h2>
            <CodeBlock code={`
// 自定义 Hook 是现代 React 最推荐的复用模式
// 对应 Vue 3 的 Composables

// 封装异步请求逻辑
function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    data: T | null; loading: boolean; error: Error | null
  }>({ data: null, loading: true, error: null })

  useEffect(() => {
    setState(s => ({ ...s, loading: true }))
    asyncFn()
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }))
  }, deps)

  return state
}

// 封装表单逻辑
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }))
  }

  const reset = () => { setValues(initialValues); setErrors({}) }

  return { values, errors, handleChange, setErrors, reset, setValues }
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 模式选择指南</div>
                <ul>
                    <li><strong>逻辑复用</strong> → 自定义 Hook（首选）</li>
                    <li><strong>UI 组合</strong> → Compound Components</li>
                    <li><strong>关注点分离</strong> → 容器/展示组件</li>
                    <li><strong>第三方库增强</strong> → HOC（较少使用）</li>
                    <li><strong>灵活渲染</strong> → Render Props（较少使用，Hook 替代）</li>
                </ul>
            </div>
        </div>
    )
}
