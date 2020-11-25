import mongoose from 'mongoose'

const demoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  demoDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export default mongoose.model('Demo', demoSchema)
