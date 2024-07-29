import Home from '../Pages/Home.page'
import Login from '../Pages/Login.page'
import SignUp from '../Pages/Signup.page'
import PageNotFound from '../Pages/NotFound.page'
import AuthComponent from '../components/authMiddlewareComponent/AuthComponent.jsx'
import SideNavbar from '../components/sideNavbar/SideNavbar.jsx'

export const routes = [
  {
    path: '/',
    element: <AuthComponent></AuthComponent>,
    children: [
      {
        path: 'chats',
        element: <Home />
      }
    ]
  },

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]
