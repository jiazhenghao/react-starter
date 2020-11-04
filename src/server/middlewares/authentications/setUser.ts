import data from '@/server/mock/data'

export default function setUser(req: any, res: any, next: any) {
  const { users } = data
  const { userId } = req.body
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}
