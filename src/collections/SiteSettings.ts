import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
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
    },
    {
      name: 'notify',
      label: 'Notify',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
