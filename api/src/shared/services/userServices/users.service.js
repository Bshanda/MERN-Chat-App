import HttpStatusCodes from '../../../constants/HttpStatusCodes.js'
import FriendRequest from '../../../db/models/Friends/friendRequest.model.js'
import FriendList from '../../../db/models/Friends/friends.model.js'
import User from '../../../db/models/user.models.js'
import { generateHash } from '../../utils/passwordUtils.js'

const getAllUsers = async (loggedInUserId) => {
	try {
		// getting users except the loggedIn user.
		const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

		return users
	} catch (error) {
		console.log('Error in get Users service', error)
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error }).end()
	}
}

const updateUser = async (userId, updates) => {
	const { password } = updates
	let hash
	if (password) {
		hash = generateHash(password)
	}
	updates = { ...updates, password: hash }
	try {
		const res = await User.findByIdAndUpdate({ _id: userId }, updates, {
			new: true
		})
		if (!res) throw new Error('Update unsuccesful')

		return { data: res, message: 'User updated' }
	} catch (error) {
		return { error: error }
	}
}

const sendFriendRequest = async (senderId, recieverId) => {
	try {
		if (!senderId || !recieverId) throw new Error('reciever and sender id needed')
		if (senderId == recieverId) throw new Error('Cannot send request to yourself')

		//1. find both user's respestive friend list from FriendList document.
		let friend_list_sender = await FriendList.findOne({ userId: senderId })
		let friend_list_reciever = await FriendList.findOne({ userId: recieverId })

		// creating a new friends document for sender if not created already.
		if (!friend_list_sender) {
			friend_list_sender = await FriendList.create({
				userId: senderId
			})

			// save to db
			const r = await friend_list_sender.save()
			if (!r) throw new Error(`failed to create a friendList for ${senderId}`)
		}

		// throw an error if already friends
		if (friend_list_sender.friends.includes(recieverId)) {
			throw new Error(`${senderId} is already friends with ${recieverId}`)
		}

		// creating a new friends document for reciever if not created already.
		if (!friend_list_reciever) {
			friend_list_reciever = await FriendList.create({
				userId: recieverId
			})

			// save to db
			const r = await friend_list_reciever.save()
			if (!r) throw new Error(`failed to create a friendList for ${senderId}`)
		}
		// throw an error if already friends
		if (friend_list_reciever.friends.includes(senderId)) {
			throw new Error(`${recieverId} is already friends with ${senderId}`)
		}

		const friendRequest = await FriendRequest.findOne({ senderId, recieverId })

		// throw an error, if same request exists already.
		if (friendRequest) throw new Error('Request already exists')

		const newFriendRequest = new FriendRequest({
			senderId,
			recieverId
		})

		// save to database.
		const r = await newFriendRequest.save()

		if (!r) throw new Error('Error ')

		return r
	} catch (error) {
		return { error: error.message }
	}
}

const acceptFriendRequest = async (senderId, recieverId) => {
	try {
		if (!senderId || !recieverId) throw new Error('reciever and sender id needed')

		let friendRequest = await FriendRequest.findOne({ senderId, recieverId })

		if (!friendRequest) throw new Error('Request dosenot exists')

		// throw an error if friendRequest status includes the responded statuses.
		// throw error if request is already addressed.
		const respondedStatuses = ['accepted', 'rejected']
		if (friendRequest.status.includes(respondedStatuses)) {
			throw new Error('This requesst has been responded ')
		}

		// add both to their friends list document
		// add to user document.
		// delete friend request

		// add both the user to each other's friends list
		//1. find both user's respestive friend list.
		let friend_list_sender = await FriendList.findOne({ userId: senderId })
		let friend_list_reciever = await FriendList.findOne({ userId: recieverId })

		// creating a new friends document for sender if not created already.
		if (!friend_list_sender) {
			friend_list_sender = await FriendList.create({
				userId: senderId
			})
		}
		// throw an error if already friends
		if (friend_list_sender.friends.includes(recieverId)) {
			throw new Error(`${senderId} is already friends with ${recieverId}`)
		}
		friend_list_sender.friends.push(recieverId)

		// creating a new friends document for reciever if not created already.
		if (!friend_list_reciever) {
			friend_list_reciever = await FriendList.create({
				userId: recieverId
			})
		}
		// throw an error if already friends
		if (friend_list_reciever.friends.includes(senderId)) {
			throw new Error(`${recieverId} is already friends with ${senderId}`)
		}
		friend_list_reciever.friends.push(senderId)

		// this will save sender and reciever id's in their respective friend's list.
		const [senderR, recieverR] = await Promise.all([friend_list_sender.save(), friend_list_reciever.save()])

		if (!senderR) throw new Error('Error in saving to frined list of ', senderId)
		if (!recieverR) throw new Error('Error in saving to frined list', recieverId)

		const r = await FriendRequest.findByIdAndDelete(friendRequest?._id)

		if (!r) throw new Error('Error in accepting request')

		return { acceptedRequest: r, saveToSenderFriendList: senderR, saveToRecieverFriendList: recieverR }
	} catch (error) {
		return { error: error.message }
	}
}

const rejectFriendRequest = async (senderId, recieverId) => {
	try {
		if (!senderId || !recieverId) throw new Error('reciever and sender id needed')
		if (senderId == recieverId) throw new Error('Bad request')

		let friendRequest = await FriendRequest.findOne({ senderId, recieverId })

		if (!friendRequest) throw new Error('Request dosenot exists')

		// throw an error if friendRequest status includes the responded statuses.
		// throw error if request is already addressed.

		const r = await FriendRequest.findByIdAndDelete(friendRequest?._id)

		if (!r) throw new Error('Error in rejecting request')

		r.status = 'rejected'

		return r
	} catch (error) {
		return { error: error.message }
	}
}

const getUserFriends = async (userId) => {
	try {
		if (!userId) throw new Error('UserId is not provided')
		const r = await FriendList.findOne({ userId }).populate({
			path: 'friends',
			select: '-password -superAdmin' // it will now exclude the password and admin fields from friends.
		})
		if (!r) throw new Error('Error in finding friends')
		if (r?.length === 0) return { data: 'No friends' }
		return r?.friends
	} catch (error) {
		return { error: error.message }
	}
}

const userServices = {
	getAllUsers,
	updateUser,
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
	getUserFriends
}

export default userServices
