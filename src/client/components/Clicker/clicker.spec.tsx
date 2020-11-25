/**
 * @jest-environment jsdom
 */
import React from 'react'
import Clicker from '@/client/components/Clicker'
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'

afterEach(cleanup)

test('display the count', () => {
  const { getByTestId } = render(<Clicker />)
  expect(getByTestId('count')).toHaveTextContent('0')
})

test('increase count', () => {
  const { getByTestId, getByText } = render(<Clicker />)
  fireEvent.click(getByText('Up'))
  expect(getByTestId('count')).toHaveTextContent('1')
})

test('decrease count', () => {
  const { getByTestId, getByText } = render(<Clicker />)
  fireEvent.click(getByText('Down'))
  expect(getByTestId('count')).toHaveTextContent('-1')
})

test('increase count delayed', async () => {
  const { getByTestId, getByText } = render(<Clicker />)
  fireEvent.click(getByText('UpAsync'))
  await waitFor(() => expect(getByTestId('count')).toHaveTextContent('1'))
})

test('increase count delayed 2', async () => {
  const { getByText } = render(<Clicker />)
  fireEvent.click(getByText('UpAsync'))
  const countSpan = await waitFor(() => getByText('1'))
  expect(countSpan).toHaveTextContent('1')
})
