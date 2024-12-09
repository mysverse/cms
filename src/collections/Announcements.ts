import type { CollectionConfig } from 'payload'
import { updateLastUpdatedHook } from '@/hooks/updateDate'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'place',
  },
  access: {
    // Define access control as needed
  },
  fields: [
    {
      name: 'place',
      label: 'Place',
      type: 'select',
      options: ['Lebuhraya', 'Bandaraya'],
      required: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    afterChange: [updateLastUpdatedHook],
    afterDelete: [updateLastUpdatedHook],
  },
}
