import type { CollectionConfig } from 'payload'
import { afterChangeHook } from '@/hooks/mediaRoblox'
import { updateLastUpdatedHook } from '@/hooks/updateDate'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Remove local storage configuration
    // Configure to use the S3 plugin
    // 'staticDir' is no longer needed
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'robloxAssetId',
      type: 'text',
    },
  ],
  hooks: {
    // beforeChange: [beforeChangeHook],
    afterChange: [afterChangeHook, updateLastUpdatedHook],
  },
}
