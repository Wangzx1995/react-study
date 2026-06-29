import CodeBlock from '../components/CodeBlock'

export default function LifecyclePage() {
    return (
        <div className="page">
            <h1>生命周期对比</h1>
            <p>Vue 有明确的生命周期钩子，React 函数组件用 useEffect 统一处理。理解两者的映射关系是关键。</p>

            <h2>生命周期映射表</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>阶段</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue 3</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React Hooks</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['组件创建', 'setup() / <script setup>', '函数体本身'],
                        ['挂载后', 'onMounted', 'useEffect(() => {}, [])'],
                        ['更新后', 'onUpdated', 'useEffect(() => {})（无依赖数组）'],
                        ['依赖变化', 'watch(dep, fn)', 'useEffect(() => {}, [dep])'],
                        ['卸载前', 'onUnmounted', 'useEffect return 清理函数'],
                        ['错误捕获', 'onErrorCaptured', 'ErrorBoundary（类组件）'],
                        ['首次渲染前', 'onBeforeMount', '无直接对应'],
                        ['更新前', 'onBeforeUpdate', '无直接对应（用 useRef 记录）'],
                        ['卸载前', 'onBeforeUnmount', 'useEffect return'],
                    ].map(([phase, vue, react]) => (
                        <tr key={phase + vue} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 500 }}>{phase}</td>
                            <td style={{ padding: '8px 10px', color: 'var(--vue-color)' }}>{vue}</td>
                            <td style={{ padding: '8px 10px', color: 'var(--react-color)' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>详细对比示例</h2>

            <h3>组件挂载</h3>
            <CodeBlock code={`
// Vue
onMounted(() => {
  console.log('组件已挂载，DOM 可用')
  fetchData()
  initThirdPartyLib()
})

// React 等效
useEffect(() => {
  console.log('组件已挂载，DOM 可用')
  fetchData()
  initThirdPartyLib()
}, [])  // 空数组 = 只执行一次 = onMounted
      `} />

            <h3>监听数据变化</h3>
            <CodeBlock code={`
// Vue
const userId = ref(1)
watch(userId, (newVal, oldVal) => {
  console.log(\`变化: \${oldVal} → \${newVal}\`)
  fetchUser(newVal)
}, { immediate: true })  // immediate = 首次也执行

// React 等效
const [userId, setUserId] = useState(1)
const prevUserId = useRef(userId)

useEffect(() => {
  // 首次也会执行（相当于 immediate: true）
  console.log(\`变化: \${prevUserId.current} → \${userId}\`)
  fetchUser(userId)
  prevUserId.current = userId
}, [userId])
      `} />

            <h3>组件卸载</h3>
            <CodeBlock code={`
// Vue
onMounted(() => {
  window.addEventListener('resize', handleResize)
  const timer = setInterval(tick, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  clearInterval(timer)
})

// React: 挂载和卸载逻辑放在一起（更内聚）
useEffect(() => {
  // 挂载
  window.addEventListener('resize', handleResize)
  const timer = setInterval(tick, 1000)

  // 卸载（return 清理函数）
  return () => {
    window.removeEventListener('resize', handleResize)
    clearInterval(timer)
  }
}, [])
      `} />

            <h2>React 函数组件的执行模型</h2>
            <CodeBlock code={`
function MyComponent({ userId }) {
  // ① 每次渲染都执行（相当于 setup/computed）
  console.log('render')
  const fullName = firstName + ' ' + lastName

  // ② 渲染后执行，有依赖控制
  useEffect(() => {
    console.log('mounted or userId changed')
    return () => console.log('cleanup')
  }, [userId])

  // ③ 渲染后执行，只一次
  useEffect(() => {
    console.log('mounted only')
    return () => console.log('unmounted')
  }, [])

  // ④ 返回 JSX（相当于 template）
  return <div>{fullName}</div>
}

// 首次渲染：① → render → ②③
// userId 变化：① → render → ②的 cleanup → ②
// 卸载：②的 cleanup → ③的 cleanup
      `} />

            <h2>关键思维差异</h2>
            <div className="tip">
                <div className="tip-title">💡 思维模型</div>
                <ul>
                    <li><strong>Vue</strong>: "生命周期是一个时间线，我在不同时间点挂钩子"</li>
                    <li><strong>React</strong>: "组件是一个函数，每次渲染就是调用一次函数。useEffect 是在渲染后执行的副作用"</li>
                    <li>React 没有 beforeMount/beforeUpdate 等"之前"的钩子，因为函数体本身就是在渲染之前执行的</li>
                    <li>React 鼓励把相关的挂载/卸载逻辑放在同一个 useEffect 里，比 Vue 的分散更好维护</li>
                </ul>
            </div>

            <div className="warning">
                <div className="warning-title">⚠️ 常见误区</div>
                <p>不要把 React 函数组件的函数体当成 Vue 的 <code>setup()</code>。Vue 的 setup 只执行一次，而 React 的函数组件每次渲染都重新执行整个函数体。</p>
            </div>
        </div>
    )
}
