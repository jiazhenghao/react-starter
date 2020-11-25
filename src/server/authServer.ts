/* eslint-disable consistent-return */
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '@/server/models/user'
import { UserType } from '@/server/routes/type'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import path from 'path'

const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error: any) => console.error(error))
db.once('open', () => console.log('Connected to Databse'))

// This should be something like Redis or other database
let refreshTokens: any[] = []

app.post('/token', (req, res) => {
  console.log(refreshTokens)
  const refreshToken = req.body.token
  if (refreshToken === null || refreshToken === undefined)
    return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, clientUser: any) => {
      if (err)
        return res
          .sendStatus(403)
          .send('refreshToken and username are not correct')
      const accessToken = generateAccessToken({ name: clientUser.name })
      res.json({ accessToken })
    }
  )
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', async (req, res) => {
  // Authenticate User
  const user = ((await User.findOne({
    username: req.body.username
  }).exec()) as unknown) as UserType

  if (user === null) {
    return res.status(400).send('cannot find the username')
  }

  // add password check
  try {
    // @ts-ignore
    if (req.body.password === undefined || req.body.password === null) {
      return res.status(201).send('You need a password to login')
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(201).send('Not allowed')
    }
  } catch (err) {
    return res
      .status(500)
      .send('Unable to deal with the login, please try later')
  }

  const clientUser = { name: req.body.username }

  const accessToken = generateAccessToken(clientUser)
  const refreshToken = jwt.sign(
    clientUser,
    process.env.REFRESH_TOKEN_SECRET as string
  )
  refreshTokens.push(refreshToken)
  res.json({ accessToken, refreshToken })
})

function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '40s'
  })
}

app.listen(4000, () => console.log('Auth server on PORT 4000'))
