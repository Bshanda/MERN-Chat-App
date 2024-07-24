const ApiEndPoint = 'http://localhost:4080/api'

export default {
  Auth: {
    Signup: `${ApiEndPoint}/auth/signup`,
    Login: `${ApiEndPoint}/auth/login`,
    Logout: `${ApiEndPoint}/auth/logout`,
    checkToken: `${ApiEndPoint}/auth/validateToken`
  },
  Message: {
    Send: `${ApiEndPoint}/message/send/`,
    GetChat: `${ApiEndPoint}/message/`
  },
  Users: {
    Base: `${ApiEndPoint}/users/`,
    GetUserList: `${ApiEndPoint}/users`,
    UpdateSelf: `${ApiEndPoint}/users/selfUpdate
`
  }
}
