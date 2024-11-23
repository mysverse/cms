import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  // Fetch Site Settings
  const settings = await payload.find({
    collection: 'site-settings',
    limit: 1,
  })

  // Fetch Announcements
  const announcements = await payload.find({
    collection: 'announcements',
    where: {
      active: {
        equals: true,
      },
    },
  })

  // Fetch News
  const newsItems = await payload.find({
    collection: 'news',
    limit: 100, // Adjust as needed
  })

  // Assemble News Array
  const news = newsItems.docs
    .map((item) => {
      const image = item.image && typeof item.image === 'object' ? item.image : undefined
      return {
        Name: item.title,
        Image: image && image.robloxAssetId,
        AspectRatio: image && image.width && image.height ? image.width / image.height : null,
      }
    })
    .filter((item) => item.AspectRatio !== null) // Remove null AspectRatio if not needed

  // Assemble Announcements Array
  const announcementsArray = announcements.docs.map((ann) => ({
    Place: ann.place,
    Value: ann.value, // Ensure richText is serialized correctly
    Active: ann.active,
  }))

  // Final JSON Structure
  const response = {
    NotifyCount: settings.totalDocs > 0 ? settings.docs[0].notifyCount : 0,
    Announcements: announcementsArray,
    LastUpdated:
      settings.totalDocs > 0
        ? new Date(settings.docs[0].lastUpdated).toLocaleDateString('en-GB').toUpperCase()
        : '',
    Notify: settings.totalDocs > 0 ? settings.docs[0].notify : false,
    News: news,
  }

  return Response.json(response)
}
