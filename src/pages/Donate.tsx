import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BanknoteArrowUp,
  Check,
  Copy,
  ExternalLink,
  Mail,
  ReceiptText,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react'
import { CAMPAIGN_EMAIL, officialLinks } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const contributionUses = [
  {
    icon: UsersRound,
    title: 'Neighbour outreach',
    copy: 'Helping the campaign reach more Ward 1 residents and listen to what matters locally.',
  },
  {
    icon: Mail,
    title: 'Campaign materials',
    copy: 'Supporting practical materials such as literature, signs, and voter information.',
  },
  {
    icon: BanknoteArrowUp,
    title: 'A strong local campaign',
    copy: 'Giving the campaign the resources to organize, communicate clearly, and keep showing up.',
  },
]

export function Donate() {
  usePageMeta(
    'Contribute to the Campaign',
    'Support Saleem Shaikh’s 2026 Cambridge Ward 1 campaign by Interac e-Transfer. Review Ontario contribution rules before sending.',
  )
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CAMPAIGN_EMAIL)
    } catch {
      const input = document.createElement('textarea')
      input.value = CAMPAIGN_EMAIL
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 2400)
  }

  return (
    <>
      <section className="donate-hero">
        <div className="container donate-hero-grid">
          <div className="donate-hero-copy">
            <p className="eyebrow">Support Saleem for Ward 1</p>
            <h1>Help build a campaign<br /><em>that listens.</em></h1>
            <p>
              A contribution helps Saleem reach more neighbours, share clear information,
              and run a strong resident-focused campaign across Ward 1.
            </p>
            <div className="donate-trust-line">
              <ShieldCheck aria-hidden="true" />
              <span>Securely send from your own bank using Interac e-Transfer.</span>
            </div>
          </div>

          <div className="etransfer-card" aria-labelledby="etransfer-title">
            <div className="etransfer-card-top">
              <span><BanknoteArrowUp aria-hidden="true" /></span>
              <p>Interac e-Transfer</p>
            </div>
            <h2 id="etransfer-title">Send your contribution to</h2>
            <a className="etransfer-email" href={`mailto:${CAMPAIGN_EMAIL}`}>{CAMPAIGN_EMAIL}</a>
            <button className="button button-gold copy-email-button" type="button" onClick={copyEmail}>
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? 'Email copied' : 'Copy e-Transfer email'}
            </button>
            <p className="copy-status" aria-live="polite">
              {copied ? `${CAMPAIGN_EMAIL} copied to your clipboard.` : 'Open your banking app to complete the transfer.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section contribution-steps-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Three simple steps</p>
            <h2>Contribute by<br /><em>e-Transfer.</em></h2>
          </div>

          <ol className="contribution-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Open your banking app</h3>
                <p>Choose Interac e-Transfer and send from your personal account.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Add the campaign recipient</h3>
                <p>Enter <strong>{CAMPAIGN_EMAIL}</strong> as the recipient email.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Identify the contributor</h3>
                <p>
                  Include your full legal name and Ontario residential address in the message.
                  If space is limited, email those details separately to the same address so the campaign can issue your receipt.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section contribution-rules-section">
        <div className="container contribution-rules-grid">
          <div className="contribution-rules-heading">
            <p className="eyebrow">Before you contribute</p>
            <h2>Know the<br /><em>Ontario rules.</em></h2>
            <p>
              Municipal campaign contributions are regulated. Please confirm every item below before sending an e-Transfer.
            </p>
            <a className="text-link light" href={officialLinks.contributions} target="_blank" rel="noreferrer">
              Read Ontario’s 2026 contribution guide <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="contribution-rule-list">
            <article>
              <UserRoundCheck aria-hidden="true" />
              <div>
                <h3>Ontario individuals only</h3>
                <p>You must be an individual who normally resides in Ontario. Corporations, trade unions, clubs, associations, and other groups cannot contribute to a candidate.</p>
              </div>
            </article>
            <article>
              <ShieldCheck aria-hidden="true" />
              <div>
                <h3>Use your own funds</h3>
                <p>The contribution must come from you. If it comes from a joint account, identify the one person making the contribution.</p>
              </div>
            </article>
            <article>
              <BanknoteArrowUp aria-hidden="true" />
              <div>
                <h3>Stay within the limits</h3>
                <p>You may contribute up to $1,200 to this campaign and no more than $5,000 total to candidates running for the same council.</p>
              </div>
            </article>
            <article>
              <ReceiptText aria-hidden="true" />
              <div>
                <h3>Receipts and disclosure</h3>
                <p>The campaign will issue a receipt. Contributions are not tax deductible. If your contributions total more than $100, your name and address will appear in the campaign’s public financial statement.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section contribution-impact-section">
        <div className="container">
          <div className="section-heading centred-heading">
            <p className="eyebrow">Every contribution has a purpose</p>
            <h2>Put more local<br /><em>conversations in reach.</em></h2>
            <p>Campaign funds support the practical work of reaching residents and sharing Saleem’s plans for Ward 1.</p>
          </div>
          <div className="contribution-impact-grid">
            {contributionUses.map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <span><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="contribution-final-cta">
            <BadgeCheck aria-hidden="true" />
            <div>
              <p>Ready to help?</p>
              <strong>Send an e-Transfer to {CAMPAIGN_EMAIL}</strong>
            </div>
            <button className="button button-primary" type="button" onClick={copyEmail}>
              {copied ? 'Email copied' : 'Copy email'} <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
