import { ExternalLink, Info, MapPinned, Vote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CampaignCta, PageHero, VoterActionPanel } from '../components/Common'
import { WardMap } from '../components/WardMap'
import {
  ELECTION_DATE,
  officialLinks,
  votingTimeline,
  wardNeighbourhoods,
  wardOnePolls,
} from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export function WardOne() {
  usePageMeta(
    'Ward 1 Voter Guide',
    'A clear Cambridge Ward 1 guide with neighbourhoods, the 2026 voting timeline, official links, and Election Day locations.',
  )

  return (
    <>
      <PageHero
        eyebrow="Cambridge Ward 1"
        title={<>Know your ward.<br /><em>Make your plan.</em></>}
        copy="Ward 1 is a collection of established neighbourhoods, growing communities, and rural areas. This guide brings the most important local election information together in one place."
        image="/images/saleem-studio.webp"
        imageAlt="Saleem Shaikh against a light wall"
        badge="Election Day · October 26"
      >
        <a className="button button-primary" href={officialLinks.wardLookup} target="_blank" rel="noreferrer">
          Confirm your ward <ExternalLink size={18} />
        </a>
      </PageHero>

      <section className="section neighbourhood-section">
        <div className="container neighbourhood-grid">
          <div>
            <p className="eyebrow">Communities across Ward 1</p>
            <h2>Distinct neighbourhoods.<br /><em>One local voice.</em></h2>
            <p className="section-lede">
              Ward boundaries bring together communities with different histories, growth pressures, and local priorities.
              Good representation begins by understanding those differences.
            </p>
            <p className="source-note">Neighbourhood names are a plain-language guide, not a legal boundary description. Confirm your address with the official City ward lookup.</p>
          </div>
          <div className="neighbourhood-list">
            {wardNeighbourhoods.map((name, index) => (
              <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><p>{name}</p></div>
            ))}
            <a href={officialLinks.wardLookup} target="_blank" rel="noreferrer">
              <MapPinned size={19} /> Open the official ward lookup <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="section ward-map-section">
        <div className="container">
          <div className="split-heading ward-map-heading">
            <div>
              <p className="eyebrow">The official boundary</p>
              <h2>See Ward 1<br /><em>on the map.</em></h2>
            </div>
            <div>
              <p>The highlighted boundary uses the City of Cambridge’s published Ward 1 open data. Zoom and move the map to explore streets and neighbourhoods.</p>
              <p className="source-note">Boundaries can change. Confirm your address using the City’s official lookup before voting.</p>
            </div>
          </div>
          <WardMap />
        </div>
      </section>

      <section className="section voting-section">
        <div className="container">
          <div className="split-heading light-heading">
            <div>
              <p className="eyebrow">2026 municipal election</p>
              <h2>Five dates<br /><em>to know.</em></h2>
            </div>
            <div>
              <p>Cambridge offers online and in-person voting options. Election Day is {ELECTION_DATE}.</p>
              <a className="text-link light" href={officialLinks.voting} target="_blank" rel="noreferrer">Read the official voting guide <ExternalLink size={15} /></a>
            </div>
          </div>
          <div className="timeline">
            {votingTimeline.map((item, index) => (
              <article key={item.date + item.title}>
                <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.date}</strong>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
          <div className="data-note"><Info size={18} /><p>Voting details shown here were checked against the City of Cambridge website on September 14, 2026. Always verify current details before voting.</p></div>
        </div>
      </section>

      <section className="section polls-section">
        <div className="container polls-grid">
          <div className="poll-date-card">
            <span>OCT</span><strong>26</strong><small>10 A.M. – 8 P.M.</small>
          </div>
          <div>
            <p className="eyebrow">Ward 1 Election Day locations</p>
            <h2>Vote at a Ward 1<br /><em>location.</em></h2>
            <p className="section-lede">On Election Day, Cambridge uses a “vote anywhere within your ward” model. The City currently lists these Ward 1 locations:</p>
            <div className="poll-list">
              {wardOnePolls.map(([name, address]) => (
                <div key={name}><Vote aria-hidden="true" /><span><b>{name}</b><small>{address}</small></span></div>
              ))}
            </div>
            <a className="text-link" href={officialLinks.whereToVote} target="_blank" rel="noreferrer">Check locations with the City <ExternalLink size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section voter-help">
        <div className="container">
          <div className="split-heading light-heading voter-help-heading">
            <div>
              <p className="eyebrow">Make voting easier</p>
              <h2>Check your information early.</h2>
            </div>
            <div>
              <p>Start with the Voters’ List, then use the City’s guide to choose how, when, and where you’ll vote.</p>
              <Link className="text-link light" to="/share-your-priorities">Share a Ward 1 concern</Link>
            </div>
          </div>
          <VoterActionPanel />
        </div>
      </section>

      <CampaignCta
        title="What does your part of Ward 1 need?"
        copy="Tell Saleem what you are seeing in your neighbourhood and what deserves attention at City Hall."
      />
    </>
  )
}
