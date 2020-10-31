const express = require('express')
const path = require('path')
const app = express()
const { NODE_ENV } = process.env
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`)
})

const port = process.env.PORT

app.listen(port, () => console.log(`listening on port ${port}`))
