import { Schema } from 'mongoose'

const FriendsSchema = new Schema(
  {
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

const User = {
  naem: '',
  gender: '',
  friends: ObjectId('saasdkj32445dflkamxcmvx')
}
