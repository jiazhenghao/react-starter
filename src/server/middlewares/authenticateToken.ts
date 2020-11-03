import jwt from 'jsonwebtoken'
import path from 'path'

const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

export default function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null || token === undefined)
    return res.sendStatus(401).send('No token is found')

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, clientUser: any) => {
      // console.log(clientUser)
      if (err)
        return res
          .sendStatus(403)
          .send('Token is not right, please refresh or login again')
      req.clientUser = clientUser
      next()
    }
  )
}
