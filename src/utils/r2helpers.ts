import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import s3Client from './s3client'
import { Readable } from 'stream'

// Upload a file to R2
export const uploadFileToR2 = async (
  body: Buffer | Uint8Array | Blob | string,
  key: string,
  contentType: string,
): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: 'public-read', // Adjust based on your needs
  })

  await s3Client.send(command)
}

// Fetch a file from R2
export const getFileFromR2 = async (key: string): Promise<Blob> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })

  const data = await s3Client.send(command)
  const stream = data.Body

  if (!stream || !(stream instanceof Readable)) {
    throw new Error('Invalid stream')
  }

  const chunks: Uint8Array[] = []

  for await (const chunk of stream) {
    chunks.push(new Uint8Array(chunk))
  }

  return new Blob(chunks)
}
