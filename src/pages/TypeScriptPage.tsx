import CodeBlock from '../components/CodeBlock'

export default function TypeScriptPage() {
    return (
        <div className="page">
            <h1>TypeScript 结合</h1>
            <p>React 对 TypeScript 的支持非常好，甚至比 Vue 更原生。这里总结 React + TS 的常用模式。</p>

            <h2>组件 Props 类型</h2>
            <CodeBlock code={`
// 1. interface 定义 props（推荐）
interface ButtonProps {
  text: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick: () => void
  children?: React.ReactNode
}

function Button({ text, variant = 'primary', size = 'md', disabled, onClick, children }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`} disabled={disabled} onClick={onClick}>
      {children || text}
    </button>
  )
}

// 2. 扩展 HTML 元素属性
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}
// 自动拥有所有 <input> 的属性：type, placeholder, onChange 等
      `} />

            <h2>常用类型</h2>
            <CodeBlock code={`
// React 常用类型速查
import { ReactNode, FC, Dispatch, SetStateAction, RefObject } from 'react'

// ReactNode: 可渲染的任何内容
interface Props {
  children: ReactNode  // string | number | JSX | null | undefined | Array
}

// 事件类型
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {}
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {}

// State setter 类型
interface Props {
  setCount: Dispatch<SetStateAction<number>>
  // 等同于 (value: number | ((prev: number) => number)) => void
}

// Ref 类型
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)

// Style 类型
const style: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}
      `} />

            <h2>Hooks 类型</h2>
            <CodeBlock code={`
// useState
const [count, setCount] = useState<number>(0)
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<string[]>([])

// useRef
const ref = useRef<HTMLInputElement>(null)
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

// useReducer
type Action = 
  | { type: 'increment' }
  | { type: 'set'; payload: number }

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + 1
    case 'set': return action.payload
  }
}
const [state, dispatch] = useReducer(reducer, 0)

// createContext
interface ThemeContext {
  theme: 'light' | 'dark'
  toggle: () => void
}
const ThemeContext = createContext<ThemeContext | undefined>(undefined)

// 自定义 Hook 返回类型
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}
      `} />

            <h2>泛型组件</h2>
            <CodeBlock code={`
// 泛型组件：适用于列表、选择器等通用组件
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string
  onItemClick?: (item: T) => void
}

function List<T>({ items, renderItem, keyExtractor, onItemClick }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)} onClick={() => onItemClick?.(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// 使用时自动推导类型
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}  // user 自动推导为 User 类型
  keyExtractor={(user) => user.id}
  onItemClick={(user) => navigate(\`/user/\${user.id}\`)}
/>
      `} />

            <h2>对比 Vue + TS</h2>
            <CodeBlock code={`
// Vue 3 + TS（需要 defineProps 泛型语法）
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

// React + TS（更自然，因为本身就是 TS 函数）
interface Props {
  title: string
  count?: number
  onUpdate: (value: string) => void
}
function MyComponent({ title, count = 0, onUpdate }: Props) {
  return <div>{title} - {count}</div>
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 总结</div>
                <p>React + TypeScript 的体验比 Vue + TypeScript 更加原生自然，因为 React 组件本身就是 TypeScript 函数。Props 就是函数参数，返回值就是 JSX。不需要额外的编译器魔法（如 defineProps）。</p>
            </div>
        </div>
    )
}
