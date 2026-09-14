import type { FormEvent } from 'react'
import { Check, ClipboardCheck, Mail, MessageSquareText } from 'lucide-react'
import { CampaignCta } from '../components/Common'
import { wardNeighbourhoods } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { submitCampaignForm } from '../lib/formSubmit'
import { useState } from 'react'

const issues = [
  'Neighbourhood safety',
  'Property taxes & City spending',
  'Roads, traffic & transportation',
  'Growth, housing & development',
  'Parks, trails & public spaces',
  'City communication & accountability',
  'Environmental sustainability',
  'Another local issue',
]

export function Survey() {
  usePageMeta(
    'Share Your Ward 1 Priorities',
    'Tell Saleem Shaikh what matters most to you and your Cambridge Ward 1 neighbourhood.',
  )

  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmissionState('submitting')

    try {
      await submitCampaignForm(form, {
        _subject: 'New Ward 1 resident survey response',
        form_type: 'Ward 1 resident survey',
      })
      form.reset()
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <>
      <section className="survey-hero">
        <div className="container survey-hero-grid">
          <div>
            <p className="eyebrow">Ward 1 resident survey</p>
            <h1>Your street.<br />Your priorities.<br /><em>Your say.</em></h1>
            <p>Saleem wants to understand what residents are seeing, what is working, and what City Hall should address first.</p>
          </div>
          <div className="survey-promise">
            <MessageSquareText aria-hidden="true" />
            <div><strong>A short, focused survey</strong><p>Five clear questions. Contact details are optional, and you choose whether you want a follow-up.</p></div>
          </div>
        </div>
      </section>

      <section className="section survey-section">
        <div className="container survey-layout">
          <aside className="survey-aside">
            <ClipboardCheck aria-hidden="true" />
            <h2>What happens to my response?</h2>
            <p>Your answers are sent to the campaign email through FormSubmit when you press the submit button.</p>
            <ul>
              <li><Check /> Nothing is submitted until you press Send</li>
              <li><Check /> FormSubmit forwards the response by email</li>
              <li><Check /> Contact details are optional</li>
            </ul>
          </aside>

          <form className="campaign-form survey-form" onSubmit={handleSubmit}>
            <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
            <fieldset>
              <legend><span>01</span> Where in Ward 1 do you live?</legend>
              <label className="sr-only" htmlFor="neighbourhood">Neighbourhood</label>
              <select id="neighbourhood" name="neighbourhood" defaultValue="">
                <option value="">Prefer not to say / not sure</option>
                {wardNeighbourhoods.map((name) => <option key={name}>{name}</option>)}
                <option>Another part of Ward 1</option>
              </select>
            </fieldset>

            <fieldset>
              <legend><span>02</span> What should City Hall address first?</legend>
              <div className="radio-grid">
                {issues.map((issue, index) => (
                  <label className="choice-card" key={issue}>
                    <input type="radio" name="topPriority" value={issue} required defaultChecked={index === 0} />
                    <i aria-hidden="true" />
                    <span>{issue}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>03</span> What else matters to you?</legend>
              <p className="field-help">Choose any that apply.</p>
              <div className="checkbox-grid">
                {issues.map((issue) => (
                  <label className="choice-card" key={issue}>
                    <input type="checkbox" name="issues" value={issue} />
                    <i aria-hidden="true" />
                    <span>{issue}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>04</span> What do you want Saleem to understand?</legend>
              <label className="sr-only" htmlFor="details">Your comments</label>
              <textarea id="details" name="details" rows={7} placeholder="Share the local concern, idea, or experience behind your answer…" required />
            </fieldset>

            <fieldset>
              <legend><span>05</span> Would you like a response?</legend>
              <div className="field-row">
                <label>Name <small>(optional)</small><input name="name" type="text" autoComplete="name" /></label>
                <label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" /></label>
              </div>
              <label className="followup-check"><input type="checkbox" name="followup" value="Yes" /><i aria-hidden="true" /><span>Yes, the campaign may follow up about my response.</span></label>
            </fieldset>

            <button className="button button-primary survey-submit" type="submit" disabled={submissionState === 'submitting'}>
              {submissionState === 'submitting' ? 'Sending…' : 'Send my Ward 1 priorities'} <Mail size={18} />
            </button>
            {submissionState === 'success' && <p className="form-status is-success" role="status"><Check size={17} /> Thank you. Your priorities were sent to the campaign.</p>}
            {submissionState === 'error' && <p className="form-status is-error" role="alert">Your response could not be sent. Please try again or contact the campaign directly.</p>}
            <p className="form-note"><Check size={15} /> FormSubmit forwards your response to the campaign email. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">Service privacy terms</a></p>
          </form>
        </div>
      </section>

      <CampaignCta
        eyebrow="Prefer a direct conversation?"
        title="Call or email Saleem instead."
        copy="The survey is optional. You can always contact the campaign directly using the phone number or email below."
        primaryLabel="Volunteer with the campaign"
        primaryTo="/get-involved"
      />
    </>
  )
}
