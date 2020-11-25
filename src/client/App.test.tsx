/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig, cache } from 'swr'
import App from '@/client/App'
import { server, rest } from '@/client/testServer'
import '@testing-library/jest-dom/extend-expect'

afterEach(() => cache.clear())

test('renders learn react link', async () => {
  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <App />
    </SWRConfig>
  )
  const element = await findByText(/USD to CAD = 1.43/i)
  expect(element).toBeInTheDocument()
})

test('handles errors', async () => {
  server.use(
    rest.get('https://api.exchangeratesapi.io/latest', (_req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <App />
    </SWRConfig>
  )
  const element = await findByText(/Error/i)
  expect(element).toBeInTheDocument()
})
