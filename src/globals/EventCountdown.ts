import type { GlobalConfig } from 'payload'
import { updateWebhookHook } from '@/hooks/updateWebhook'

export const EventCountdown: GlobalConfig = {
  slug: 'event-countdown',
  fields: [
    {
      name: 'eventName',
      label: 'Event Name',
      type: 'text',
      defaultValue: 'Event',
    },
    {
      name: 'eventDate',
      label: 'Event Date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: new Date(),
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'eventImage',
      label: 'Event Image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
  hooks: {
    afterChange: [updateWebhookHook],
  },
}
