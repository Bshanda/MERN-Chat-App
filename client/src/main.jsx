import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/store.js'
import Login from './Pages/Login.page.jsx'
import SignUp from './Pages/Signup.page.jsx'
import AuthComponent from './components/authMiddlewareComponent/AuthComponent.jsx'
import Home from './Pages/Home.page.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
