import express from 'express'
import path from 'path'
import User from '@/server/models/user'
import jwt from 'jsonwebtoken'
import { UserType } from '@/server/routes/type'
import bcrypt from 'bcrypt'

const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

const router = express.Router()

router.post('/', async (req, res) => {
  const user = ((await User.findOne({
    username: req.body.username
  }).exec()) as unknown) as UserType

  if (user === null) {
    return res.status(400).send('cannot find the username')
  }

  // I did not add password check, which can be found in users.ts

  try {
    // send this to jwt sign
    const clientUser = { name: req.body.username }
    // @ts-ignore
    if (await bcrypt.compare(req.body.password, user.password)) {
      // create random secret : node repl require('crypto').randomBytes(64).toString('hex')
      const accessToken = jwt.sign(
        clientUser,
        process.env.ACCESS_TOKEN_SECRET as string
      )
      res.status(201).json({ accessToken })
    } else {
      res.status(201).send('Wrong Password, try again')
    }
  } catch (err) {
    res.status(500).send('Unable to deal with the login, please try later')
  }
})

export default router
