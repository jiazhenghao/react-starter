import express from 'express'
import Pagination from '@/server/models/pagination'
import paginatedResults from '@/server/utils/paginatedResults'

const router = express.Router()

router.get('/', paginatedResults(Pagination), (req, res) => {
  // @ts-ignore
  res.json(res.paginatedResults)
})

export default router
