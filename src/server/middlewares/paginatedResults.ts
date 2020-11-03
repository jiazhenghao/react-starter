import { ResultsType } from '@/server/routes/type'

export default function paginatedResults(model: any) {
  return async (req: any, res: any, next: any) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results: ResultsType = { next: {}, previous: {}, results: null }

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
