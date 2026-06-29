import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseRefPage() {
    return (
        <div className="page">
            <h1>useRef 详解</h1>
            <p>useRef 在 React 中有两个主要用途：访问 DOM 元素和存储不触发重新渲染的可变值。</p>

            <h2>对比 Vue 的 ref</h2>
            <div className="warning">
                <div className="warning-title">⚠️ 名字相同但概念不同</div>
                <p>Vue 的 <code>ref()</code> 是响应式数据。React 的 <code>useRef()</code> 是"不触发渲染的容器"。</p>
            </div>

            <h2>用途1：访问 DOM 元素</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: template ref -->
<template>
  <input ref="inputRef" />
  <button @click="focusInput">聚焦</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})

function focusInput() {
  inputRef.value?.focus()
}
</script>`}
                reactCode={`
// React: useRef 获取 DOM
import { useRef, useEffect } from 'react'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>聚焦</button>
    </>
  )
}`}
            />

            <h2>用途2：存储可变值（不触发重新渲染）</h2>
            <CodeBlock code={`
// useRef 可以存储任何值，修改 .current 不会触发重新渲染
// 类似于 class 组件中的实例属性

// 1. 存储定时器 ID
function Timer() {
  const timerRef = useRef<number | null>(null)
  const [seconds, setSeconds] = useState(0)

  const start = () => {
    timerRef.current = window.setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    return () => stop() // 组件卸载时清理
  }, [])

  return (
    <div>
      <p>{seconds} 秒</p>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
    </div>
  )
}
      `} />

            <CodeBlock code={`
// 2. 记录上一次的值
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  
  useEffect(() => {
    ref.current = value
  }, [value])
  
  return ref.current
}

// 使用
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  
  return (
    <p>当前: {count}, 上一次: {prevCount}</p>
  )
}
      `} />

            <CodeBlock code={`
// 3. 避免 useEffect 首次执行
function useUpdateEffect(effect: () => void, deps: any[]) {
  const isFirstRender = useRef(true)
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return effect()
  }, deps)
}

// 4. 获取最新的 props/state（解决闭包问题）
function Chat({ message }: { message: string }) {
  const messageRef = useRef(message)
  messageRef.current = message  // 每次渲染都更新

  const sendWithDelay = () => {
    setTimeout(() => {
      // 使用 ref 获取最新值，而不是闭包中的旧值
      alert(messageRef.current)
    }, 3000)
  }

  return <button onClick={sendWithDelay}>发送</button>
}
      `} />

            <h2>useRef vs useState 对比</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>特性</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>useState</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>useRef</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['触发重渲染', '✅ 是', '❌ 否'],
                        ['用途', '渲染相关数据', '不影响渲染的数据/DOM引用'],
                        ['读取', 'state 变量', 'ref.current'],
                        ['更新', 'setState()', 'ref.current = value'],
                        ['渲染中使用', '✅ 安全', '⚠️ 不应在渲染中读取(DOM ref)'],
                    ].map(([feature, state, ref]) => (
                        <tr key={feature} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{feature}</td>
                            <td style={{ padding: '8px 10px' }}>{state}</td>
                            <td style={{ padding: '8px 10px' }}>{ref}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="tip">
                <div className="tip-title">💡 何时用 useRef</div>
                <ul>
                    <li>需要操作 DOM（focus、scroll、测量尺寸等）</li>
                    <li>存储不需要触发重新渲染的值（timer id、前一个值等）</li>
                    <li>解决闭包陷阱（获取最新的 state/props）</li>
                    <li>与第三方 DOM 库集成</li>
                </ul>
            </div>
        </div>
    )
}
