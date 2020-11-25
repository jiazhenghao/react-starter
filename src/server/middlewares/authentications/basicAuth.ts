export function authUser(req: any, res: any, next: any) {
  if (req.user === null || req.user === undefined) {
    res.status(403)
    return res.send('You need to sign in')
  }

  next()
}

export function authRole(role: string) {
  return (req: any, res: any, next: any) => {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('basic user is Not allowed')
    }

    next()
  }
}
