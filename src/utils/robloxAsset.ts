// Modules

import { XMLParser } from 'fast-xml-parser'

function getIDfromURL(url: string) {
  const regex: RegExp = /\/asset\/\?id=(\d+)/
  const match = url.match(regex)
  if (match !== null) {
    const id: number = parseInt(match[1])
    return id
  }
}

export async function getImageIDs(ids: string[]) {
  const imageIDs = await Promise.all(
    ids.map(async (id) => {
      return await getImageIdFromAssetId(id)
    }),
  )
  return imageIDs
}

async function getAssetXml(id: string) {
  const response = await fetch(`https://apis.roblox.com/asset-delivery-api/v1/assetId/${id}`, {
    headers: {
      'x-api-key': process.env.ROBLOX_API_KEY || '',
    },
  })
  const json = await response.json()
  const location: string = json.location
  const xmlResponse = await fetch(location)
  return xmlResponse.text()
}

export async function getImageIdFromAssetId(id: string) {
  const text = await getAssetXml(id)
  const parser = new XMLParser({
    ignoreAttributes: false,
  })
  const json = parser.parse(text)
  const item = json.roblox.Item
  const type: string | undefined = item['@_class']
  const props = item.Properties
  const url = props.Content.url
  const imageId = getIDfromURL(url)
  return {
    type,
    id: `rbxassetid://${imageId}`,
    originalId: id,
  }
}
