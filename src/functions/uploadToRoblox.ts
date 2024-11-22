import type { Media } from '@/payload-types'
import mime from 'mime-types'
import { getFileFromR2 } from '@/utils/r2helpers' // Adjust the path as necessary

interface Operation {
  operationId: string
  path: string
  done: boolean
  error?: string
  response?: {
    assetId: string
  }
}

const uploadToRoblox = async (doc: Partial<Media>): Promise<string> => {
  if (!doc.filename) {
    throw new Error('No filename provided')
  }

  const apiKey = process.env.ROBLOX_API_KEY // Securely store your API key
  const userId = process.env.ROBLOX_USER_ID // Or user ID
  const displayName = doc.title || doc.filename
  const description = 'Description'
  const assetType = 'Decal'
  // const filePath = `./media/${doc.filename}`; // Remove local file path

  const contentType = mime.contentType(doc.filename)

  if (
    !contentType ||
    !['image/png', 'image/jpeg', 'image/bmp', 'image/tga'].includes(contentType)
  ) {
    throw new Error(`Unsupported file type: ${contentType}`)
  }

  if (!apiKey) {
    throw new Error('Roblox API key is not set in environment variables.')
  }

  const form = new FormData()

  // Fetch the file from R2 instead of local filesystem
  const file = await getFileFromR2(doc.filename)

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
  form.append('fileContent', file)

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

  let data: Operation = await response.json()

  let delay = 500 // Start with .5 second
  const maxDelay = 10000 // Maximum delay of 10 seconds

  do {
    const operationFetch = await fetch(
      `https://apis.roblox.com/assets/v1/operations/${data.operationId}`,
      { headers: { 'x-api-key': apiKey } },
    )

    data = (await operationFetch.json()) as Operation

    if (!data.done) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay = Math.min(delay * 2, maxDelay) // Exponential backoff
    }
  } while (!data.done)

  if (data.response) {
    return data.response.assetId
  } else {
    throw new Error('No response from Roblox')
  }
}

export default uploadToRoblox
