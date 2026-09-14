import { useEffect } from 'react'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} | Saleem Shaikh · Ward 1`
    const pageUrl = `${window.location.origin}${window.location.pathname}`

    document.title = fullTitle
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = description

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = pageUrl

    const socialMeta: Array<[string, string]> = [
      ['meta[property="og:title"]', fullTitle],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', pageUrl],
    ]

    socialMeta.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      if (element) element.content = content
    })
  }, [title, description])
}
