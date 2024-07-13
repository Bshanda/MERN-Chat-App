const Avatar = ({ avatar }) => {
  return (
    <div className='avatar w-8 h-8 rounded-full'>
      <img src={`${avatar}`} alt='' height={50} width={50} />
    </div>
  )
}

export default Avatar
