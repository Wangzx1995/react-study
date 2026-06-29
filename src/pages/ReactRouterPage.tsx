import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function ReactRouterPage() {
    return (
        <div className="page">
            <h1>React Router</h1>
            <p>React Router 是 React 生态中最流行的路由库，对应 Vue Router。两者概念相似但 API 风格不同。</p>

            <h2>安装与基本配置</h2>
            <CodeComparison
                vueCode={`
// Vue Router 配置
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user/:id', component: User },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})

export default router

// main.ts
app.use(router)`}
                reactCode={`
// React Router 配置
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`}
            />

            <h2>导航方式</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: router-link & useRouter -->
<template>
  <router-link to="/">首页</router-link>
  <router-link :to="{ name: 'user', params: { id: 1 } }">
    用户
  </router-link>
  <button @click="goBack">返回</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
const goToUser = (id) => router.push(\`/user/\${id}\`)
</script>`}
                reactCode={`
// React: Link & useNavigate
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()

  return (
    <>
      <Link to="/">首页</Link>
      <Link to={\`/user/1\`}>用户</Link>
      <button onClick={() => navigate(-1)}>返回</button>
      <button onClick={() => navigate('/user/1')}>
        去用户页
      </button>
      <button onClick={() => navigate('/login', { replace: true })}>
        替换到登录页
      </button>
    </>
  )
}`}
            />

            <h2>获取路由参数</h2>
            <CodeComparison
                vueCode={`
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
// 路径参数
const userId = route.params.id
// 查询参数
const page = route.query.page
// 监听路由变化
watch(() => route.params.id, (newId) => {
  fetchUser(newId)
})
</script>`}
                reactCode={`
import { useParams, useSearchParams } from 'react-router-dom'

function User() {
  // 路径参数
  const { id } = useParams<{ id: string }>()
  // 查询参数
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')

  // 监听参数变化
  useEffect(() => {
    fetchUser(id)
  }, [id])

  return <div>用户 {id}，第 {page} 页</div>
}`}
            />

            <h2>嵌套路由</h2>
            <CodeBlock code={`
// React Router 嵌套路由
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// Layout 中用 <Outlet /> 渲染子路由（类似 Vue 的 <router-view />）
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />  {/* 子路由渲染位置 */}
    </div>
  )
}
      `} />

            <h2>路由守卫</h2>
            <CodeBlock code={`
// Vue 有 beforeEach 全局守卫，React 没有
// React 通过组件包裹实现保护

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading />
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

// 使用
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
      `} />

            <h2>对比总结</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>功能</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue Router</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React Router</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['链接组件', '<router-link>', '<Link>'],
                        ['路由出口', '<router-view>', '<Outlet>'],
                        ['编程导航', 'useRouter().push()', 'useNavigate()'],
                        ['路由参数', 'useRoute().params', 'useParams()'],
                        ['路由守卫', 'beforeEach/beforeEnter', '组件包裹模式'],
                        ['路由配置', '集中式配置', 'JSX 声明式'],
                    ].map(([feat, vue, react]) => (
                        <tr key={feat} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{feat}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
