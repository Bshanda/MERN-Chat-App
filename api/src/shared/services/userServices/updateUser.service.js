import User from '../../../db/models/user.models.js'
import { generateHash } from '../../utils/passwordUtils.js'

const updateUser = async (userId, updates) => {
  const { password } = updates
  let hash
  if (password) {
    hash = generateHash(password)
  }
  updates = { ...updates, password: hash }
  try {
    const res = await User.findByIdAndUpdate({ _id: userId }, updates, {
      new: true
    })
    if (!res) throw new Error('Update unsuccesful')

    return { data: res, message: 'User updated' }
  } catch (error) {
    return { error: error }
  }
}

export default updateUser
