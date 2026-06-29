import CodeBlock from '../components/CodeBlock'

export default function Environment() {
    return (
        <div className="page">
            <h1>环境搭建</h1>
            <p>本节介绍如何从零开始搭建一个 React + TypeScript 项目，并对比 Vue 项目的创建方式。</p>

            <h2>创建项目</h2>
            <h3>Vue 项目（你熟悉的方式）</h3>
            <CodeBlock language="bash" code={`
# Vue 3 + Vite
npm create vite@latest my-vue-app -- --template vue-ts
# 或使用 Vue CLI
vue create my-vue-app
      `} />

            <h3>React 项目（新方式）</h3>
            <CodeBlock language="bash" code={`
# React + Vite（推荐）
npm create vite@latest my-react-app -- --template react-ts

# 或使用 Create React App（已不推荐）
npx create-react-app my-react-app --template typescript

# 或使用 Next.js（全栈框架）
npx create-next-app@latest my-next-app --typescript
      `} />

            <div className="tip">
                <div className="tip-title">💡 推荐方案</div>
                <p>2024 年及以后，推荐使用 <strong>Vite + React + TypeScript</strong> 的组合。这与你使用 Vue + Vite 的体验非常相似。</p>
            </div>

            <h2>安装依赖</h2>
            <CodeBlock language="bash" code={`
cd my-react-app
npm install

# 常用依赖
npm install react-router-dom    # 路由（类似 vue-router）
npm install axios               # HTTP 请求
npm install zustand             # 状态管理（类似 pinia）
      `} />

            <h2>启动开发服务器</h2>
            <CodeBlock language="bash" code={`
npm run dev
# 默认访问 http://localhost:5173
      `} />

            <h2>开发工具</h2>
            <ul>
                <li><strong>VS Code 插件</strong>：ES7+ React/Redux/React-Native snippets</li>
                <li><strong>浏览器插件</strong>：React Developer Tools（类似 Vue Devtools）</li>
                <li><strong>TypeScript</strong>：React 对 TS 有一流支持，与 Vue 3 类似</li>
            </ul>

            <h2>对比总结</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>工具</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--vue-color)' }}>Vue</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: 'var(--react-color)' }}>React</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['脚手架', 'create-vue / Vue CLI', 'Vite / CRA / Next.js'],
                        ['构建工具', 'Vite', 'Vite'],
                        ['开发者工具', 'Vue Devtools', 'React DevTools'],
                        ['类型支持', 'Vue 3 + TS', 'React + TS（原生支持）'],
                        ['热更新', 'Vite HMR', 'Vite HMR / Fast Refresh'],
                    ].map(([tool, vue, react]) => (
                        <tr key={tool} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{tool}</td>
                            <td style={{ padding: '8px 10px' }}>{vue}</td>
                            <td style={{ padding: '8px 10px' }}>{react}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
