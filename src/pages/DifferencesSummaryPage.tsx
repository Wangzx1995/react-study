export default function DifferencesSummaryPage() {
    return (
        <div className="page">
            <h1>React vs Vue 总结对照表</h1>
            <p>完整的 Vue 到 React 概念映射，方便快速查阅。</p>

            <h2>核心概念映射</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: '14px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>概念</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue 写法</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React 写法</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['模板/视图', 'template', 'JSX (return)'],
                        ['文本插值', '{{ value }}', '{value}'],
                        ['属性绑定', ':attr="value"', 'attr={value}'],
                        ['事件绑定', '@click="handler"', 'onClick={handler}'],
                        ['双向绑定', 'v-model', 'value + onChange'],
                        ['条件渲染', 'v-if / v-else', '{cond && <A/>} 或三元'],
                        ['显示隐藏', 'v-show', 'style={{ display }}'],
                        ['列表渲染', 'v-for', 'array.map()'],
                        ['class 绑定', ':class="{ active }"', 'className={clsx(...)}'],
                        ['style 绑定', ':style="{ color }"', 'style={{ color }}'],
                        ['ref/DOM', 'ref="el"', 'ref={elRef}'],
                        ['原始 HTML', 'v-html', 'dangerouslySetInnerHTML'],
                        ['组件定义', '.vue SFC', '函数组件 .tsx'],
                        ['Props', 'defineProps', '函数参数解构'],
                        ['事件/回调', 'defineEmits + emit', 'props 回调函数'],
                        ['默认插槽', '<slot />', 'children prop'],
                        ['具名插槽', '<slot name="x" />', '命名 props (ReactNode)'],
                        ['作用域插槽', '<slot :data="x" />', 'render props / 函数 children'],
                        ['响应式数据', 'ref() / reactive()', 'useState()'],
                        ['计算属性', 'computed()', 'useMemo()'],
                        ['侦听器', 'watch() / watchEffect()', 'useEffect()'],
                        ['生命周期-挂载', 'onMounted', 'useEffect(fn, [])'],
                        ['生命周期-卸载', 'onUnmounted', 'useEffect return'],
                        ['DOM ref', 'ref<HTMLElement>', 'useRef<HTMLElement>'],
                        ['跨组件通信', 'provide/inject', 'Context + useContext'],
                        ['路由', 'Vue Router', 'React Router'],
                        ['路由链接', '<router-link>', '<Link>'],
                        ['路由视图', '<router-view>', '<Outlet>'],
                        ['状态管理', 'Pinia / Vuex', 'Zustand / Redux'],
                        ['组合逻辑复用', 'Composables', 'Custom Hooks'],
                        ['CSS 作用域', 'scoped style', 'CSS Modules / styled'],
                        ['动画', '<Transition>', 'framer-motion / react-spring'],
                        ['异步组件', 'defineAsyncComponent', 'React.lazy + Suspense'],
                        ['错误边界', 'onErrorCaptured', 'ErrorBoundary (class)'],
                        ['Teleport', '<Teleport>', 'createPortal()'],
                        ['Keep-alive', '<KeepAlive>', '无内置（手动缓存）'],
                    ].map(([concept, vue, react]) => (
                        <tr key={concept} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 500 }}>{concept}</td>
                            <td style={{ padding: '8px 10px' }}><code>{vue}</code></td>
                            <td style={{ padding: '8px 10px' }}><code>{react}</code></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>思维模式对比</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>维度</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue 的哲学</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React 的哲学</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['数据更新', '可变数据 + 自动追踪', '不可变数据 + 手动触发'],
                        ['模板 vs JSX', '声明式模板（有约束）', 'JSX = JS 的全部能力'],
                        ['API 风格', '大而全的框架', '小而灵活的库'],
                        ['学习曲线', '渐进式，上手快', '概念少但理解深'],
                        ['优化策略', '编译时自动优化', '运行时手动优化'],
                        ['社区生态', '官方统一方案', '社区百花齐放'],
                        ['设计理念', '"让开发者少写代码"', '"显式优于隐式"'],
                    ].map(([dim, vue, react]) => (
                        <tr key={dim} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 500 }}>{dim}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>各自优势</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
                <div style={{ border: '1px solid var(--vue-color)', borderRadius: '8px', padding: '16px' }}>
                    <h3 style={{ color: 'var(--vue-color)', marginTop: 0 }}>Vue 的优势</h3>
                    <ul>
                        <li>上手更快，API 直观</li>
                        <li>响应式系统自动优化</li>
                        <li>单文件组件结构清晰</li>
                        <li>官方统一解决方案</li>
                        <li>模板编译优化</li>
                        <li>v-model 等便利语法糖</li>
                        <li>中文社区友好</li>
                    </ul>
                </div>
                <div style={{ border: '1px solid var(--react-color)', borderRadius: '8px', padding: '16px' }}>
                    <h3 style={{ color: 'var(--react-color)', marginTop: 0 }}>React 的优势</h3>
                    <ul>
                        <li>JSX 灵活度极高</li>
                        <li>TypeScript 体验更好</li>
                        <li>生态系统最大最活跃</li>
                        <li>React Native 跨平台</li>
                        <li>Hooks 模式强大灵活</li>
                        <li>社区解决方案丰富</li>
                        <li>大厂广泛使用</li>
                    </ul>
                </div>
            </div>

            <h2>从 Vue 转 React 的建议</h2>
            <div className="tip">
                <div className="tip-title">💡 转型建议</div>
                <ol>
                    <li><strong>接受不同</strong>：不要试图在 React 中找 Vue 的影子，拥抱 React 的方式</li>
                    <li><strong>理解重渲染</strong>：React 组件会频繁重新执行，这是正常的</li>
                    <li><strong>拥抱不可变</strong>：永远不要直接修改 state，创建新对象/数组</li>
                    <li><strong>善用 Hook</strong>：自定义 Hook 是 React 复用逻辑的核心方式</li>
                    <li><strong>不要过早优化</strong>：先让代码工作，再用 memo/useMemo 优化</li>
                    <li><strong>多写项目</strong>：最好的学习方式就是动手做一个真实项目</li>
                </ol>
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px', padding: '32px', background: 'rgba(97,218,251,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ color: 'var(--primary-color)', marginTop: 0 }}>恭喜你完成学习! 🎉</h2>
                <p>你已经掌握了 React 的核心概念。现在开始动手做项目吧！</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>推荐练手项目：Todo App → 博客系统 → 电商后台 → 全栈项目</p>
            </div>
        </div>
    )
}
