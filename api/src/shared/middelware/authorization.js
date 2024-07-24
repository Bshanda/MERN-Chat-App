// import HttpStatusCodes from '../../constants/HttpStatusCodes'

const authorization = async (req, res, next) => {
  const isAdmin = req?.user.admin

  if (!isAdmin) {
    return res.status(404).json({ error: 'Unauthorized' })
  }
  next()
}

export default authorization
