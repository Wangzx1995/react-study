import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseEffectPage() {
    return (
        <div className="page">
            <h1>useEffect 详解</h1>
            <p>useEffect 是 React 中处理副作用的 Hook，它统一了 Vue 中 onMounted、watch、watchEffect、onUnmounted 等多个 API 的功能。</p>

            <h2>基本概念</h2>
            <p>"副作用" 是指那些不能在渲染过程中完成的操作：API 请求、DOM 操作、订阅事件、定时器等。</p>

            <CodeBlock code={`
import { useEffect } from 'react'

useEffect(() => {
  // 副作用代码（组件渲染后执行）
  
  return () => {
    // 清理函数（组件卸载前或下次 effect 执行前）
  }
}, [依赖数组])
      `} />

            <h2>三种使用模式</h2>

            <h3>模式1：每次渲染都执行（不传依赖数组）</h3>
            <CodeComparison
                vueCode={`
<!-- Vue: 没有直接对应 -->
<!-- 最接近的是 onUpdated -->
<script setup>
import { onUpdated } from 'vue'

onUpdated(() => {
  console.log('组件更新了')
})
</script>`}
                reactCode={`
// React: 不传依赖数组 = 每次渲染后都执行
useEffect(() => {
  console.log('组件渲染了')
  // 每次 state/props 变化导致重新渲染后都会执行
})
// ⚠️ 慎用！容易造成性能问题`}
            />

            <h3>模式2：只在挂载时执行一次（空依赖数组）</h3>
            <CodeComparison
                vueCode={`
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件挂载')
  fetchData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  console.log('组件卸载')
  window.removeEventListener('resize', handleResize)
})
</script>`}
                reactCode={`
// React: 空数组 = 只在挂载时执行一次
useEffect(() => {
  console.log('组件挂载')
  fetchData()
  window.addEventListener('resize', handleResize)

  // 返回清理函数 = onUnmounted
  return () => {
    console.log('组件卸载')
    window.removeEventListener('resize', handleResize)
  }
}, [])  // 空数组！`}
            />

            <h3>模式3：依赖变化时执行（指定依赖）</h3>
            <CodeComparison
                vueCode={`
<script setup>
import { ref, watch, watchEffect } from 'vue'

const userId = ref(1)

// watch: 监听特定值变化
watch(userId, (newVal, oldVal) => {
  console.log(\`userId 从 \${oldVal} 变为 \${newVal}\`)
  fetchUser(newVal)
})

// watchEffect: 自动追踪依赖
watchEffect(() => {
  // 自动追踪内部使用的响应式变量
  fetchUser(userId.value)
})
</script>`}
                reactCode={`
// React: 指定依赖数组
const [userId, setUserId] = useState(1)

// 类似 watch
useEffect(() => {
  console.log('userId 变化了:', userId)
  fetchUser(userId)
}, [userId])  // userId 变化时重新执行

// 多个依赖
useEffect(() => {
  fetchData(page, filter)
}, [page, filter])  // page 或 filter 变化时执行`}
            />

            <h2>常见使用场景</h2>
            <CodeBlock code={`
// 1. 数据获取
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(\`/api/users/\${userId}\`)
      const data = await res.json()
      setUser(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [userId])

// 2. 事件监听
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [])

// 3. 定时器
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
  return () => clearInterval(timer)
}, [])

// 4. 修改文档标题
useEffect(() => {
  document.title = \`(\${unreadCount}) 消息\`
}, [unreadCount])

// 5. localStorage 同步
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
      `} />

            <h2>清理函数的执行时机</h2>
            <CodeBlock code={`
useEffect(() => {
  console.log('effect 执行', userId)
  const subscription = subscribe(userId)
  
  return () => {
    console.log('清理', userId)
    subscription.unsubscribe()
  }
}, [userId])

// 执行顺序（userId 从 1 变为 2 时）：
// 1. "清理 1"     ← 上一次 effect 的清理函数
// 2. "effect 执行 2"  ← 新的 effect
// 
// 组件卸载时：
// "清理 2"        ← 最后一次 effect 的清理函数
      `} />

            <h2>常见陷阱</h2>
            <div className="warning">
                <div className="warning-title">⚠️ 依赖数组不正确</div>
                <CodeBlock code={`
// ❌ 遗漏依赖 - 可能导致过期闭包
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1)  // count 永远是初始值！
  }, 1000)
  return () => clearInterval(timer)
}, [])  // 缺少 count 依赖

// ✅ 使用函数式更新避免依赖
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1)  // 不依赖外部 count
  }, 1000)
  return () => clearInterval(timer)
}, [])  // 现在不需要 count 作为依赖

// ❌ 对象/数组作为依赖（每次渲染都是新引用）
useEffect(() => {
  fetchData(options)
}, [options])  // 如果 options 每次渲染都是新对象，会无限执行！

// ✅ 使用 useMemo 或具体值
useEffect(() => {
  fetchData(options)
}, [options.page, options.size])  // 使用具体原始值
        `} />
            </div>

            <div className="tip">
                <div className="tip-title">💡 Vue 对应关系总结</div>
                <ul>
                    <li><code>useEffect(fn, [])</code> = <code>onMounted</code> + <code>onUnmounted</code></li>
                    <li><code>useEffect(fn, [dep])</code> = <code>watch(dep, fn)</code></li>
                    <li><code>useEffect(fn)</code> ≈ <code>watchEffect</code>（但触发时机不同）</li>
                    <li>清理函数 = <code>onUnmounted</code> 或 watch 的 <code>onCleanup</code></li>
                </ul>
            </div>
        </div>
    )
}
