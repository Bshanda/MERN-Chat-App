import HttpStatusCodes from '../constants/HttpStatusCodes.js'
import userServices from '../shared/services/userServices/users.service.js'

// getting users including the loggedIn user.
const getUsers = async (req, res) => {
	try {
		// getting the loggedIn user from user object, which was injected by protected route middelware
		const { _id: loggedInUserId } = req.user

		// console.log(req.cookie)

		// using service for getting users.
		const users = await userServices.getAllUsers(loggedInUserId)

		if (users.error) {
			throw new Error('Error in finding users')
		}

		if (users.length < 1) {
			return res.status(HttpStatusCodes.OK).json('No users apart from you').end()
		}

		return res.status(HttpStatusCodes.OK).json(users).end()
	} catch (error) {
		console.log('Error in get Users contorller', error)
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error }).end()
	}
}

// Update self info. But cant change admin status if not an admin already.
const selfUpdateUser = async (req, res) => {
	try {
		const userId = req.user._id
		const updates = req.body

		console.log('Recieved user update request')

		if (updates?.admin) throw new Error('Only admin can give admin privilages')

		const { data, message, error } = await userServices.updateUser(userId, updates)

		if (error) throw new Error(error)

		return res.status(HttpStatusCodes.OK).json({ data, message }).end()
	} catch (error) {
		console.log('Error in updating user')
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }).end()
	}
}

// send a friend request.
const sendFriendReuest = async (req, res) => {
	const senderId = req.user?._id
	const { recieverId } = req.params

	try {
		const r = await userServices.sendFriendRequest(senderId, recieverId)
		if (r.error) throw new Error(r.error)
		return res.status(HttpStatusCodes.OK).json({
			data: r,
			message: `reuest sent by ${senderId} to ${recieverId}`
		})
	} catch (error) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

// accept a friend request.
const acceptFriendReuest = async (req, res) => {
	const recieverId = req.user?._id
	const { senderId } = req.params

	try {
		if (!recieverId || !senderId) throw new Error("Both reciever and sender Id's needed")
		const r = await userServices.acceptFriendRequest(senderId, recieverId)

		if (!r) throw new Error('Error in accept Friend Service')
		if (r.error) throw new Error(r.error)
		return res.status(HttpStatusCodes.OK).json({
			data: r,
			message: `request accepted by ${recieverId} which was sent by ${senderId}`
		})
	} catch (error) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message })
	}
}

// reject a friend request.
const rejectFriendReuest = async (req, res) => {
	const recieverId = req.user?._id
	const { senderId } = req.params

	try {
		const r = await userServices.rejectFriendRequest(senderId, recieverId)
		if (!r) throw new Error('Services are not working')
		if (r.error) throw new Error(r.error)

		// delete friend request

		return res.status(HttpStatusCodes.OK).json({
			data: r,
			message: `reuest sent from ${senderId} is rejected by ${recieverId}`
		})
	} catch (error) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

// Get all friends of a user.
const getAllFriends = async (req, res) => {
	try {
		const { _id: userId } = req.user
		// above line is equal to :- const userId = req.user?._id

		const r = await userServices.getUserFriends(userId)
		if (!r) throw new Error('No response from getUserFriends service')
		if (r?.error) throw new Error(r?.error)

		return res.status(HttpStatusCodes.OK).json({ data: r }) // return array of objects with friends details.
	} catch (error) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
}

const userController = {
	getUsers,
	selfUpdateUser,
	sendFriendReuest,
	acceptFriendReuest,
	rejectFriendReuest,
	getAllFriends
}

export default userController
