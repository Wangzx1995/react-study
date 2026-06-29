import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Environment from './pages/Environment'
import ProjectStructure from './pages/ProjectStructure'
import JSXPage from './pages/JSXPage'
import ComponentsPage from './pages/ComponentsPage'
import PropsPage from './pages/PropsPage'
import StatePage from './pages/StatePage'
import EventHandlingPage from './pages/EventHandlingPage'
import ConditionalRenderingPage from './pages/ConditionalRenderingPage'
import ListRenderingPage from './pages/ListRenderingPage'
import FormsPage from './pages/FormsPage'
import UseStatePage from './pages/UseStatePage'
import UseEffectPage from './pages/UseEffectPage'
import UseRefPage from './pages/UseRefPage'
import UseMemoPage from './pages/UseMemoPage'
import UseContextPage from './pages/UseContextPage'
import UseReducerPage from './pages/UseReducerPage'
import CustomHooksPage from './pages/CustomHooksPage'
import LifecyclePage from './pages/LifecyclePage'
import ContextVsProvidePage from './pages/ContextVsProvidePage'
import ReactRouterPage from './pages/ReactRouterPage'
import StateManagementPage from './pages/StateManagementPage'
import PerformancePage from './pages/PerformancePage'
import TypeScriptPage from './pages/TypeScriptPage'
import PatternsPage from './pages/PatternsPage'
import DifferencesSummaryPage from './pages/DifferencesSummaryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="environment" element={<Environment />} />
          <Route path="project-structure" element={<ProjectStructure />} />
          <Route path="jsx" element={<JSXPage />} />
          <Route path="components" element={<ComponentsPage />} />
          <Route path="props" element={<PropsPage />} />
          <Route path="state" element={<StatePage />} />
          <Route path="event-handling" element={<EventHandlingPage />} />
          <Route path="conditional-rendering" element={<ConditionalRenderingPage />} />
          <Route path="list-rendering" element={<ListRenderingPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="use-state" element={<UseStatePage />} />
          <Route path="use-effect" element={<UseEffectPage />} />
          <Route path="use-ref" element={<UseRefPage />} />
          <Route path="use-memo" element={<UseMemoPage />} />
          <Route path="use-context" element={<UseContextPage />} />
          <Route path="use-reducer" element={<UseReducerPage />} />
          <Route path="custom-hooks" element={<CustomHooksPage />} />
          <Route path="lifecycle" element={<LifecyclePage />} />
          <Route path="context-vs-provide" element={<ContextVsProvidePage />} />
          <Route path="react-router" element={<ReactRouterPage />} />
          <Route path="state-management" element={<StateManagementPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="typescript" element={<TypeScriptPage />} />
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="differences-summary" element={<DifferencesSummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
