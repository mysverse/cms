import type { CollectionBeforeChangeHook } from 'payload'
import { Media } from '@/payload-types'
import uploadToRoblox from '@/functions/uploadToRoblox'

export const uploadToRobloxHook: CollectionBeforeChangeHook<Media> = async ({
  originalDoc,
  data,
  operation,
  req,
}) => {
  if (operation === 'create' || originalDoc?.filesize !== data?.filesize) {
    try {
      data.robloxAssetId = await uploadToRoblox(req.file)
    } catch (error) {
      console.error('Error uploading to Roblox:', error)
      // Optionally handle the error further, e.g., update a status field or notify admin
    }
  }
  return data
}
