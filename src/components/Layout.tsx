import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

interface MenuItem {
    path: string
    label: string
    icon: string
}

interface MenuGroup {
    title: string
    items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
    {
        title: '快速开始',
        items: [
            { path: '/', label: '课程介绍', icon: '🏠' },
            { path: '/environment', label: '环境搭建', icon: '⚙️' },
            { path: '/project-structure', label: '项目结构', icon: '📁' },
        ],
    },
    {
        title: '核心概念',
        items: [
            { path: '/jsx', label: 'JSX 语法', icon: '📝' },
            { path: '/components', label: '组件基础', icon: '🧩' },
            { path: '/props', label: 'Props 属性', icon: '📦' },
            { path: '/state', label: 'State 状态', icon: '🔄' },
            { path: '/event-handling', label: '事件处理', icon: '🖱️' },
            { path: '/conditional-rendering', label: '条件渲染', icon: '❓' },
            { path: '/list-rendering', label: '列表渲染', icon: '📋' },
            { path: '/forms', label: '表单处理', icon: '📄' },
        ],
    },
    {
        title: 'Hooks 深入',
        items: [
            { path: '/use-state', label: 'useState', icon: '🪝' },
            { path: '/use-effect', label: 'useEffect', icon: '⚡' },
            { path: '/use-ref', label: 'useRef', icon: '🎯' },
            { path: '/use-memo', label: 'useMemo & useCallback', icon: '🧠' },
            { path: '/use-context', label: 'useContext', icon: '🌐' },
            { path: '/use-reducer', label: 'useReducer', icon: '📊' },
            { path: '/custom-hooks', label: '自定义 Hooks', icon: '🔧' },
        ],
    },
    {
        title: '进阶技巧',
        items: [
            { path: '/lifecycle', label: '生命周期对比', icon: '♻️' },
            { path: '/context-vs-provide', label: 'Context vs Provide/Inject', icon: '💉' },
            { path: '/react-router', label: 'React Router', icon: '🗺️' },
            { path: '/state-management', label: '状态管理', icon: '🏪' },
            { path: '/performance', label: '性能优化', icon: '🚀' },
            { path: '/typescript', label: 'TypeScript 结合', icon: '🔷' },
        ],
    },
    {
        title: '实战模式',
        items: [
            { path: '/patterns', label: '常用设计模式', icon: '🎨' },
            { path: '/differences-summary', label: 'React vs Vue 总结', icon: '⚖️' },
        ],
    },
]

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="layout">
            <header className="header">
                <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? '✕' : '☰'}
                </button>
                <h1 className="header-title">
                    <span className="react-icon">⚛️</span> React 学习指南
                    <span className="subtitle">— 从 Vue 到 React</span>
                </h1>
            </header>
            <div className="main-container">
                <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                    <nav className="nav">
                        {menuGroups.map((group) => (
                            <div key={group.title} className="nav-group">
                                <h3 className="nav-group-title">{group.title}</h3>
                                <ul className="nav-list">
                                    {group.items.map((item) => (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `nav-link ${isActive ? 'active' : ''}`
                                                }
                                            >
                                                <span className="nav-icon">{item.icon}</span>
                                                <span className="nav-label">{item.label}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
