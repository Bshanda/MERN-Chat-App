const EditUser = () => {
	return (
		<>
			<section className='dark:bg-gray-900'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray md:text-2xl'>Update user</h1>
							<form
								className='space-y-4 md:space-y-6'
								action='#'
								// onSubmit={handleSubmit}
							>
								{/* // Fullname input field */}
								<div>
									<label htmlFor='fullname' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Your Fullname
									</label>
									<input
										type='text'
										name='fullname'
										id='fullname'
										// value={inputs.fullname}
										onChange={(e) => {
											//   setInputs({ ...inputs, fullname: e.target.value })
										}}
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='Enter your Fullname'
										required
									/>
								</div>

								{/* Gender selector field */}
								<div className='flex'>
									<div className='px-3'>
										<input
											type='radio'
											id='male'
											name='gender'
											value='male'
											onChange={(e) => {
												// setInputs({ ...inputs, gender: e.target.value })
											}}
											required
										/>
										<label htmlFor='male' className='px-3'>
											MALE
										</label>
									</div>
									<div>
										<input
											type='radio'
											id='female'
											name='gender'
											value='female'
											onChange={(e) => {
												// setInputs({ ...inputs, gender: e.target.value })
											}}
											required
										/>
										<label htmlFor='female' className='px-3'>
											FEMALE
										</label>
									</div>
									<br></br>
								</div>

								{/* // Password input field */}
								<div>
									<label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										// value={inputs.password}
										onChange={(e) => {
											//   setInputs({ ...inputs, password: e.target.value })
										}}
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required
										autoComplete='true'
									/>
								</div>

								<button
									type='submit'
									className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
										!loading ? 'disabled:opacity-75' : null
									} `}>
									Update User Details
								</button>
							</form>
						</div>
					</div>
				</div>
				<Toaster />
			</section>
		</>
	)
}

export default EditUser
