import configPromise from '@payload-config'
import { getPayload, PayloadRequest } from 'payload'

export async function getNews(req?: PayloadRequest) {
  const payload = await getPayload({
    config: configPromise,
  })

  // Fetch Site Settings, Announcements, and News concurrently
  const [pageSettings, announcementDocs, newsDocs] = await Promise.all([
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
  const news = newsDocs.docs
    .map((item) => {
      const image = item.image && typeof item.image === 'object' ? item.image : undefined
      return {
        Name: item.title ?? 'Title',
        Image: image && image.robloxAssetId,
        PlaceId: item.placeId ?? undefined,
        Content: item.content ?? undefined,
        Url:
          image && image.filename && process.env.S3_PUBLIC_ENDPOINT
            ? `${process.env.S3_PUBLIC_ENDPOINT}/${encodeURIComponent(image.filename)}`
            : image?.url,
        AspectRatio:
          image && image.width && image.height && !(image.width === 600 && image.height === 255)
            ? image.width / image.height
            : undefined,
      }
    })
    .filter((item) => item.Image)

  // Assemble Announcements Array
  const announcements = announcementDocs.docs.map((ann) => ({
    Place: ann.place,
    Value: ann.value, // Ensure richText is serialized correctly
    Active: ann.active,
  }))

  // Final JSON Structure
  const response = {
    NotifyCount: pageSettings.notifyCount ?? 0,
    Timestamp: pageSettings.updatedAt,
    LastUpdated: new Date(pageSettings.updatedAt!).toLocaleDateString('ms-MY').toUpperCase(),
    Notify: pageSettings.notify ?? false,
    Announcements: announcements,
    News: news,
  }

  return response
}
