export default {
  wrongEndPoint: '*',
  Base: '/api',
  Auth: {
    Base: '/auth',
    Signup: '/signup',
    Login: '/login',
    Logout: '/logout'
  },
  Message: {
    Base: '/message',
    Send: '/send/:Id',
    GetChat: '/:Id'
  },
  Users: {
    Base: '/users',
    Users: '/'
  }
}
