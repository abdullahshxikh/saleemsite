import { CAMPAIGN_EMAIL } from '../data/site'

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CAMPAIGN_EMAIL}`

export async function submitCampaignForm(
  form: HTMLFormElement,
  metadata: Record<string, string>,
) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15_000)
  const payload = new FormData(form)

  for (const [key, value] of Object.entries(metadata)) {
    payload.set(key, value)
  }

  payload.set('_template', 'table')
  payload.set('_captcha', 'false')

  let response: Response

  try {
    response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeout)
  }

  const result = await response.json().catch(() => null) as { success?: boolean; message?: string } | null

  if (!response.ok || result?.success !== true) {
    throw new Error(result?.message || 'The form could not be sent.')
  }
}
