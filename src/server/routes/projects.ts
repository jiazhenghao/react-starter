import express from 'express'
import data from '@/server/mock/data'
import { authUser } from '@/server/middlewares/authentications/basicAuth'
import {
  canViewProject,
  canDeleteProject,
  scopedProjects
} from '@/server/middlewares/authentications/project'

const router = express.Router()
const { projects } = data

router.get('/', authUser, (req: any, res) => {
  res.json(scopedProjects(req.user, projects))
})

router.get(
  '/:projectId',
  setProject,
  authUser,
  authGetProject,
  (req: any, res) => {
    res.json(req.project)
  }
)

router.delete(
  '/:projectId',
  setProject,
  authUser,
  authDeleteProject,
  (req, res) => {
    res.send('Deleted Project')
  }
)

function setProject(req: any, res: any, next: any) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)

  if (req.project === null || req.project === undefined) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}

function authGetProject(req: any, res: any, next: any) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401)
    return res.send('You are Not Allowed to get access to this project')
  }

  next()
}

function authDeleteProject(req: any, res: any, next: any) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401)
    return res.send('You are Not Allowed to delete this project')
  }

  next()
}

export default router
