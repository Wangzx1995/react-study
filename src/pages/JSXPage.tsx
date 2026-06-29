import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function JSXPage() {
    return (
        <div className="page">
            <h1>JSX 语法</h1>
            <p>JSX 是 React 最大的特点之一。如果你习惯了 Vue 的模板语法，JSX 可能需要一些时间适应，但它其实更加灵活强大。</p>

            <h2>什么是 JSX？</h2>
            <p>JSX = JavaScript + XML。它是一种语法糖，让你在 JavaScript 中直接写 HTML 结构。编译后会转换为 <code>React.createElement()</code> 调用。</p>

            <CodeBlock code={`
// JSX 写法
const element = <h1>Hello, React!</h1>

// 编译后等价于
const element = React.createElement('h1', null, 'Hello, React!')
      `} />

            <h2>核心规则</h2>

            <h3>1. 必须有唯一根元素</h3>
            <CodeComparison
                vueCode={`
<!-- Vue: template 必须有一个根元素 -->
<!-- Vue 3 支持多根节点 (Fragment) -->
<template>
  <div>元素1</div>
  <div>元素2</div>
</template>`}
                reactCode={`
// React: 使用 Fragment 或 <> 包裹
function App() {
  return (
    <>
      <div>元素1</div>
      <div>元素2</div>
    </>
  )
}`}
            />

            <h3>2. 属性命名差异</h3>
            <CodeBlock code={`
// HTML/Vue 中            →  React JSX 中
// class                  →  className
// for                    →  htmlFor
// tabindex               →  tabIndex
// onclick                →  onClick
// style="color: red"     →  style={{ color: 'red' }}

<div className="container">
  <label htmlFor="name">名字</label>
  <input id="name" tabIndex={1} />
  <p style={{ color: 'red', fontSize: '16px' }}>
    红色文字
  </p>
</div>
      `} />

            <div className="warning">
                <div className="warning-title">⚠️ 注意</div>
                <p>JSX 中所有的属性都使用 camelCase（驼峰命名），因为它们本质上是 JavaScript 对象的属性。</p>
            </div>

            <h3>3. 表达式插值</h3>
            <CodeComparison
                vueCode={`
<!-- Vue: 双花括号 -->
<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ count + 1 }}</p>
    <p>{{ user.name }}</p>
    <p>{{ isOk ? 'Yes' : 'No' }}</p>
  </div>
</template>`}
                reactCode={`
// React: 单花括号
function App() {
  return (
    <div>
      <p>{message}</p>
      <p>{count + 1}</p>
      <p>{user.name}</p>
      <p>{isOk ? 'Yes' : 'No'}</p>
    </div>
  )
}`}
            />

            <div className="tip">
                <div className="tip-title">💡 记忆技巧</div>
                <p>Vue 用 <code>{'{{ }}'}</code> 双花括号，React 用 <code>{'{}'}</code> 单花括号。花括号内都可以写任何 JS 表达式。</p>
            </div>

            <h3>4. 样式绑定</h3>
            <CodeComparison
                vueCode={`
<!-- Vue: 对象语法 -->
<template>
  <div :style="{ color: active, fontSize: size + 'px' }">
    文字
  </div>
  <div :class="{ active: isActive, 'text-danger': hasError }">
    文字
  </div>
  <div :class="[baseClass, isActive ? 'active' : '']">
    文字
  </div>
</template>`}
                reactCode={`
// React: style 必须是对象，属性用驼峰
function App() {
  return (
    <>
      <div style={{ color: active, fontSize: size + 'px' }}>
        文字
      </div>
      <div className={\`\${baseClass} \${isActive ? 'active' : ''} \${hasError ? 'text-danger' : ''}\`}>
        文字
      </div>
      {/* 或使用 clsx 库 */}
      <div className={clsx(baseClass, { active: isActive, 'text-danger': hasError })}>
        文字
      </div>
    </>
  )
}`}
            />

            <h3>5. 注释写法</h3>
            <CodeBlock code={`
function App() {
  return (
    <div>
      {/* JSX 中的注释必须用花括号包裹 */}
      <h1>标题</h1>
      {/* 
        多行注释
        也是这样写
      */}
    </div>
  )
}
      `} />

            <h3>6. 动态渲染 HTML</h3>
            <CodeComparison
                vueCode={`
<!-- Vue: v-html 指令 -->
<template>
  <div v-html="rawHtml"></div>
</template>`}
                reactCode={`
// React: dangerouslySetInnerHTML
function App() {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: rawHtml }} 
    />
  )
}
// 名字故意很长，提醒你这很危险！`}
            />

            <h2>JSX 的优势</h2>
            <ul>
                <li><strong>完整的 JavaScript 能力</strong>：可以在渲染逻辑中使用任何 JS 表达式、函数</li>
                <li><strong>类型安全</strong>：配合 TypeScript，JSX 可以获得完整的类型检查</li>
                <li><strong>灵活性</strong>：不受模板语法限制，可以自由组合逻辑和视图</li>
                <li><strong>IDE 支持</strong>：更好的代码补全、重构、跳转支持</li>
            </ul>

            <h2>从 Vue Template 到 JSX 的思维转换</h2>
            <CodeBlock code={`
// 在 Vue 中，你可能这样想：
// "我要在模板中用 v-if、v-for 这些指令来控制渲染"

// 在 React 中，你应该这样想：
// "我在写 JavaScript，JSX 只是返回 UI 描述的表达式"
// "一切都是 JavaScript，没有特殊语法"

function ProductList({ products, isLoading }) {
  // 这就是普通的 JavaScript 函数
  // 你可以用任何 JS 方式来构建你的 UI
  
  if (isLoading) {
    return <div>加载中...</div>
  }

  if (products.length === 0) {
    return <div>暂无商品</div>
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - ¥{product.price}
        </li>
      ))}
    </ul>
  )
}
      `} />
        </div>
    )
}
