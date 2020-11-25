import React, { useState } from 'react'

const Clicker = () => {
  const [count, setCount] = useState(0)

  const increase = () => setCount(prev => prev + 1)
  const decrease = () => setCount(prev => prev - 1)
  const increaseAsync = () => setTimeout(() => setCount(prev => prev + 1), 250)

  return (
    <div>
      <button onClick={increaseAsync}>UpAsync</button>
      <button onClick={increase}>Up</button>
      <button onClick={decrease}>Down</button>
      <span data-testid="count">{count}</span>
    </div>
  )
}

export default Clicker
