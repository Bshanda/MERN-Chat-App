// import Home from './Pages/Home.jsx'
import Login from './Pages/Login.page.jsx'
import SignUp from './Pages/Signup.page.jsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AuthComponent from './components/authMiddlewareComponent/AuthComponent.jsx'

import Home from './Pages/Home.page.jsx'
import RouteComponent, { router } from './router/router.jsx'

function App () {
  return (
    <>
      <RouteComponent />
      <Toaster />
    </>
  )
}

export default App
