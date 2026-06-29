import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseContextPage() {
    return (
        <div className="page">
            <h1>useContext</h1>
            <p>useContext 是 React 的跨组件通信方案，对应 Vue 的 provide/inject。</p>

            <h2>基本用法</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: provide/inject -->
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<!-- 后代组件（任意层级） -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
</script>

<template>
  <div :class="theme">
    <button @click="toggleTheme">切换</button>
  </div>
</template>`}
                reactCode={`
// React: createContext + Provider + useContext
import { createContext, useContext, useState } from 'react'

// 1. 创建 Context
interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | null>(null)

// 2. Provider 组件（祖先）
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. 消费组件（后代）
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)!
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>切换</button>
    </div>
  )
}`}
            />

            <h2>完整示例：主题系统</h2>
            <CodeBlock code={`
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 自定义 Hook 封装（推荐模式）
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Provider 组件
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
      `} />

            <CodeBlock code={`
// App.tsx - 使用 Provider 包裹
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

// 任何子组件 - 使用 useTheme
import { useTheme } from './contexts/ThemeContext'

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        当前主题: {theme}
      </button>
    </header>
  )
}
      `} />

            <h2>多个 Context 组合</h2>
            <CodeBlock code={`
// 多个 Provider 嵌套
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

// 可以封装一个统一的 Providers 组件
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
      `} />

            <h2>Context vs Props 钻取</h2>
            <div className="tip">
                <div className="tip-title">💡 何时使用 Context</div>
                <ul>
                    <li><strong>使用 Context</strong>：主题、用户认证、语言偏好等"全局"数据</li>
                    <li><strong>使用 Props</strong>：组件间的直接通信（1-2 层）</li>
                    <li><strong>注意</strong>：Context 变化会导致所有消费组件重新渲染，不要滥用</li>
                </ul>
            </div>

            <h2>Vue provide/inject vs React Context</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>对比项</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue provide/inject</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React Context</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['定义方式', 'provide(key, value)', 'createContext + Provider'],
                        ['使用方式', 'inject(key)', 'useContext(Context)'],
                        ['类型安全', '需要 InjectionKey', '泛型自带类型'],
                        ['默认值', 'inject 第二个参数', 'createContext 参数'],
                        ['响应式', '传入 ref 即可', '需要在 Provider value 传递'],
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
