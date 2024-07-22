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
    Users: '/'
  }
}
