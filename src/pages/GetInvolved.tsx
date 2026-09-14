import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CalendarPlus, Check, HandHeart, Mail, Megaphone, Phone, Vote } from 'lucide-react'
import { PageHero } from '../components/Common'
import {
  CAMPAIGN_EMAIL,
  CAMPAIGN_PHONE_DISPLAY,
  CAMPAIGN_PHONE_LINK,
} from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { submitCampaignForm } from '../lib/formSubmit'

const ways = [
  { icon: HandHeart, title: 'Volunteer', copy: 'Help with canvassing, flyers, campaign calls, data entry, or wherever your time fits best.' },
  { icon: Vote, title: 'Request a lawn sign', copy: 'Let the campaign know you are interested in displaying a Saleem Shaikh sign.' },
  { icon: CalendarPlus, title: 'Host a conversation', copy: 'Invite Saleem to meet neighbours, listen to concerns, or join a local community conversation.' },
  { icon: Megaphone, title: 'Help spread the word', copy: 'Introduce Saleem to people you know or help share campaign updates in your network.' },
]

const interests = ways.map((way) => way.title).concat('Ask a question', 'Something else')

export function GetInvolved() {
  usePageMeta(
    'Get Involved',
    'Volunteer with Saleem Shaikh’s Ward 1 campaign, request a sign, host a conversation, or contact the campaign directly.',
  )
  const [interest, setInterest] = useState(interests[0])
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const chooseInterest = (value: string) => {
    setInterest(value)
    document.querySelector('#volunteer-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmissionState('submitting')

    try {
      await submitCampaignForm(form, {
        _subject: `Ward 1 campaign: ${interest}`,
        form_type: 'Campaign involvement',
        interest,
      })
      form.reset()
      setInterest(interests[0])
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={<>A neighbour-powered<br /><em>Ward 1 campaign.</em></>}
        copy="Local campaigns are built one conversation and one helping hand at a time. Choose a way to take part that works for you."
        image="/images/saleem-studio.webp"
        imageAlt="Portrait of Saleem Shaikh"
        badge="Every contribution of time helps"
      >
        <a className="button button-primary" href="#ways-to-help">See ways to help <ArrowRight size={19} /></a>
      </PageHero>

      <section className="section help-section" id="ways-to-help">
        <div className="container">
          <div className="section-heading centred-heading">
            <p className="eyebrow">Choose your way to take part</p>
            <h2>Useful help.<br /><em>On your terms.</em></h2>
            <p>No fixed commitment and no pressure. Tell the campaign what you would be comfortable helping with.</p>
          </div>
          <div className="help-grid">
            {ways.map(({ icon: Icon, title, copy }, index) => (
              <button key={title} type="button" onClick={() => chooseInterest(title)}>
                <span className="help-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="card-link">Choose this <ArrowRight size={17} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section involvement-contact" id="volunteer-form">
        <div className="container involvement-grid">
          <div className="contact-intro">
            <p className="eyebrow">Tell us how you would like to help</p>
            <h2>Start with<br /><em>one message.</em></h2>
            <p className="section-lede">Send a message directly to the campaign. Required fields are kept to a minimum.</p>
            <div className="direct-contact">
              <a href={`tel:${CAMPAIGN_PHONE_LINK}`}><Phone /> <span><small>Call Saleem</small><b>{CAMPAIGN_PHONE_DISPLAY}</b></span></a>
              <a href={`mailto:${CAMPAIGN_EMAIL}`}><Mail /> <span><small>Email the campaign</small><b>{CAMPAIGN_EMAIL}</b></span></a>
            </div>
          </div>

          <form className="campaign-form" onSubmit={handleSubmit}>
            <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
            <label>Name<input name="name" type="text" autoComplete="name" required /></label>
            <div className="field-row">
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" /></label>
            </div>
            <label>Postal code <small>(optional)</small><input name="postal" type="text" autoComplete="postal-code" maxLength={7} /></label>
            <label>I would like to…
              <select name="interest_selection" value={interest} onChange={(event) => setInterest(event.target.value)}>
                {interests.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Message<textarea name="message" rows={5} required /></label>
            <button className="button button-primary submit-button" type="submit" disabled={submissionState === 'submitting'}>
              {submissionState === 'submitting' ? 'Sending…' : 'Send to the campaign'} <Mail size={18} />
            </button>
            {submissionState === 'success' && <p className="form-status is-success" role="status"><Check size={17} /> Thanks. Your message was sent to the campaign.</p>}
            {submissionState === 'error' && <p className="form-status is-error" role="alert">The message could not be sent. Please call or email the campaign directly.</p>}
            <p className="form-note"><Check size={15} /> FormSubmit forwards this message to the campaign email. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">Service privacy terms</a></p>
          </form>
        </div>
      </section>
    </>
  )
}
