import { getImageIdFromAssetId } from '@/utils/robloxAsset'
import type { PayloadRequest } from 'payload'
import sharp from 'sharp'

interface Operation {
  operationId: string
  path: string
  done: boolean
  error?: string
  response?: {
    assetId: string
  }
}

const SUPPORTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/bmp', 'image/tga']

const uploadToRoblox = async (file?: PayloadRequest['file']): Promise<string> => {
  if (!file) {
    throw new Error('No file provided')
  }

  let { name, mimetype, data } = file

  if (!SUPPORTED_MIME_TYPES.includes(mimetype)) {
    // Convert unsupported image types to PNG using sharp
    const converted = await sharp(data).png().toBuffer()
    data = converted
    mimetype = 'image/png'
    name = name.replace(/\.[^.]+$/, '.png')
  }

  const apiKey = process.env.ROBLOX_API_KEY
  const userId = process.env.ROBLOX_USER_ID

  if (!apiKey) {
    throw new Error('Roblox API key is not set in environment variables.')
  }

  const displayName = name
  const description = 'Description'
  const assetType = 'Decal'

  const blob = new Blob([new Uint8Array(data)], { type: mimetype })

  const form = new FormData()

  const requestData = {
    assetType,
    displayName,
    description,
    creationContext: {
      creator: {
        userId,
      },
    },
  }

  form.append('request', JSON.stringify(requestData))
  form.append('fileContent', blob, name)

  const response = await fetch('https://apis.roblox.com/assets/v1/assets', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
    },
    body: form,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to upload to Roblox: ${response.status} - ${errorText}`)
  }

  let operation: Operation = await response.json()

  let delay = 500 // Start with .5 second
  const maxDelay = 10000 // Maximum delay of 10 seconds

  do {
    const operationFetch = await fetch(
      `https://apis.roblox.com/assets/v1/operations/${operation.operationId}`,
      { headers: { 'x-api-key': apiKey } },
    )

    operation = (await operationFetch.json()) as Operation

    if (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay = Math.min(delay * 2, maxDelay) // Exponential backoff
    }
  } while (!operation.done)

  if (operation.response) {
    const assetId = operation.response.assetId
    if (assetId) {
      const imageData = await getImageIdFromAssetId(assetId)
      if (imageData) {
        return imageData.id
      }
    }
  }
  throw new Error('No response from Roblox')
}

export default uploadToRoblox
