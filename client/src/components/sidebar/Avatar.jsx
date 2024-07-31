const Avatar = ({ avatar }) => {
	return (
		<div className='rounded-full '>
			<img className='inline' src={`${avatar}`} alt='' height={30} width={30} />
		</div>
	)
}

export default Avatar
