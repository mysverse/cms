// collections/News.ts

import type { CollectionConfig } from 'payload'
import { updateLastUpdatedHook } from '@/hooks/updateDate'

export const News: CollectionConfig = {
  slug: 'news',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: false,
    },
    {
      name: 'placeId',
      type: 'number',
      required: false,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
  orderable: false,
  hooks: {
    afterChange: [updateLastUpdatedHook],
    afterDelete: [updateLastUpdatedHook],
  },
}
