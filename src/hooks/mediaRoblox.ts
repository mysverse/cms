import uploadToRoblox from '@/functions/uploadToRoblox'
import { Media } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

export const uploadToRobloxHook: CollectionAfterChangeHook<Media> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (
    operation === 'create' ||
    !(doc.filesize === previousDoc.filesize) ||
    !(doc.filename === previousDoc.filename)
  ) {
    try {
      const robloxAssetId = await uploadToRoblox(doc)
      // Update the document with the robloxAssetId
      await req.payload.update({
        req,
        collection: 'media',
        id: doc.id,
        data: {
          robloxAssetId,
        },
      })
    } catch (error) {
      console.error('Error uploading to Roblox:', error)
      // Optionally handle the error further, e.g., update a status field or notify admin
    }
  }
  return doc
}
