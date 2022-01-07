import mongoose, { Document, Schema, Model } from 'mongoose'

export interface NotificationAttributes {
  _id?: string
  content: string
  user_id: string
  read: boolean
}

export type NotificationDocument = Document & NotificationAttributes;

type NotificationModel = Model<NotificationDocument>;

const NotificationSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true
    },

    user_id: {
      type: String,
      trim: true,
      required: true
    },

    read: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
)

export default mongoose.model<NotificationDocument, NotificationModel>('Notification', NotificationSchema)
