import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto', // R2 uses 'auto' for region
  endpoint: process.env.S3_ENDPOINT!, // Replace with your R2 endpoint
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

export default s3Client
