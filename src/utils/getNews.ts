import configPromise from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export async function getNews(req?: PayloadRequest) {
  const payload = await getPayload({
    config: configPromise,
  })

  // Fetch Site Settings, Announcements, and News concurrently
  const [pageSettings, announcements, newsItems] = await Promise.all([
    payload.findGlobal({
      slug: 'site-settings',
      req,
    }),
    payload.find({
      collection: 'announcements',
      where: {
        active: {
          equals: true,
        },
      },
      req,
    }),
    payload.find({
      collection: 'news',
      limit: 10, // Adjust as needed
      req,
    }),
  ])

  // Assemble News Array
  const news = newsItems.docs
    .map((item) => {
      const image = item.image && typeof item.image === 'object' ? item.image : undefined
      return {
        Name: item.title ?? 'Title',
        Image: image && image.robloxAssetId,
        Url: image?.url,
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
    NotifyCount: pageSettings.notifyCount ?? 0,
    Announcements: announcementsArray,
    Timestamp: pageSettings.lastUpdated,
    LastUpdated: new Date(pageSettings.lastUpdated).toLocaleDateString('ms-MY').toUpperCase(),
    Notify: pageSettings.notify ?? false,
    News: news,
  }

  return response
}
