import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import demoRouter from '@/server/routes/demos'
import userRouter from '@/server/routes/users'
import paginationRouter from '@/server/routes/paginations'
import loginRouter from '@/server/routes/logins'

const app = express()

const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL as string, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error: any) => console.error(error))
db.once('open', () => console.log('Connected to Databse'))

app.use(express.json())

app.use('/demos', demoRouter)
app.use('/users', userRouter)
app.use('/users/login', userRouter)
app.use('/paginations', paginationRouter)
app.use('/login', loginRouter)

app.listen(port, () => console.log(`listening on port ${port}`))
