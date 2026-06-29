import { useState } from 'react'
import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function FormsPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', framework: 'react' })

    return (
        <div className="page">
            <h1>表单处理</h1>
            <p>表单是 Vue 和 React 差异最大的地方之一。Vue 有 v-model 双向绑定，React 使用"受控组件"模式。</p>

            <h2>核心概念：受控组件</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: v-model 双向绑定 -->
<template>
  <input v-model="name" />
  <p>你好, {{ name }}</p>
  
  <!-- v-model 本质是语法糖 -->
  <input 
    :value="name" 
    @input="name = $event.target.value" 
  />
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
</script>`}
                reactCode={`
// React: 受控组件（手动双向绑定）
import { useState } from 'react'

function App() {
  const [name, setName] = useState('')

  return (
    <>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>你好, {name}</p>
    </>
  )
}
// React 没有 v-model！
// 必须同时设置 value 和 onChange`}
            />

            <div className="tip">
                <div className="tip-title">💡 关键理解</div>
                <p>React 的受控组件 = Vue 的 <code>:value</code> + <code>@input</code>。只是 Vue 用 <code>v-model</code> 把这两步合成了一步。React 认为"显式比隐式好"。</p>
            </div>

            <h2>实时演示</h2>
            <div className="demo-area">
                <div className="demo-title">🎮 表单演示</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label>
                        姓名: <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ padding: '4px 8px', marginLeft: '8px', background: 'var(--code-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px' }} />
                    </label>
                    <label>
                        邮箱: <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ padding: '4px 8px', marginLeft: '8px', background: 'var(--code-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px' }} />
                    </label>
                    <label>
                        框架:
                        <select value={formData.framework} onChange={(e) => setFormData({ ...formData, framework: e.target.value })} style={{ padding: '4px 8px', marginLeft: '8px', background: 'var(--code-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px' }}>
                            <option value="react">React</option>
                            <option value="vue">Vue</option>
                            <option value="angular">Angular</option>
                        </select>
                    </label>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        表单数据: {JSON.stringify(formData)}
                    </p>
                </div>
            </div>

            <h2>各种表单元素</h2>
            <CodeBlock code={`
function Form() {
  const [form, setForm] = useState({
    name: '',
    age: 0,
    bio: '',
    gender: 'male',
    agree: false,
    hobbies: [] as string[],
    city: '',
  })

  return (
    <form>
      {/* 文本输入 */}
      <input
        type="text"
        value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
      />

      {/* 数字输入 */}
      <input
        type="number"
        value={form.age}
        onChange={e => setForm({...form, age: Number(e.target.value)})}
      />

      {/* 文本域 */}
      <textarea
        value={form.bio}
        onChange={e => setForm({...form, bio: e.target.value})}
      />

      {/* 单选框 */}
      <label>
        <input
          type="radio"
          value="male"
          checked={form.gender === 'male'}
          onChange={e => setForm({...form, gender: e.target.value})}
        /> 男
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={form.gender === 'female'}
          onChange={e => setForm({...form, gender: e.target.value})}
        /> 女
      </label>

      {/* 复选框 - 单个 */}
      <label>
        <input
          type="checkbox"
          checked={form.agree}
          onChange={e => setForm({...form, agree: e.target.checked})}
        /> 同意条款
      </label>

      {/* 下拉框 */}
      <select
        value={form.city}
        onChange={e => setForm({...form, city: e.target.value})}
      >
        <option value="">请选择</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
      </select>
    </form>
  )
}
      `} />

            <h2>表单提交</h2>
            <CodeBlock code={`
function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.username) newErrors.username = '用户名不能为空'
    if (form.password.length < 6) newErrors.password = '密码至少6位'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // 阻止默认提交
    if (validate()) {
      console.log('提交:', form)
      // 调用 API...
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={form.username}
          onChange={e => setForm({...form, username: e.target.value})}
          placeholder="用户名"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          placeholder="密码"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">登录</button>
    </form>
  )
}
      `} />

            <h2>非受控组件（useRef）</h2>
            <CodeBlock code={`
import { useRef } from 'react'

// 非受控组件：用 ref 获取 DOM 值（不推荐，但有时更简单）
function UncontrolledForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(inputRef.current?.value)  // 直接读取 DOM
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="初始值" />
      <button type="submit">提交</button>
    </form>
  )
}
// 注意用 defaultValue 而不是 value
      `} />

            <div className="tip">
                <div className="tip-title">💡 Vue vs React 表单总结</div>
                <ul>
                    <li><code>v-model</code> = <code>value</code> + <code>onChange</code>（受控组件）</li>
                    <li>React 更啰嗦但更明确：你始终清楚数据流向</li>
                    <li>推荐使用 <strong>react-hook-form</strong> 或 <strong>formik</strong> 库简化复杂表单</li>
                </ul>
            </div>
        </div>
    )
}
