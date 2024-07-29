const Avatar = ({ avatar }) => {
  return (
    <div className='avatar w-6 h-6 rounded-full border border-black'>
      <img src={`${avatar}`} alt='' />
    </div>
  )
}

export default Avatar
