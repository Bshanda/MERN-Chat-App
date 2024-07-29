import { model, Schema } from 'mongoose'

const blockedUsersSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
	},
	{
		timestamps: true
	}
)

const BlockedUser = model('BlockedUser', blockedUsersSchema)

export default BlockedUser
