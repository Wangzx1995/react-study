import { useState } from 'react'
import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function ConditionalRenderingPage() {
    const [show, setShow] = useState(true)
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('success')

    return (
        <div className="page">
            <h1>条件渲染</h1>
            <p>Vue 使用 v-if/v-show 指令，React 使用 JavaScript 原生的条件表达式。</p>

            <h2>基本条件渲染</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: v-if / v-else-if / v-else -->
<template>
  <div v-if="status === 'loading'">
    加载中...
  </div>
  <div v-else-if="status === 'error'">
    出错了！
  </div>
  <div v-else>
    加载成功！内容显示
  </div>
</template>`}
                reactCode={`
// React: if-else 或三元表达式
function App() {
  if (status === 'loading') {
    return <div>加载中...</div>
  }
  if (status === 'error') {
    return <div>出错了！</div>
  }
  return <div>加载成功！内容显示</div>
}

// 或使用三元运算符
function App() {
  return (
    <div>
      {status === 'loading' 
        ? <div>加载中...</div>
        : status === 'error'
        ? <div>出错了！</div>
        : <div>加载成功！</div>
      }
    </div>
  )
}`}
            />

            <h2>显示/隐藏</h2>
            <CodeComparison
                vueCode={`
<!-- Vue -->
<!-- v-if: 条件为 false 时不渲染 DOM -->
<div v-if="show">我会被销毁和重建</div>

<!-- v-show: 始终渲染，用 display 控制 -->
<div v-show="show">我只是被隐藏</div>`}
                reactCode={`
// React
// 条件渲染（等同于 v-if）
{show && <div>我会被销毁和重建</div>}

// 样式隐藏（等同于 v-show）
<div style={{ display: show ? 'block' : 'none' }}>
  我只是被隐藏
</div>`}
            />

            <h2>实时演示</h2>
            <div className="demo-area">
                <div className="demo-title">🎮 条件渲染演示</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button onClick={() => setShow(!show)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                        切换显示 ({show ? '显示中' : '隐藏中'})
                    </button>
                    <button onClick={() => setStatus('loading')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Loading</button>
                    <button onClick={() => setStatus('success')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Success</button>
                    <button onClick={() => setStatus('error')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Error</button>
                </div>
                {show && <p style={{ color: 'var(--primary-color)' }}>这个元素可以切换显示</p>}
                <p style={{ marginTop: '8px' }}>
                    当前状态: {status === 'loading' && '⏳ 加载中...'}
                    {status === 'success' && '✅ 加载成功！'}
                    {status === 'error' && '❌ 出错了！'}
                </p>
            </div>

            <h2>&& 短路运算符</h2>
            <CodeBlock code={`
// 常用的条件渲染写法
function Notification({ count }: { count: number }) {
  return (
    <div>
      {/* count > 0 时显示 */}
      {count > 0 && <span className="badge">{count}</span>}
      
      {/* 有消息时显示 */}
      {messages.length > 0 && (
        <ul>
          {messages.map(msg => <li key={msg.id}>{msg.text}</li>)}
        </ul>
      )}
    </div>
  )
}
      `} />

            <div className="warning">
                <div className="warning-title">⚠️ && 的陷阱</div>
                <CodeBlock code={`
// ❌ 当 count 为 0 时，会渲染 "0" 而不是不渲染
{count && <span>{count}</span>}
// 因为 0 && anything = 0，0 是有效的 JSX 会被渲染

// ✅ 正确写法
{count > 0 && <span>{count}</span>}
// 或
{count ? <span>{count}</span> : null}
        `} />
            </div>

            <h2>多条件：对象映射模式</h2>
            <CodeBlock code={`
// 对于多个条件，可以用对象映射代替 switch/if-else
type Status = 'idle' | 'loading' | 'success' | 'error'

const statusComponents: Record<Status, React.ReactNode> = {
  idle: <p>等待操作...</p>,
  loading: <Spinner />,
  success: <SuccessMessage />,
  error: <ErrorMessage />,
}

function StatusDisplay({ status }: { status: Status }) {
  return <div>{statusComponents[status]}</div>
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 思维模型</div>
                <p>Vue 的条件指令是"声明式"的：<code>v-if="condition"</code>。React 是"表达式式"的：直接用 JS 逻辑控制渲染什么。没有特殊语法，全是 JavaScript。</p>
            </div>
        </div>
    )
}
