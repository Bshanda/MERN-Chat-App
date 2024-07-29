import { model, Schema } from 'mongoose'

const friendsListSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
	},
	{
		timestamps: true
	}
)

const FriendList = model('FriendList', friendsListSchema)

export default FriendList
