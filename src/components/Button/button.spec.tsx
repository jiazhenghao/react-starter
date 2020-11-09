/**
 * @jest-environment jsdom
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@/components/Button/'
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('it renders without crash', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Button label="please click" />, div)
})

test('it renders button well', () => {
  const { getByTestId } = render(<Button label="please click on me" />)
  expect(getByTestId('button')).toHaveTextContent('please click on me')
})

test('it renders button well', () => {
  const { getByTestId } = render(<Button label="save" />)
  expect(getByTestId('button')).toHaveTextContent('save')
})

test('it matches snapshot', () => {
  const tree = renderer.create(<Button label="save" />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('it matches another snapshot', () => {
  const tree = renderer.create(<Button label="quit and go" />).toJSON()
  expect(tree).toMatchSnapshot()
})
