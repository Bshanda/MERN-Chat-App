import { useState } from 'react'
import { sideNavBarContent } from './content'
import { Link } from 'react-router-dom'
import Options from '../sidebar/user/Options'
import CurrentUser from '../sidebar/user/CurrentUser'

const SideNavbar = () => {
  const [titleVisible, setTitleVisible] = useState(false)

  const showTitle = () => {
    // setTitleVisible(true)
  }

  const hideTitle = () => {
    setTitleVisible(false)
  }

  return (
    <div
      id='sideNavbar'
      onMouseOver={showTitle}
      onMouseLeave={hideTitle}
      className={`flex flex-col py-3 px-2 bg-slate-700 text-white text-center transition-all  duration-300`}
    >
      {sideNavBarContent.map((navItem, i) => (
        <div className='font-white mb-4 ' key={i}>
          <Link to={navItem.link} className='flex items-center justify-center'>
            <div className='m-auto flex flex-col justify-center'>
              {navItem.icon}
              <span className='text-[15px] font-semibold'>{navItem.title}</span>
            </div>
          </Link>
        </div>
      ))}
      <div className='mt-auto'>
        <CurrentUser />
      </div>
    </div>
  )
}

export default SideNavbar
