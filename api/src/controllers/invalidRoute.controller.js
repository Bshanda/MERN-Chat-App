import HttpStatusCodes from '../constants/HttpStatusCodes.js'

const invalidRouteController = (req,res) => {
  return res
    .status(HttpStatusCodes.BAD_GATEWAY)
    .json({ error: 'Route not found' })
    .end()
}

export default invalidRouteController

