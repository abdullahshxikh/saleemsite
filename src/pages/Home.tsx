import { useMemo } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Landmark,
  Leaf,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Vote,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CampaignCta, CredentialStrip, VoterActionPanel } from '../components/Common'
import { ELECTION_DATE, priorityDetails } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const icons = [ShieldCheck, Building2, Leaf, Landmark]

function daysUntilElection() {
  const election = new Date('2026-10-26T20:00:00-04:00')
  return Math.max(0, Math.ceil((election.getTime() - Date.now()) / 86_400_000))
}

export function Home() {
  usePageMeta(
    'Saleem Shaikh for Cambridge City Council',
    'Meet Saleem Shaikh, certified Ward 1 candidate for Cambridge City Council, and explore his priorities for the 2026 election.',
  )
  const days = useMemo(() => daysUntilElection(), [])

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-media">
          <img
            src="/images/saleem-studio.webp"
            alt="Saleem Shaikh against a light wall"
            width="1200"
            height="900"
            fetchPriority="high"
          />
          <div className="image-badge"><BadgeCheck size={18} /> Certified Ward 1 candidate</div>
        </div>
        <div className="home-hero-copy">
          <div className="home-hero-copy-inner">
            <p className="eyebrow">A practical voice for Ward 1</p>
            <h1>SALEEM<br /><span>SHAIKH</span></h1>
            <p className="office-line">For Cambridge City Council · Ward 1</p>
            <p className="hero-lede">
              Professional Engineer and Master of Laws bringing technical judgement,
              legal insight, and a commitment to clear, accountable local government.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/share-your-priorities">
                Share your priorities <ArrowRight size={20} />
              </Link>
              <Link className="button button-link" to="/meet-saleem">Meet Saleem</Link>
            </div>
            <div className="hero-vote-note">
              <CalendarDays size={21} />
              <span><b>{days === 0 ? 'Election Day' : `${days} days to Election Day`}</b> · {ELECTION_DATE}</span>
            </div>
          </div>
        </div>
      </section>

      <CredentialStrip />

      <section className="section home-about">
        <div className="container home-about-grid">
          <div>
            <p className="eyebrow">Meet your Ward 1 candidate</p>
            <h2>Careful thinking.<br />Clear answers.<br /><em>Local focus.</em></h2>
          </div>
          <div className="prose-stack">
            <p className="section-lede">
              Saleem is running to bring a practical, resident-first approach to the decisions that shape daily life in Cambridge.
            </p>
            <p>
              With a background in engineering and law, he approaches complex questions by examining the evidence,
              understanding the trade-offs, and explaining decisions in direct language. He believes Ward 1 residents
              should be heard before decisions are made—and kept informed after they are made.
            </p>
            <Link className="text-link" to="/meet-saleem">Read Saleem's story <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section priorities-preview">
        <div className="container">
          <div className="split-heading light-heading">
            <div>
              <p className="eyebrow">Focused on what City Hall can deliver</p>
              <h2>Local priorities.<br /><em>Practical leadership.</em></h2>
            </div>
            <div>
              <p>Saleem's platform focuses on the municipal decisions residents see and feel every day.</p>
              <Link className="text-link light" to="/priorities">Explore the full platform <ArrowRight size={18} /></Link>
            </div>
          </div>

          <div className="priority-preview-grid">
            {priorityDetails.map((priority, index) => {
              const Icon = icons[index]
              return (
                <Link className="priority-preview-card" to={`/priorities#${priority.id}`} key={priority.id}>
                  <div className="priority-card-top">
                    <span className="icon-block"><Icon aria-hidden="true" /></span>
                    <span>{priority.number}</span>
                  </div>
                  <h3>{priority.title}</h3>
                  <p>{priority.short}</p>
                  <span className="card-link">Read the priority <ArrowRight size={17} /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section listening-section">
        <div className="container listening-grid">
          <div className="listening-image">
            <img src="/images/saleem-planning.webp" alt="Saleem Shaikh reviewing a neighbourhood map" width="1200" height="800" loading="lazy" />
          </div>
          <div className="listening-copy">
            <p className="eyebrow">A platform shaped by Ward 1</p>
            <h2>What should City Hall<br /><em>fix first?</em></h2>
            <p className="section-lede">
              Better decisions start with a clear picture of what residents are experiencing. Tell Saleem what matters most on your street and in your neighbourhood.
            </p>
            <ul className="check-list">
              <li><MessageSquareText /> Share one local priority in a few minutes</li>
              <li><Vote /> Tell the campaign what deserves attention first</li>
              <li><BadgeCheck /> Choose whether you want a follow-up</li>
            </ul>
            <Link className="button button-primary" to="/share-your-priorities">Take the resident survey <ArrowRight size={19} /></Link>
          </div>
        </div>
      </section>

      <section className="section home-ward">
        <div className="container home-ward-grid">
          <div className="election-date-tile" aria-label="Election Day October 26 2026">
            <span>OCT</span><strong>26</strong><small>2026</small>
          </div>
          <div className="home-ward-copy">
            <p className="eyebrow">Ward 1 voter guide</p>
            <h2>Know your ward.<br /><em>Make a voting plan.</em></h2>
            <p>
              Find your ward, review the official voting calendar, and see Ward 1 Election Day locations—all in one clear guide.
            </p>
            <div className="inline-actions">
              <Link className="button button-primary" to="/ward-1"><MapPinned size={18} /> View the Ward 1 guide</Link>
            </div>
            <VoterActionPanel />
          </div>
        </div>
      </section>

      <CampaignCta
        title="Let’s build a campaign that listens."
        copy="Share a concern, volunteer some time, request a sign, or invite Saleem to a neighbourhood conversation."
      />
    </>
  )
}
