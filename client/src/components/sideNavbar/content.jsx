import { MdGroups, MdOutlineGroups } from 'react-icons/md'
import { IoChatboxOutline } from 'react-icons/io5'

const navBarIconSize = '25px'

export const sideNavBarContent = [
  {
    title: 'Chats',
    link: '/chats',
    icon: (
      <IoChatboxOutline
        size={navBarIconSize}
        className='m-0 p-0'
        alignmentBaseline='central'
      />
    )
  },
  {
    title: 'Groups',
    link: '/groups',
    icon: <MdGroups size={navBarIconSize} />
  }
]
