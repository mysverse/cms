import uploadToRoblox from '@/functions/uploadToRoblox'
import { Media } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'

export const uploadToRobloxHook: CollectionBeforeChangeHook<Media> = async ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create') {
    try {
      const robloxAssetId = await uploadToRoblox(req.file)
      data.robloxAssetId = robloxAssetId
    } catch (error) {
      console.error('Error uploading to Roblox:', error)
      // Optionally handle the error further, e.g., update a status field or notify admin
    }
  }
  return data
}
