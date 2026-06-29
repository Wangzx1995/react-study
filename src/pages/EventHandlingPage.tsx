import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function EventHandlingPage() {
    return (
        <div className="page">
            <h1>事件处理</h1>
            <p>React 的事件处理和 Vue 类似，但有一些语法和概念上的差异。</p>

            <h2>基本语法对比</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: @ 或 v-on 绑定事件 -->
<template>
  <button @click="handleClick">点击</button>
  <button @click="count++">+1</button>
  <input @input="handleInput" />
  <form @submit.prevent="handleSubmit">
    ...
  </form>
</template>

<script setup>
function handleClick() {
  console.log('clicked')
}
function handleInput(e) {
  console.log(e.target.value)
}
function handleSubmit() {
  console.log('submitted')
}
</script>`}
                reactCode={`
// React: on + 事件名（驼峰）
function App() {
  function handleClick() {
    console.log('clicked')
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // 手动阻止默认行为
    console.log('submitted')
  }

  return (
    <>
      <button onClick={handleClick}>点击</button>
      <button onClick={() => setCount(c => c+1)}>+1</button>
      <input onChange={handleInput} />
      <form onSubmit={handleSubmit}>
        ...
      </form>
    </>
  )
}`}
            />

            <h2>事件修饰符对比</h2>
            <p>Vue 提供了很多方便的事件修饰符，React 需要手动在事件处理函数中实现。</p>
            <CodeBlock code={`
// Vue 的修饰符       →  React 的等效写法

// .prevent 阻止默认
// @click.prevent     →  onClick={(e) => { e.preventDefault(); ... }}

// .stop 阻止冒泡
// @click.stop        →  onClick={(e) => { e.stopPropagation(); ... }}

// .once 只触发一次（React 没有直接支持，需要自己实现）
// @click.once        →  用 state 或 ref 控制

// .self 只在自身触发
// @click.self        →  onClick={(e) => { if (e.target === e.currentTarget) ... }}

// 按键修饰符
// @keyup.enter       →  onKeyUp={(e) => { if (e.key === 'Enter') ... }}
// @keyup.esc         →  onKeyUp={(e) => { if (e.key === 'Escape') ... }}
      `} />

            <h2>传递参数</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: 直接传参 -->
<template>
  <button @click="handleDelete(item.id)">
    删除
  </button>
  <button @click="handleClick($event, item.id)">
    点击
  </button>
  <li v-for="item in list" :key="item.id"
    @click="selectItem(item)">
    {{ item.name }}
  </li>
</template>`}
                reactCode={`
// React: 用箭头函数包裹
function App() {
  return (
    <>
      <button onClick={() => handleDelete(item.id)}>
        删除
      </button>
      <button onClick={(e) => handleClick(e, item.id)}>
        点击
      </button>
      {list.map(item => (
        <li key={item.id}
          onClick={() => selectItem(item)}>
          {item.name}
        </li>
      ))}
    </>
  )
}`}
            />

            <div className="warning">
                <div className="warning-title">⚠️ 常见错误</div>
                <CodeBlock code={`
// ❌ 错误：这会在渲染时立即调用函数！
<button onClick={handleDelete(item.id)}>删除</button>

// ✅ 正确：传递一个函数引用
<button onClick={() => handleDelete(item.id)}>删除</button>

// ✅ 如果不需要传参，直接传函数引用
<button onClick={handleClick}>点击</button>
        `} />
            </div>

            <h2>合成事件 (SyntheticEvent)</h2>
            <CodeBlock code={`
// React 使用合成事件系统，封装了浏览器原生事件
// 提供了跨浏览器的一致性接口

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.clientX, e.clientY) // 鼠标位置
  console.log(e.target)            // 触发事件的元素
  console.log(e.currentTarget)     // 绑定事件的元素
  e.preventDefault()               // 阻止默认行为
  e.stopPropagation()              // 阻止冒泡
}

// 常用事件类型
// React.MouseEvent      - 鼠标事件
// React.KeyboardEvent   - 键盘事件
// React.ChangeEvent     - 表单变化事件
// React.FormEvent       - 表单提交事件
// React.FocusEvent      - 焦点事件
// React.DragEvent       - 拖拽事件
      `} />

            <h2>事件命名规范</h2>
            <CodeBlock code={`
// React 事件命名约定：
// 1. 事件处理函数以 handle 开头
// 2. Props 中的事件回调以 on 开头

interface ButtonProps {
  onClick: () => void     // prop: on + 事件名
  onHover?: () => void
}

function Button({ onClick, onHover }: ButtonProps) {
  const handleClick = () => {  // handler: handle + 事件名
    // 内部逻辑
    onClick()
  }

  return <button onClick={handleClick} onMouseEnter={onHover}>按钮</button>
}
      `} />

            <div className="tip">
                <div className="tip-title">💡 总结</div>
                <ul>
                    <li>Vue 用 <code>@event</code> 和修饰符，React 用 <code>onEvent</code> 和手动处理</li>
                    <li>React 事件名是驼峰的：<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code></li>
                    <li>传参时用箭头函数包裹，不要直接调用</li>
                    <li>React 的事件类型在 TypeScript 中有完整定义</li>
                </ul>
            </div>
        </div>
    )
}
