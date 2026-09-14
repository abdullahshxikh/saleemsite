import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFound() {
  usePageMeta('Page not found', 'The requested Saleem Shaikh campaign page could not be found.')
  return (
    <section className="not-found section">
      <div className="container narrow-copy">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This page<br /><em>isn't on the ballot.</em></h1>
        <p>Head back to the campaign homepage to meet Saleem, review the platform, or share a Ward 1 priority.</p>
        <Link className="button button-primary" to="/"><ArrowLeft size={18} /> Back to homepage</Link>
      </div>
    </section>
  )
}
