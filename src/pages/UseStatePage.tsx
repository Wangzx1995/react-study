import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseStatePage() {
    return (
        <div className="page">
            <h1>useState 详解</h1>
            <p>useState 是 React 最基础的 Hook，等同于 Vue 的 ref/reactive。</p>

            <h2>基本语法</h2>
            <CodeComparison
                vueCode={`
<script setup>
import { ref, reactive } from 'vue'

// 基本类型用 ref
const count = ref(0)
const name = ref('张三')

// 对象类型用 reactive
const user = reactive({
  name: '张三',
  age: 25
})

// 修改
count.value++
name.value = '李四'
user.name = '李四'
</script>`}
                reactCode={`
import { useState } from 'react'

function App() {
  // useState 返回 [当前值, 更新函数]
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')
  const [user, setUser] = useState({
    name: '张三',
    age: 25
  })

  // 修改
  setCount(count + 1)
  setName('李四')
  setUser({ ...user, name: '李四' })
  
  return <div>...</div>
}`}
            />

            <h2>初始化方式</h2>
            <CodeBlock code={`
// 1. 直接传值
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [list, setList] = useState<string[]>([])

// 2. 惰性初始化（函数形式）
// 当初始值计算成本较高时使用
const [data, setData] = useState(() => {
  // 这个函数只在首次渲染时执行
  return expensiveComputation()
})

// 3. 带泛型指定类型
interface User {
  id: number
  name: string
  email: string
}
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<User[]>([])
      `} />

            <h2>更新模式</h2>
            <CodeBlock code={`
// 模式1: 直接设置新值
setCount(5)
setName('新名字')

// 模式2: 函数式更新（基于前一个状态）
setCount(prev => prev + 1)
setItems(prev => [...prev, newItem])
setUser(prev => prev ? { ...prev, name: '新名字' } : null)

// ⚠️ 什么时候用函数式更新？
// - 当新值依赖旧值时
// - 在事件处理中多次更新同一状态时
// - 在 useEffect/setTimeout 等异步回调中
      `} />

            <h2>常见模式</h2>
            <CodeBlock code={`
// Toggle 模式
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(prev => !prev)

// 计数器模式
const [count, setCount] = useState(0)
const increment = () => setCount(prev => prev + 1)
const decrement = () => setCount(prev => prev - 1)
const reset = () => setCount(0)

// 表单状态模式
const [form, setForm] = useState({ name: '', email: '' })
const updateField = (field: string, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }))
}

// 数组操作模式
const [todos, setTodos] = useState<Todo[]>([])
const addTodo = (todo: Todo) => setTodos(prev => [...prev, todo])
const removeTodo = (id: number) => setTodos(prev => prev.filter(t => t.id !== id))
const updateTodo = (id: number, updates: Partial<Todo>) => {
  setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
}
      `} />

            <h2>注意事项</h2>
            <div className="warning">
                <div className="warning-title">⚠️ useState 的规则</div>
                <CodeBlock code={`
// 1. 只能在组件顶层调用（不能在 if/for/嵌套函数中）
// ❌ 错误
function App() {
  if (condition) {
    const [state, setState] = useState(0) // 错误！
  }
}

// 2. useState 不会合并对象（不像 class 组件的 this.setState）
const [user, setUser] = useState({ name: '张三', age: 25 })
setUser({ name: '李四' })  // ❌ age 丢失了！
setUser({ ...user, name: '李四' })  // ✅ 需要手动展开

// 3. state 更新是异步的，不能立即读取新值
setCount(count + 1)
console.log(count)  // 还是旧值！

// 4. 对象/数组必须创建新引用才能触发更新
const arr = [...items]  // 创建新数组
arr.push(newItem)
setItems(arr)
        `} />
            </div>

            <div className="tip">
                <div className="tip-title">💡 Vue vs React 状态心智模型</div>
                <p><strong>Vue</strong>: "我修改数据，框架自动帮我更新视图"（数据驱动）</p>
                <p><strong>React</strong>: "我告诉 React 新状态是什么，React 重新渲染组件"（声明式）</p>
                <p>Vue 像是在操作数据库，React 像是在画快照。</p>
            </div>
        </div>
    )
}
