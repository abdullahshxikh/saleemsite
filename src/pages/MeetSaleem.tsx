import { ArrowRight, Ear, Lightbulb, Scale, SearchCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CampaignCta, CredentialStrip, PageHero } from '../components/Common'
import { usePageMeta } from '../hooks/usePageMeta'

const approach = [
  {
    icon: Ear,
    title: 'Listen before deciding',
    copy: 'Start with the people closest to the issue and understand how a decision will affect daily life.',
  },
  {
    icon: SearchCheck,
    title: 'Examine the evidence',
    copy: 'Ask clear questions, test assumptions, and look beyond the headline to long-term consequences.',
  },
  {
    icon: Scale,
    title: 'Explain the trade-offs',
    copy: 'Residents deserve to know what a choice costs, what it solves, and what compromises it requires.',
  },
]

export function MeetSaleem() {
  usePageMeta(
    'Meet Saleem',
    'Learn about Saleem Shaikh, his engineering and legal background, and the approach he would bring to Cambridge City Council.',
  )

  return (
    <>
      <PageHero
        eyebrow="Meet Saleem Shaikh"
        title={<>Practical experience.<br /><em>Public purpose.</em></>}
        copy="A Professional Engineer and Master of Laws running to bring disciplined problem-solving, careful listening, and clear public accountability to Cambridge City Council."
        image="/images/saleem-planning.webp"
        imageAlt="Saleem Shaikh reviewing a neighbourhood map"
        badge="Candidate for Ward 1"
      >
        <Link className="button button-primary" to="/share-your-priorities">Start a conversation <ArrowRight size={19} /></Link>
      </PageHero>

      <CredentialStrip />

      <section className="section story-section">
        <div className="container story-grid">
          <aside className="story-aside">
            <span className="big-number">01</span>
            <p>Candidate for Cambridge City Council</p>
            <strong>WARD 1</strong>
          </aside>
          <div className="story-copy prose-stack">
            <p className="eyebrow">Why Saleem is running</p>
            <h2>Local government should feel<br /><em>local to the people it serves.</em></h2>
            <p className="section-lede">
              Saleem's campaign began with a simple conviction: residents deserve a councillor who takes their concerns seriously, studies the details, and communicates without spin.
            </p>
            <p>
              City Council decisions touch neighbourhood safety, roads, development, parks, environmental planning,
              public services, and the way tax dollars are used. Those decisions require both technical discipline
              and a strong understanding of public responsibility.
            </p>
            <p>
              Saleem's engineering background informs how he approaches systems, risks, costs, and long-term planning.
              His legal education strengthens his ability to examine policy, governance, and accountability. Together,
              those perspectives support the kind of careful, practical judgement he wants to bring to City Hall.
            </p>
          </div>
        </div>
      </section>

      <section className="section perspective-section">
        <div className="container">
          <div className="section-heading centred-heading">
            <p className="eyebrow">How Saleem approaches decisions</p>
            <h2>A clear process<br /><em>residents can trust.</em></h2>
          </div>
          <div className="approach-grid">
            {approach.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <span className="approach-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section qualifications-section">
        <div className="container qualifications-grid">
          <div className="qualification-image cutout-profile">
            <img src="/images/saleem-cutout.webp" alt="Saleem Shaikh" width="1024" height="1536" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">The perspective he brings</p>
            <h2>Built for complex questions.<br /><em>Grounded in public service.</em></h2>
            <div className="qualification-list">
              <div><Lightbulb /><span><b>Engineering judgement</b><p>A structured approach to infrastructure, systems, risk, and long-term value.</p></span></div>
              <div><Scale /><span><b>Legal perspective</b><p>Careful attention to policy, process, governance, and public accountability.</p></span></div>
              <div><Ear /><span><b>Resident engagement</b><p>A commitment to hear concerns directly and explain decisions plainly.</p></span></div>
            </div>
            <Link className="text-link" to="/priorities">Explore Saleem's priorities <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <CampaignCta
        title="Have a question for Saleem?"
        copy="Ask directly, share a local concern, or invite Saleem to hear from your neighbourhood."
        primaryLabel="Send Saleem a message"
        primaryTo="/get-involved"
      />
    </>
  )
}
