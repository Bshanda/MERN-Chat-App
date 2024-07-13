import React from 'react'
import { Link } from 'react-router-dom'
// import './index.css'

function Home () {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-blue-600 p-4 text-white'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-xl font-bold'>ChatApp</h1>
          <nav>
            <Link
              to='/signup'
              className='bg-white text-blue-600 px-3 py-2 rounded'
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className='bg-blue-600 text-white py-20 text-center'>
          <div className='container mx-auto'>
            <h2 className='text-4xl font-bold mb-4'>Welcome to ChatApp</h2>
            <p className='text-xl mb-8'>
              Connect with your friends and family instantly
            </p>
            <a
              href='#signup'
              className='bg-teal-700 text-white font-bold px-6 py-3 rounded'
            >
              Get Started
            </a>
          </div>
        </section>

        <section id='features' className='py-10 bg-teal-300'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-10'>Features</h2>
            <div className='flex flex-wrap justify-around'>
              <div className='w-1/3 p-4'>
                <div className=' p-6 rounded shadow'>
                  <h3 className='text-xl font-bold mb-2'>
                    Real-time Messaging
                  </h3>
                  <p>Chat with your friends and family in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='contact' className='bg-gray-200 py-20 text-center'>
          <div className='container mx-auto'>
            <h2 className='text-3xl font-bold mb-10'>Contact Us</h2>
            <p className='mb-4'>
              Have any questions? We'd love to hear from you.
            </p>
            <p>Email: support@chatapp.com</p>
          </div>
        </section>
      </main>

      <footer className='bg-blue-600 text-white py-4 text-center'>
        <div className='container mx-auto'>
          &copy; 2024 ChatApp. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
