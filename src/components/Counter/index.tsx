/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '@/redux/actions'
import { InitialState } from '@/redux/reducers'

interface CounterProps {
  increment: Function
  decrement: Function
  count: number
}

const Counter: React.FC<CounterProps> = props => {
  return (
    <div>
      <button
        // @ts-ignore
        onClick={props.increment}
      >
        +
      </button>
      <button
        // @ts-ignore
        onClick={props.decrement}
      >
        -
      </button>
      <span data-testid="count">{props.count}</span>
    </div>
  )
}

const mapStateToProps = (state: InitialState) => ({
  count: state.count
})

const mapDispatchToProps = {
  increment,
  decrement
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
