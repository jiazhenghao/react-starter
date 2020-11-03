import express from 'express'
import Demo from '@/server/models/demo'
import { DemoType } from '@/server/routes/type'

const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
  try {
    const demos = await Demo.find()
    res.json(demos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getDemo, (req, res) => {
  // @ts-ignore
  res.json(res.demo)
})

// Creating one
router.post('/', async (req, res) => {
  const demo = new Demo({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newDemo = await demo.save()
    res.status(201).json(newDemo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getDemo, async (req, res) => {
  // eslint-disable-next-line eqeqeq
  if (req.body.name != null) {
    // @ts-ignore
    res.demo.name = req.body.name
  }
  // eslint-disable-next-line eqeqeq
  if (req.body.subscribedToChannel != null) {
    // @ts-ignore
    res.demo.subscribedToChannel = req.body.subscribedToChannel
  }
  // @ts-ignore
  console.log(req.body.subscribedToChannel)
  try {
    // @ts-ignore
    const updatedDemo = await res.demo.save()
    res.json(updatedDemo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
// eslint-disable-next-line space-before-function-paren
router.delete('/:id', getDemo, async (req, res) => {
  try {
    // @ts-ignore
    await res.demo.remove()
    res.json({ message: 'Deleted a demo data' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// eslint-disable-next-line consistent-return
async function getDemo(req: any, res: any, next: any) {
  let demo: DemoType
  try {
    demo = ((await Demo.findById(req.params.id)) as unknown) as DemoType
    if (demo === null) {
      return res.status(404).json({ message: 'Cannot find a demo data' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.demo = demo
  next()
}

export default router
