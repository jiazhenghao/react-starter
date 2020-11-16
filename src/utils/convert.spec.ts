/**
 * @jest-environment jsdom
 */
import 'whatwg-fetch'
import { convert } from '@/utils/convert'
import { rest, server } from '@/testServer'

test('converts correctly', async () => {
  const rate = await convert('USD', 'CAD')
  expect(rate).toEqual(1.43)
})

test('fails', async () => {
  server.use(
    rest.get('https://api.exchangeratesapi.io/latest', (req, res, ctx) => {
      return res(ctx.status(403))
    })
  )

  await expect(convert('FAIL', 'CAD')).rejects.toThrow('Request failed with status code 403')
})
