import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'

interface CodeBlockProps {
    code: string
    language?: string
}

export default function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
    const codeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current)
        }
    }, [code])

    return (
        <pre>
            <code ref={codeRef} className={`language-${language}`}>
                {code.trim()}
            </code>
        </pre>
    )
}

interface ComparisonProps {
    vueCode: string
    reactCode: string
    vueLabel?: string
    reactLabel?: string
}

export function CodeComparison({ vueCode, reactCode, vueLabel = 'Vue', reactLabel = 'React' }: ComparisonProps) {
    return (
        <div className="comparison">
            <div className="comparison-col">
                <div className="comparison-col-header vue">{vueLabel}</div>
                <CodeBlock code={vueCode} language="jsx" />
            </div>
            <div className="comparison-col">
                <div className="comparison-col-header react">{reactLabel}</div>
                <CodeBlock code={reactCode} language="tsx" />
            </div>
        </div>
    )
}
