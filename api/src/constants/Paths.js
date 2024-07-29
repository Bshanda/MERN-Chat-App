export default {
	wrongEndPoint: '*',
	Base: '/api',
	Auth: {
		Base: '/auth',
		Signup: '/signup',
		Login: '/login',
		Logout: '/logout',
		validToken: '/validateToken'
	},
	Message: {
		Base: '/message',
		Send: '/send/:Id',
		GetChat: '/:Id/:skip'
	},
	Users: {
		Base: '/users/',
		Users: '/',
		selfUpdate: '/selfUpdate',
		block: '/blockUser/:id',
		GetFriends: '/getFriends',
		SendFriendRequest: '/sendFriendRequest/:recieverId',
		AcceptFriendRequest: '/acceptFriendRequest/:senderId',
		RejectFriendRequest: '/rejectFriendRequest/:senderId'
	},
	Admin: {
		Base: '/admin',
		GetUsers: '/users',
		editUser: '/editUser',
		makeAdmin: '/makeAdmin/:id'
	}
}
