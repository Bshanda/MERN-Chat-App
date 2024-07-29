import { model, Schema } from 'mongoose'

const friendRequestSchema = new Schema(
	{
		senderId: { type: Schema.Types.ObjectId, required: true },
		recieverId: { type: Schema.Types.ObjectId, required: true },
		status: {
			type: String,
			enum: ['accepted', 'pending', 'rejected'],
			default: 'pending'
		}
	},
	{
		timestamps: true
	}
)

const FriendRequest = model('FriendRequest', friendRequestSchema)

export default FriendRequest
