import { S3 } from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { tmpFolder } from '@shared/config/files'
import mime from 'mime'

import aws from '@shared/config/aws'

import IStorage, { DeleteFileProps, SaveFileProps } from '../interface/IStorage.interface'

export default class S3Storage implements IStorage {
  private client: S3

  constructor () {
    this.client = aws.config.s3.client
  }

  async saveFile ({ file }: SaveFileProps): Promise<string> {
    const originalName = path.resolve(tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const contentType = mime.getType(originalName)

    await this.client.putObject({
      Bucket: aws.config.s3.bucket,
      Key: file,
      ACL: aws.config.s3.ACL,
      Body: fileContent,
      ContentType: contentType
    }).promise()

    await fs.promises.unlink(originalName)

    return file
  }

  async deleteFile ({ file }: DeleteFileProps): Promise<void> {
    await this.client.deleteObject({
      Bucket: aws.config.s3.bucket,
      Key: file
    }).promise()
  }
}
