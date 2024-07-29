import FriendList from '../../../db/models/Friends/friends.model.js'
import User from '../../../db/models/user.models.js'
import { generateHash } from '../../utils/passwordUtils.js'

export const singupService = async (newuser) => {
	let { fullname, username, password, gender } = newuser

	try {
		// checking if username available
		let user = await User.findOne({ username })
		if (user) {
			console.log('User already exists', user)
			return {
				data: 'User already exists',
				status: false
			}
		}

		// Hashing password for security
		const hash = generateHash(password)

		// console.log('signup serVice called after user findone')
		// Setting profile pic for boy and girl.
		//https://avatar-placeholder.iran.liara.run/

		const MaleProile = `https://avatar.iran.liara.run/public/boy?username=${username}`
		const FemaleProile = `https://avatar.iran.liara.run/public/girl?username=${username}`

		const newuser = new User({
			username,
			fullname,
			password: hash,
			gender,
			profilePic: gender == 'male' ? MaleProile : FemaleProile
		})

		const saveduser = await newuser.save()

		if (saveduser) {
			const r = await FriendList.create({
				userId: saveduser?._id
			})
			if (!r) throw new Error('User created but cannot send friend requests.')
		}

		console.log('saveduser', saveduser)
		saveduser.password = null

		return { data: saveduser, status: true }
	} catch (error) {
		console.log({ Msg: `${error}` })
		return { data: error, status: false }
	}
}
