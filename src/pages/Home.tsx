export default function Home() {
    return (
        <div className="page">
            <h1>从 Vue 到 React：快速上手指南</h1>
            <p>欢迎来到 React 学习之旅！本教程专为有 Vue 2/3 开发经验的开发者设计，帮助你快速理解 React 的核心概念和开发模式。</p>

            <h2>为什么学 React？</h2>
            <ul>
                <li><strong>市场需求大</strong>：React 在全球范围内拥有最大的市场份额和社区生态</li>
                <li><strong>灵活性强</strong>：React 只关注视图层，给开发者更多架构选择的自由</li>
                <li><strong>生态丰富</strong>：Next.js、React Native 等延伸技术栈非常成熟</li>
                <li><strong>就业优势</strong>：掌握 React + Vue 双技能，竞争力翻倍</li>
            </ul>

            <h2>React vs Vue 核心思想对比</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>特性</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'var(--react-color)' }}>React</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['模板语法', 'HTML 模板 + 指令', 'JSX (JavaScript + XML)'],
                        ['响应式原理', 'Proxy 自动追踪依赖', '手动调用 setState 触发更新'],
                        ['组件定义', 'SFC (.vue 文件)', '函数组件 (.tsx 文件)'],
                        ['状态管理', 'ref / reactive', 'useState / useReducer'],
                        ['副作用', 'watch / watchEffect', 'useEffect'],
                        ['计算属性', 'computed', 'useMemo'],
                        ['生命周期', 'onMounted / onUpdated...', 'useEffect 统一处理'],
                        ['双向绑定', 'v-model (内置)', '受控组件 (手动实现)'],
                        ['样式方案', 'Scoped CSS / CSS Modules', 'CSS Modules / CSS-in-JS'],
                        ['路由', 'Vue Router', 'React Router'],
                        ['状态库', 'Pinia / Vuex', 'Redux / Zustand / Jotai'],
                    ].map(([feature, vue, react]) => (
                        <tr key={feature} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '10px 12px', fontWeight: 500 }}>{feature}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--vue-color)' }}>{vue}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--react-color)' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>学习路线图</h2>
            <div style={{ background: 'rgba(97,218,251,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <ol>
                    <li><strong>环境搭建</strong> → 了解 Vite + React + TypeScript 项目结构</li>
                    <li><strong>JSX 语法</strong> → 从模板到 JSX 的思维转换</li>
                    <li><strong>组件 & Props</strong> → React 组件化开发基础</li>
                    <li><strong>State 状态</strong> → 理解 React 的状态管理理念</li>
                    <li><strong>Hooks</strong> → 掌握 React 的核心能力</li>
                    <li><strong>进阶模式</strong> → 路由、状态管理、性能优化</li>
                    <li><strong>实战总结</strong> → 设计模式与最佳实践</li>
                </ol>
            </div>

            <div className="tip" style={{ marginTop: '24px' }}>
                <div className="tip-title">💡 学习建议</div>
                <p style={{ margin: 0 }}>
                    作为 Vue 开发者，你已经具备了组件化思维和响应式编程的基础。
                    学习 React 时，重点关注<strong>思维模式的转换</strong>：从"自动响应式"到"手动状态更新"，
                    从"模板指令"到"JSX 表达式"。每个章节都会有 Vue 对比，帮助你建立知识映射。
                </p>
            </div>
        </div>
    )
}
