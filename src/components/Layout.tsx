import { useEffect, useState } from 'react'
import { ExternalLink, HandHeart, Mail, Menu, Phone, Vote, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  CAMPAIGN_EMAIL,
  CAMPAIGN_PHONE_DISPLAY,
  CAMPAIGN_PHONE_LINK,
  officialLinks,
} from '../data/site'

const navItems = [
  ['Meet Saleem', '/meet-saleem'],
  ['Priorities', '/priorities'],
  ['Ward 1', '/ward-1'],
  ['Volunteer', '/get-involved'],
  ['Share priorities', '/share-your-priorities'],
]

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ block: 'start' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <div className="election-bar">
        <div className="container election-bar-inner">
          <span><Vote size={17} aria-hidden="true" /> Cambridge votes October 26, 2026</span>
          <a href={officialLinks.voterPortal} target="_blank" rel="noreferrer">
            Check the Voters’ List <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="Saleem Shaikh campaign home" onClick={() => setMenuOpen(false)}>
            <span className="brand-name">SALEEM <b>SHAIKH</b></span>
            <span className="brand-office">CAMBRIDGE · WARD 1</span>
          </Link>

          <nav className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
            ))}
            <NavLink className="nav-action" to="/donate" onClick={() => setMenuOpen(false)}>
              Donate <HandHeart size={18} aria-hidden="true" />
            </NavLink>
          </nav>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <span className="brand-name">SALEEM <b>SHAIKH</b></span>
              <span className="brand-office">CAMBRIDGE · WARD 1</span>
            </Link>
            <p>Practical leadership. Clear accountability. A stronger voice for Ward 1.</p>
          </div>

          <div className="footer-nav">
            <span>Explore</span>
            {navItems.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            <Link to="/donate">Donate</Link>
          </div>

          <div className="footer-nav">
            <span>Contact</span>
            <a href={`tel:${CAMPAIGN_PHONE_LINK}`}><Phone size={16} /> {CAMPAIGN_PHONE_DISPLAY}</a>
            <a href={`mailto:${CAMPAIGN_EMAIL}`}><Mail size={16} /> {CAMPAIGN_EMAIL}</a>
            <a href={officialLinks.voterPortal} target="_blank" rel="noreferrer">Check the Voters’ List <ExternalLink size={14} /></a>
            <a href={officialLinks.voting} target="_blank" rel="noreferrer">Official voting info <ExternalLink size={14} /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>Authorized by the Saleem Shaikh campaign.</p>
          <p>© 2026 Saleem Shaikh · Cambridge, Ontario</p>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Quick contact actions">
        <a href={`tel:${CAMPAIGN_PHONE_LINK}`}><Phone size={18} /> Call</a>
        <Link to="/donate">Donate <HandHeart size={18} /></Link>
      </div>
    </div>
  )
}
