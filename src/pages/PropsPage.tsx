import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function PropsPage() {
    return (
        <div className="page">
            <h1>Props 属性</h1>
            <p>Props 是组件间通信的主要方式，Vue 和 React 的概念相似但语法不同。</p>

            <h2>基本用法</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: defineProps -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <span>数量: {{ count }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  count: number
}

const props = withDefaults(defineProps<Props>(), {
  description: '默认描述'
})
</script>

<!-- 使用 -->
<MyComponent 
  title="你好" 
  :count="5" 
/>`}
                reactCode={`
// React: 函数参数解构
interface Props {
  title: string
  description?: string
  count: number
}

function MyComponent({ 
  title, 
  description = '默认描述', 
  count 
}: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>数量: {count}</span>
    </div>
  )
}

// 使用
<MyComponent 
  title="你好" 
  count={5} 
/>`}
            />

            <h2>Props 传递规则</h2>
            <CodeBlock code={`
// 1. 字符串可以直接传
<Button text="点击我" />

// 2. 非字符串用花括号
<Button count={42} />
<Button isActive={true} />
<Button items={['a', 'b', 'c']} />
<Button user={{ name: '张三', age: 25 }} />

// 3. 布尔值简写（true 时可省略值）
<Button disabled />  // 等同于 disabled={true}

// 4. 展开运算符传递所有 props
const buttonProps = { text: '提交', disabled: false, type: 'primary' }
<Button {...buttonProps} />

// 5. 传递函数
<Button onClick={() => console.log('clicked')} />
      `} />

            <h2>Props 是只读的</h2>
            <div className="warning">
                <div className="warning-title">⚠️ 重要原则</div>
                <p>Vue 和 React 都遵循"单向数据流"：Props 从父传子，子组件<strong>不能直接修改</strong> props。</p>
            </div>
            <CodeBlock code={`
// ❌ 错误：不能修改 props
function Counter({ count }: { count: number }) {
  count = count + 1 // TypeScript 不会报错但这是错误做法
  return <span>{count}</span>
}

// ✅ 正确：通过回调通知父组件修改
function Counter({ count, onIncrement }: { 
  count: number
  onIncrement: () => void 
}) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={onIncrement}>+1</button>
    </div>
  )
}

// 父组件
function Parent() {
  const [count, setCount] = useState(0)
  return <Counter count={count} onIncrement={() => setCount(c => c + 1)} />
}
      `} />

            <h2>子传父：事件 vs 回调函数</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: emit 事件 -->
<!-- Child.vue -->
<template>
  <button @click="handleClick">点击</button>
</template>

<script setup>
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()

function handleClick() {
  emit('update', '新值')
}
</script>

<!-- Parent.vue -->
<Child 
  @update="handleUpdate" 
  @delete="handleDelete" 
/>`}
                reactCode={`
// React: 回调函数（没有 emit 概念）
interface ChildProps {
  onUpdate: (value: string) => void
  onDelete: (id: number) => void
}

function Child({ onUpdate, onDelete }: ChildProps) {
  function handleClick() {
    onUpdate('新值')
  }

  return <button onClick={handleClick}>点击</button>
}

// Parent
function Parent() {
  const handleUpdate = (val: string) => {
    console.log(val)
  }
  const handleDelete = (id: number) => {
    console.log(id)
  }
  
  return (
    <Child 
      onUpdate={handleUpdate} 
      onDelete={handleDelete} 
    />
  )
}`}
            />

            <div className="tip">
                <div className="tip-title">💡 核心区别</div>
                <p>Vue 有"事件"的概念（emit），React 没有。React 中子传父就是<strong>调用父组件通过 props 传下来的函数</strong>。本质上更简单直接。</p>
            </div>

            <h2>children prop</h2>
            <CodeBlock code={`
// children 是一个特殊的 prop
// 对应 Vue 中的默认插槽 <slot />
interface ContainerProps {
  children: React.ReactNode  // 可以是任何可渲染内容
}

function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      {children}
    </div>
  )
}

// 使用：标签之间的内容就是 children
<Container>
  <h1>标题</h1>
  <p>这些内容会作为 children 传入</p>
</Container>
      `} />
        </div>
    )
}
