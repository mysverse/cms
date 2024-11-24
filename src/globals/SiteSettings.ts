import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'notifyCount',
      label: 'Notify Count',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'lastUpdated',
      label: 'Last Updated',
      type: 'date',
      required: true,
      defaultValue: new Date(),
      hidden: true,
    },
    {
      name: 'notify',
      label: 'Notify',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
