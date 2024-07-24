// import Home from './Pages/Home.jsx'
import Login from './Pages/Login.page.jsx'
import SignUp from './Pages/Signup.page.jsx'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AuthComponent from './components/authMiddlewareComponent/AuthComponent.jsx'

import Home from './Pages/Home.page.jsx'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'

function App () {
  // const authUser = useSelector(state => state.authUser.value)

  return (
    <div className='min-h-screen overflow-hidden bg-slate-600'>
      <Routes>
        <Route
          path='/'
          element={
            <AuthComponent>
              <Home />
            </AuthComponent>
          }
        ></Route>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/signup' element={<SignUp></SignUp>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
