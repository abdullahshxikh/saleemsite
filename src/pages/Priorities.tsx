import { Building2, Check, Landmark, Leaf, MessageSquareText, ShieldCheck } from 'lucide-react'
import { CampaignCta, PageHero } from '../components/Common'
import { priorityDetails } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const icons = [ShieldCheck, Building2, Leaf, Landmark]

export function Priorities() {
  usePageMeta(
    'Priorities',
    'Explore Saleem Shaikh’s detailed priorities for safe neighbourhoods, responsible growth, sustainability, and accountable local government in Cambridge.',
  )

  return (
    <>
      <PageHero
        eyebrow="Saleem's priorities"
        title={<>Real issues.<br /><em>Responsible decisions.</em></>}
        copy="A municipal platform should stay focused on the work City Hall can actually do. These priorities set out how Saleem would approach that responsibility."
        image="/images/saleem-studio.webp"
        imageAlt="Portrait of Saleem Shaikh"
        badge="A practical Ward 1 platform"
        compact
      />

      <nav className="priority-jump" aria-label="Priority sections">
        <div className="container">
          {priorityDetails.map((item) => <a href={`#${item.id}`} key={item.id}>{item.number} {item.title}</a>)}
        </div>
      </nav>

      <section className="section priority-intro">
        <div className="container narrow-copy">
          <p className="eyebrow">A standard for every decision</p>
          <h2>Listen locally.<br /><em>Plan for the long term.</em></h2>
          <p className="section-lede">
            Each priority is connected by the same basic test: does the decision respond to a real need,
            can residents understand the trade-offs, and will it make Cambridge stronger over time?
          </p>
        </div>
      </section>

      <div className="priority-detail-list">
        {priorityDetails.map((priority, index) => {
          const Icon = icons[index]
          return (
            <section className="section priority-detail" id={priority.id} key={priority.id}>
              <div className="container priority-detail-grid">
                <div className="priority-detail-title">
                  <span className="detail-number">{priority.number}</span>
                  <span className="detail-icon"><Icon aria-hidden="true" /></span>
                  <h2>{priority.title}</h2>
                </div>
                <div className="priority-detail-copy">
                  <p className="section-lede">{priority.introduction}</p>
                  <h3>What Saleem will push for</h3>
                  <ul className="commitment-list">
                    {priority.commitments.map((commitment) => (
                      <li key={commitment}><Check aria-hidden="true" /> <span>{commitment}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <section className="section platform-note">
        <div className="container platform-note-inner">
          <MessageSquareText aria-hidden="true" />
          <div>
            <p className="eyebrow">A living local platform</p>
            <h2>Ward 1 residents<br /><em>should keep shaping it.</em></h2>
            <p>Saleem will continue listening throughout the campaign. If an issue is missing or a commitment needs to be sharper, say so.</p>
          </div>
        </div>
      </section>

      <CampaignCta
        title="What would you add?"
        copy="Tell Saleem which issue deserves more attention and what a practical City response should look like."
      />
    </>
  )
}
