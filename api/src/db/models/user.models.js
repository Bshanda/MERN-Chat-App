import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, lowercase: true },
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    profilePic: { type: String, default: '' },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const adminRequestSchema = new mongoose.Schema({
  adminRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const AdminRequest = mongoose.model('AdminRequest', adminRequestSchema)
const User = mongoose.model('User', userSchema)

export default User
