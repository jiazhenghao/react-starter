import mongoose from 'mongoose'

const paginationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

export default mongoose.model('Pagination', paginationSchema)
