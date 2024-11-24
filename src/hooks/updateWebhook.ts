import { SiteSetting } from '@/payload-types'
import { getNews } from '@/utils/getNews'
import type { FieldHook } from 'payload'

type UpdateWebhookHook = FieldHook<SiteSetting, string, Date>

const webhook = process.env.CF_WORKER_WEBHOOK
const apiKey = process.env.CF_WORKER_WEBHOOK_AUTHORIZATION

export const updateWebhookHook: UpdateWebhookHook = async ({ value, operation, req }) => {
  if (operation === 'update') {
    if (webhook && webhook.trim().length > 0 && webhook.match(/^https?:\/\//)) {
      const news = await getNews(req)
      const headers = new Headers()
      headers.set('Content-Type', 'application/json')
      if (apiKey && apiKey.trim().length > 0) {
        headers.set('Authorization', apiKey)
      }
      const response = await fetch(webhook, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(news),
      })
      console.log(await response.json())
    }
  }
  return value ?? ''
}
