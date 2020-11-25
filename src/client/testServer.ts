import { rest } from 'msw'
import 'whatwg-fetch'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('https://api.exchangeratesapi.io/latest', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ rates: { CAD: 1.43 } }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export { server, rest }
