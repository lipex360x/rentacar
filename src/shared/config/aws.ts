import { S3 } from 'aws-sdk'
import { ObjectCannedACL } from 'aws-sdk/clients/s3'

interface AWSProps {
  service: 's3'
  config: {
    s3: {
      bucket: string
      client: S3
      ACL: ObjectCannedACL
    }
  }
}

const s3Client = new S3({
  region: process.env.AWS_S3_BUCKET_REGION
})

console.log(s3Client)

export default {
  service: 's3',
  config: {
    s3: {
      client: s3Client,
      bucket: process.env.AWS_S3_BUCKET,
      ACL: 'public-read'
    }
  }
} as AWSProps
