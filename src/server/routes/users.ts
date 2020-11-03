import express from 'express'
import User from '@/server/models/user'
import { UserType } from '@/server/routes/type'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  const user = ((await User.findOne({
    username: req.body.username
  }).exec()) as unknown) as UserType

  if (user === null) {
    return res.status(400).send('cannot find such user')
  }

  try {
    // @ts-ignore
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(201).send('Success login')
    } else {
      res.status(201).send('Not allowed')
    }
  } catch (err) {
    res.status(500).send('Unable to deal with the login, please try later')
  }
})

export default router
