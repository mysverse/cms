import type { CollectionConfig } from 'payload'
import { uploadToRobloxHook } from '@/hooks/mediaRoblox'

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
    beforeChange: [uploadToRobloxHook],
  },
}
