import mongoose from 'mongoose'

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  },
  address: { type: String, required: true }
})

export default mongoose.model('users', userSchema)