import CodeBlock, { CodeComparison } from '../components/CodeBlock'

export default function UseReducerPage() {
    return (
        <div className="page">
            <h1>useReducer</h1>
            <p>useReducer 是 useState 的增强版，适合管理复杂状态逻辑。类似 Vuex/Pinia 的 actions 模式。</p>

            <h2>基本语法</h2>
            <CodeComparison
                vueCode={`
<!-- Vue: Pinia store -->
// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() { this.count++ },
    decrement() { this.count-- },
    incrementBy(amount: number) {
      this.count += amount
    },
    reset() { this.count = 0 },
  },
})

// 组件中使用
const store = useCounterStore()
store.increment()
store.incrementBy(5)`}
                reactCode={`
// React: useReducer
import { useReducer } from 'react'

// 定义 state 类型和 action 类型
interface State { count: number }
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'incrementBy'; payload: number }
  | { type: 'reset' }

// reducer 函数（纯函数）
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'incrementBy':
      return { count: state.count + action.payload }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

// 使用
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'incrementBy', payload: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}`}
            />

            <h2>复杂表单示例</h2>
            <CodeBlock code={`
interface FormState {
  name: string
  email: string
  age: number
  errors: Record<string, string>
  isSubmitting: boolean
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string | number }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_END' }
  | { type: 'RESET' }

const initialState: FormState = {
  name: '', email: '', age: 0, errors: {}, isSubmitting: false
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } }
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true }
    case 'SUBMIT_END':
      return { ...state, isSubmitting: false }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleSubmit = async () => {
    dispatch({ type: 'CLEAR_ERRORS' })
    dispatch({ type: 'SUBMIT_START' })
    // ... 验证和提交逻辑
    dispatch({ type: 'SUBMIT_END' })
  }

  return (
    <form>
      <input
        value={state.name}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      {state.errors.name && <span>{state.errors.name}</span>}
    </form>
  )
}
      `} />

            <h2>useReducer + useContext = 全局状态</h2>
            <CodeBlock code={`
// 类似 Vuex/Pinia 的全局状态管理
const StateContext = createContext<State | null>(null)
const DispatchContext = createContext<React.Dispatch<Action> | null>(null)

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

// 自定义 hook
function useAppState() {
  const state = useContext(StateContext)
  if (!state) throw new Error('must be within AppProvider')
  return state
}

function useAppDispatch() {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) throw new Error('must be within AppProvider')
  return dispatch
}
      `} />

            <h2>useState vs useReducer</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>场景</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>useState</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>useReducer</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ['简单状态', '✅ 推荐', '过度设计'],
                        ['复杂对象状态', '可以', '✅ 推荐'],
                        ['多个相关状态', '需要多个 useState', '✅ 统一管理'],
                        ['状态转换逻辑复杂', '处理函数臃肿', '✅ reducer 清晰'],
                        ['可测试性', '一般', '✅ reducer 是纯函数，易测试'],
                    ].map(([scene, useState, useReducer]) => (
                        <tr key={scene} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px 10px' }}>{scene}</td>
                            <td style={{ padding: '8px 10px' }}>{useState}</td>
                            <td style={{ padding: '8px 10px' }}>{useReducer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="tip">
                <div className="tip-title">💡 总结</div>
                <p>useReducer 的模式和 Vuex/Redux 一致：<strong>state + action + reducer</strong>。区别是它是组件级别的，结合 Context 才能变成全局的。对于中小型项目，useReducer + Context 完全可以替代 Redux。</p>
            </div>
        </div>
    )
}
