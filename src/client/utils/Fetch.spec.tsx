/**
 * @jest-environment jsdom
 */
import React from 'react'

// import react-testing methods
import { render, cleanup, waitForElementToBeRemoved } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import Fetch from '@/client/utils/Fetch'

import axios from '@tests/__mocks__/axios'

afterEach(() => {
  jest.resetAllMocks()
  cleanup()
})

test('it fetches and resolves correctly', async () => {
  axios.get.mockResolvedValueOnce({ data: { greeting: 'Hello world' } })
  const url = '/greeting'
  const { getByTestId, findByTestId } = render(<Fetch url={url} />)
  // to test the first mount
  expect(getByTestId('loading')).toHaveTextContent('Loading data...')
  await waitForElementToBeRemoved(() => getByTestId('loading'))
  // to test the component did mount
  expect(await findByTestId('resolved')).toHaveTextContent('Hello world')
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith(url)
})
