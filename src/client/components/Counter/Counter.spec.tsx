/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '@/redux'

// import react-testing methods
import { render, cleanup, fireEvent } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import Counter from '@/components/Counter'

afterEach(cleanup)

function renderWithRedux(component: any, count = 100) {
  const store = configureStore({ count })
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

test('it renders with redux', () => {
  const { getByTestId } = renderWithRedux(<Counter />)
  expect(getByTestId('count')).toHaveTextContent('100')
})

test('it can increase', () => {
  const { getByTestId, getByText } = renderWithRedux(<Counter />)
  fireEvent.click(getByText('+'))
  expect(getByTestId('count')).toHaveTextContent('102')
  fireEvent.click(getByText('-'))
  fireEvent.click(getByText('-'))
  expect(getByTestId('count')).toHaveTextContent('98')
})

test('it can decrease', () => {
  const { getByTestId, getByText } = renderWithRedux(<Counter />, 99)
  fireEvent.click(getByText('-'))
  expect(getByTestId('count')).toHaveTextContent('97')
})
