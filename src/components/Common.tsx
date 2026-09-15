import type { ReactNode } from 'react'
import { ArrowRight, BadgeCheck, ClipboardCheck, ExternalLink, Mail, Phone, ShieldCheck, Vote } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  CAMPAIGN_EMAIL,
  CAMPAIGN_PHONE_DISPLAY,
  CAMPAIGN_PHONE_LINK,
  officialLinks,
} from '../data/site'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  copy: string
  image: string
  imageAlt: string
  badge?: string
  children?: ReactNode
  compact?: boolean
}

export function PageHero({ eyebrow, title, copy, image, imageAlt, badge, children, compact }: PageHeroProps) {
  return (
    <section className={compact ? 'page-hero compact' : 'page-hero'}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-lede">{copy}</p>
          {children && <div className="page-hero-actions">{children}</div>}
        </div>
        <div className="page-hero-media">
          <img src={image} alt={imageAlt} width="1200" height="800" fetchPriority="high" />
          {badge && <div className="image-badge"><BadgeCheck size={18} /> {badge}</div>}
        </div>
      </div>
    </section>
  )
}

export function CredentialStrip() {
  return (
    <section className="credentials" aria-label="Saleem Shaikh's credentials">
      <div className="container credentials-grid">
        <div><span>P.ENG</span><p>Professional Engineer</p></div>
        <div><span>LLM</span><p>Master of Laws</p></div>
        <div><span>WARD 1</span><p>Certified 2026 candidate</p></div>
      </div>
    </section>
  )
}

export function VoterActionPanel() {
  return (
    <div className="voter-action-panel">
      <div className="voter-action-grid">
        <a className="voter-action-card voter-action-primary" href={officialLinks.voterPortal} target="_blank" rel="noreferrer">
          <span className="voter-action-icon"><ClipboardCheck aria-hidden="true" /></span>
          <span className="voter-action-kicker">Official City service</span>
          <h3>Check the Voters’ List</h3>
          <p>Confirm you’re registered, correct your information, or add yourself if you’re eligible.</p>
          <span className="voter-action-link">Open the Voter Information Portal <ExternalLink size={16} aria-hidden="true" /></span>
        </a>
        <a className="voter-action-card" href={officialLinks.voting} target="_blank" rel="noreferrer">
          <span className="voter-action-icon"><Vote aria-hidden="true" /></span>
          <span className="voter-action-kicker">Official City guide</span>
          <h3>Plan how you’ll vote</h3>
          <p>Review eligibility, voting options, key dates, identification, and accessibility information.</p>
          <span className="voter-action-link">Read the municipal voting guide <ExternalLink size={16} aria-hidden="true" /></span>
        </a>
      </div>
      <p className="voter-action-note"><ShieldCheck size={17} aria-hidden="true" /> These links open official City election services. The campaign does not receive the information you enter.</p>
    </div>
  )
}

type CampaignCtaProps = {
  eyebrow?: string
  title: string
  copy: string
  primaryLabel?: string
  primaryTo?: string
}

export function CampaignCta({
  eyebrow = 'Your voice belongs in this campaign',
  title,
  copy,
  primaryLabel = 'Share your priorities',
  primaryTo = '/share-your-priorities',
}: CampaignCtaProps) {
  return (
    <section className="campaign-cta section">
      <div className="container campaign-cta-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-gold" to={primaryTo}>{primaryLabel} <ArrowRight size={19} /></Link>
          <a className="cta-contact" href={`tel:${CAMPAIGN_PHONE_LINK}`}><Phone size={17} /> {CAMPAIGN_PHONE_DISPLAY}</a>
          <a className="cta-contact" href={`mailto:${CAMPAIGN_EMAIL}`}><Mail size={17} /> {CAMPAIGN_EMAIL}</a>
        </div>
      </div>
    </section>
  )
}
