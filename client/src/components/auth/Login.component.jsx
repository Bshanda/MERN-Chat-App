import { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import useLogin from '../../hooks/useLogin'

const LoginForm = () => {
  const [loginUser, setLoginUser] = useState({
    username: '',
    password: ''
  })
  const authUser = useSelector(state => state.authUser.value)

  const { loading, login } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await login(loginUser)
  }

  useEffect(() => {
    // redirect to chat page if user authenticated.

    if (authUser) {
      navigate('/chats')
    }
  }, [authUser])

  return (
    <section className='   '>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white text-transparent rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              action='#'
              onSubmit={handleSubmit}
            >
              {/* // Username input field */}
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={loginUser.username}
                  onChange={e => {
                    setLoginUser({ ...loginUser, username: e.target.value })
                  }}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter your username'
                  required
                />
              </div>
              {/* // Password input field */}
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={loginUser.password}
                  onChange={e => {
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  autoComplete='true'
                />
              </div>
              {/* // Link to signup page */}
              <p className='text-sm text-end font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  exact='true'
                >
                  Sign up
                </Link>
              </p>

              {loading ? (
                <button
                  type='submit'
                  className='w-full disabled:opacity-75 cursor-not-allowed
 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  disabled
                >
                  Sign in
                </button>
              ) : (
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign in
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
