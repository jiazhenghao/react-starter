import mongoose from 'mongoose'
import path from 'path'
import Pagination from '@/server/models/pagination'

const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

mongoose.connect(process.env.DATABASE_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', async () => {
  if ((await Pagination.countDocuments().exec()) > 0) return

  Promise.all([
    Pagination.create({ id: 1, name: 'User 1' }),
    Pagination.create({ id: 2, name: 'User 2' }),
    Pagination.create({ id: 3, name: 'User 3' }),
    Pagination.create({ id: 4, name: 'User 4' }),
    Pagination.create({ id: 5, name: 'User 5' }),
    Pagination.create({ id: 6, name: 'User 6' }),
    Pagination.create({ id: 7, name: 'User 7' }),
    Pagination.create({ id: 8, name: 'User 8' }),
    Pagination.create({ id: 9, name: 'User 9' }),
    Pagination.create({ id: 10, name: 'User 10' }),
    Pagination.create({ id: 11, name: 'User 11' }),
    Pagination.create({ id: 12, name: 'User 12' }),
    Pagination.create({ id: 13, name: 'User 13' }),
    Pagination.create({ id: 14, name: 'User 14' }),
    Pagination.create({ id: 15, name: 'User 15' }),
    Pagination.create({ id: 16, name: 'User 16' })
  ]).then(() => console.log('Users Added'))
})
